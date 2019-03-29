const { authenticate } = require("@feathersjs/authentication").hooks;
const search = require("feathers-mongodb-fuzzy-search");
const mongoose = require("feathers-mongoose");

/**
 *@method populateChildren
 *@description
 *
 * @param {*} hook
 * @param {*} conv
 */
const populateChildren = async function(hook, conv) {
  const toCheck = ["answers", "questions", "pros", "cons", "tags", "subclasses", "instances", "relations"];
  const { conversation, tags } = hook.app.services;
  // Walk along child node types
  for (let i = 0; i < toCheck.length; i++) {
    let type = toCheck[i];
    // If it's there and has some elements
    if (typeof conv[type] !== "undefined" && conv[type].length > 0) {
      // walk along the node's array carried in the hook
      const promises = conv[type].map(async id => {
        console.info("Fetching child id", type, id);
        var theData;
        let nodeId = id;
        if (type === "tags") {
          console.info("ConversationPopTag", id);
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
  console.log('PopulateHookSingle find');
  await populateChildren(hook, hook.result);
};

// Find (GET, PUT, PATCH, REMOVE)
const populateHookBatch = async function(hook) {
  if (!hook.params.skippop && hook.result.data && hook.result.data.length > 0) {
    console.info('PopulateHookBatch', hook.params.skippop);
    for (let i = 0; i < hook.result.data.length; i++) {
      await populateChildren(hook, hook.result.data[i]);
    }
  }
};

/**
 *@method addChildToParent
 *@description Adds questions, answers, pros, cons and tags nodes to parent quest
 *             The node's object is stored in parents questions, answers, pros, cons Array
 *             Extended to include topic subClass and instanceOf
 *             Extended to include Connection sourceNode and targetNode
 * @param {*} hook
 */
const addChildToParent = async function(hook) {
  const { conversation } = hook.app.services;
  //console.info("AddChildToParent")
  //hook.params.skippop = true;
  //let thisData;
  let { nodeId, type, parentId, sourceNode, targetNode, subOf, instanceOf } = hook.result;
  if (hook.result && hook.result.type === 'topic') {
    //deal with subOf or instanceOf
    const {
      data: [subx]
    } = await conversation.find({ query: { nodeId: subOf },
      skippop: true });
    if (!subx) {
      const {
        data: [inx]
      } = await conversation.find({ query: { nodeId: instanceOf },
        skippop: true });
      if (!inx) {
        console.log('SubOrInstanceNode missing: ', nodeId, subOf, instanceOf);
      } else {
        let subs = inx.instances;
        if (!subs) {
          subs = [];
        }
        subs.push(nodeId);
        let payS = {};
        payS.instances = subs;
        await conversation.patch(inx._id, payS);
      }
    } else {
      let subs = subx.subclasses;
      if (!subs) {
        subs = [];
      }
      subs.push(nodeId);
      let payS = {};
      payS.subclasses = subs;
      await conversation.patch(subx._id, payS);
    }
    //NOTE: relationtypes do not have nodes to patch
    //They do, however, have source and target nodes which are affected
  } else if (hook.result && hook.result.type === 'relation') {
    //console.log('RELATIONXXX', sourceNode, targetNode);
    
    // fetch sourceNode and patch relations with nid
    const {
      data: [snx]
    } = await conversation.find({ query: { nodeId: sourceNode },
      skippop: true });
    if (!snx) {
      console.log('RelationSourceNode missing: ', nodeId, sourceNode);
    } else {
      let relS = snx.relations;
      if (!relS) {
        relS = [];
      }
      relS.push(nodeId);
      let payS = {};
      payS.relations = relS;
      await conversation.patch(snx._id, payS);
    }
    // fetch targetNode and patch relations with nid
    const {
      data: [tnx]
    } = await conversation.find({ query: { nodeId: targetNode },
      skippop: true });
    if (!tnx) {
      console.log('RelationTargetNode missing: ', nodeId, targetNode);
    } else {
      let relT = tnx.relations;
      if (!relT) {
        relT = [];
      }
      relT.push(nodeId);
      let payT = {};
      payT.relations = relT;
      await conversation.patch(tnx._id, payT);
    }
  } else if (hook.result && hook.result.type !== 'map') {
    // If it's map this means it is the root quest
    // and we do not need to treat as a child

    //find the parent, and destructure the first result

    // Determine which key of the object to change
    // TODO this must also look if this is a relation
    // if it is a 'relation' type, then must add to
    //  sourceNodde.relations[] and targetNode.relations[]
    const {
      data: [existing]
    } = await conversation.find({ query: { nodeId: parentId },
      skippop: true });
    
    if (!existing) {
      console.warn('No existing entry for parent', parentId);
      return;
    }
    //console.info("Populating parent for ", { nodeId, type });

    // Get existing values for said type
    let pluralizedKey = `${type}s`;
    let existingKey = existing[pluralizedKey];
    //console.dir(existing);
    if (!Array.isArray(existingKey)) {
      console.warn("Existing key is not an array!!!", existingKey);
      return;
    }

    // Add the ID of the newly created node to the parent node under the proper type
    existingKey.push(nodeId);

    let payload = {};
    payload[pluralizedKey] = existingKey;
   //console.info("Patching with payload", { payload });
    // Update the parent object with the new ID
    await conversation.patch(existing._id, payload);

    // }
  }

  return hook;
};

// const compactDB = async function(hook) {
//   const model = hook.service.Model;
//   model.persistence.compactDatafile;
//   // console.info('COMPACT', model)
// };

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
    find: [hookBeforeFind, search({ fields: ["label", "details"] })],
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
