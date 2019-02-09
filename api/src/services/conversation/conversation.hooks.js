const { authenticate } = require("@feathersjs/authentication").hooks;
const search = require("feathers-mongodb-fuzzy-search");
const mongoose = require("feathers-mongoose");

const populateChildren = async function(hook, conv) {
  const toCheck = ["answers", "questions", "pros", "cons", "tags"];
  const { conversation, tags } = hook.app.services;
  // Walk along child node types
  for (let i = 0; i < toCheck.length; i++) {
    let type = toCheck[i];
    // If it's there and has some elements
    if (typeof conv[type] !== "undefined" && conv[type].length > 0) {
      // walk along the node's array carried in the hook
      const promises = conv[type].map(async nodeId => {
        console.info("Fetching child id", type, nodeId);
        var theData;
        if (type === "tags") {
          console.info("ConversationPopTag", nodeId);
          const { data } = await tags.find({
            query: { nodeId },
            skippop: true
          });
          theData = data;
        } else {
          console.info("ConversationPopCon", nodeId);
          const { data } = await conversation.find({
            query: { nodeId },
            skippop: true
          });
          theData = data;
        }
        console.info("Fetching child found", nodeId, theData);
        // if this returns nothing, you see empty nodes
        // returning data[0] shows nodes
        // console.info('foo', data && data[0])
        // console.info('bar', data)
        // returning data && data[0] is equivalent to returning data[0]
        return theData[0];
        // return data && data[0]
        // To paint full child nodes, this must return the fetched node
        // That is the node which will populate the final array below
      });

      try {
        console.info("Populating");
        console.info("Populate", type, conv.nodeId, "fetching");
        // Wait for all the fetches in the map return
        const result = await Promise.all(promises);
        // Replace a list of node id values with a list of nodes
        console.info("PromisesGot", result);
        conv[type] = result;
        // console.info('HOOK', hook)
      } catch (e) {
        console.error("Populate", conv.nodeId);
      }
    }
  }
};
// Check if a response has answers, questions, pros, cons
// If so, replace the arrays of node identifiers with
// arrays containing the nodes identified in the found arrays
// Singleton services (GET, PUT, PATCH, REMOVE)
const populateHookSingle = async function(hook) {
  console.log("PopulateHookSingle find");
  await populateChildren(hook, hook.result);
};

// Find (GET, PUT, PATCH, REMOVE)
const populateHookBatch = async function(hook) {
  if (!hook.params.skippop && hook.result.data && hook.result.data.length > 0) {
    console.info("PopulateHookBatch", hook.params.skippop);
    for (let i = 0; i < hook.result.data.length; i++) {
      await populateChildren(hook, hook.result.data[i]);
    }
  }
};

/**
 *@method addChildToParent
 *@description Adds questions, answers, pros, cons and tags to parent quest
 *
 * @param {*} hook
 */
const addChildToParent = async function(hook) {
  const { conversation } = hook.app.services;

  // This is the parents id from the newly created child
  let nodeId = hook.result.parentId;
  let thisData;

  // If it's map this means it is the root quest
  // and we do not need to treat as a child
  if (hook.result.type !== "maps") {
    //find the parent
    const { data } = await conversation.find({ query: { nodeId } });
    thisData = data;
    switch (hook.result.type) {
      //type=question
      case "question": {
        //push the child nodeId onto question array
        thisData[0].questions.push(hook.result);
        // Update the parent with new question array
        result = await conversation.update(
          { _id: thisData[0]._id },
          {
            nodeId: thisData[0].nodeId,
            questions: thisData[0].questions
          }
        );
        break;
      }
      //type=answer
      case "answer": {
        thisData[0].answers.push(hook.result);
        // Update the parent with new question array
        result = await conversation.update(
          { _id: thisData[0]._id },
          {
            nodeId: thisData[0].nodeId,
            answers: thisData[0].answers
          }
        );
        break;
      }
      //type=pro
      case "pro": {
        thisData[0].pros.push(hook.result);
        // Update the parent with new question array
        result = await conversation.update(
          { _id: thisData[0]._id },
          {
            nodeId: thisData[0].nodeId,
            pros: thisData[0].pros
          }
        );
        break;
      }
      //type = con
      case "con": {
        thisData[0].cons.push(hook.result);
        // Update the parent with new question array
        result = await conversation.update(
          { _id: thisData[0]._id },
          {
            nodeId: thisData[0].nodeId,
            cons: thisData[0].cons
          }
        );
        break;
      }
      //type = tag
      case "tag": {
        thisData[0].tags.push(hook.result);
        // Update the parent with new question array
        result = await conversation.update(
          { _id: thisData[0]._id },
          {
            nodeId: thisData[0].nodeId,
            tags: thisData[0].tags
          }
        );
        break;
      }
      default: {
        break;
      }
    }
  }
};

const compactDB = async function(hook) {
  const model = hook.service.Model;
  model.persistence.compactDatafile;
  // console.info('COMPACT', model)
};

function hookBeforeFind(hook) {
  // console.info('HOOKING', hook)
  if (hook && hook.params.query.skippop) {
    // console.info('FoundSkipPop')
    hook.params = hook.params || {};
    hook.params.skippop = true;
    delete hook.params.query.skippop;
  }
  // return hook
}

module.exports = {
  before: {
    all: [],
    find: [
      hookBeforeFind,
      search({
        fields: ["label", "details"],
        deep: true
      })
    ],
    get: [],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [],
    find: [populateHookBatch],
    get: [populateHookSingle],
    create: [addChildToParent],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
