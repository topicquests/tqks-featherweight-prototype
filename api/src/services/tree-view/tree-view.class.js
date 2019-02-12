/* eslint-disable no-unused-vars */

var conversation = null;

class Service {
  constructor(options) {
    this.options = options || {};
  }

  /**
   * Set the conversation service for fetching tree nodes
   * @param {} conv
   */
  setConversation(conv) {
    conversation = conv;
    // console.info("TS", conversation);
  }

  async find() {
    return [];
  }

  /**
   *@method populateKids
   *@description Get the children of the passed parent tree node (questions, answers, pros,
   *              cons, and tags)
   *
   * @param {*} questionArray
   * @param {*} answerArray
   * @param {*} proArray
   * @param {*} conArray
   * @param {*} tagArray
   * @returns
   * @memberof Service
   */
  populateKids(questionArray, answerArray, proArray, conArray, tagArray) {
    let result = []; // always return at least an empty list
    var i;
    if (questionArray) {
      for (i in questionArray) {
        result.push(questionArray[i]);
      }
    }
    if (answerArray) {
      for (i in answerArray) {
        result.push(answerArray[i]);
      }
    }
    if (proArray) {
      for (i in proArray) {
        result.push(proArray[i]);
      }
    }
    if (conArray) {
      for (i in conArray) {
        result.push(conArray[i]);
      }
    }
    if (tagArray) {
      for (i in tagArray) {
        result.push(tagArray[i]);
      }
    }
    return result;
  }

  /**
   * A recursive tree builder
   * @param {*} rootNodeId
   * @param {*} callback signature: (jsonTree)
   */
  async toJsTree(rootNodeId, level = 0) {
    var thisNode;
    var childArray;
    level++;

    console.info("ToJsTree", { level, rootNodeId });
    // Use find to avoid populating the children
    const respConv = await conversation.find({
      query: { nodeId: rootNodeId },
      skippop: true
    });
    console.dir(respConv);

    if (respConv.data.length < 1) {
      console.info("End", { level });
      return {};
    }

    const node = respConv.data[0];
    console.info("TV-1", rootNodeId, JSON.stringify(node));
    thisNode = {};
    thisNode.nodeId = node.nodeId;
    thisNode.label = node.label;
    thisNode.img = node.imgsm;
    thisNode.expanded = true;
    childArray = this.populateKids(
      node.questions,
      node.answers,
      node.pros,
      node.cons,
      node.tags
    );
    thisNode.children = [];
    const arrPromises = childArray.map(child =>
      this.toJsTree(child.nodeId, level)
    );
    const children = await Promise.all(arrPromises);

    thisNode.children = children;
    // console.info('Going Back', thisNode)
    return thisNode;
  }

  /**
   * @method get
   * @description
   *
   * @param {*} nodeId
   * @returns
   * @memberof Service
   */
  async get(nodeId) {
    try {
      // A recursive walk down a tree from a root node identified by id
      return await this.toJsTree(nodeId);
    } catch (e) {
      console.error("Error fetching", e);
    }
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(data) {
    return data;
  }

  async patch(data) {
    return data;
  }

  async remove(id) {
    return { id };
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
