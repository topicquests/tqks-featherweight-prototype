/* eslint-disable no-unused-vars */

var conversation = null

class Service {
  constructor (options) {
    this.options = options || {}
  }

  /**
   * Set the conversation service for fetching tree nodes
   * @param {} conv 
   */
  setConversation (conv) {
    conversation = conv
    // console.info('TS', conversation)
  }

  async find (params) {
    return []
  }

  /**
   * A recursive tree builder
   * @param {*} rootNodeId 
   * @param {*} callback signature: (err, jsonTree)
   */
  toJsTree (rootNodeId, callback) {
    var thisNode
    var childArray
    var childNode
    var childId
    var parentKids = undefined
    var errors = undefined
    console.info('ToJsTree', rootNodeId)
    var self = this
    // Use find to avoid populating the children
    conversation.find({query: { id: rootNodeId }})
      .then((response) => {
        var node = response.data[0]
        console.info('TV-1', JSON.stringify(node))
        thisNode = {}
        thisNode.label = node.label
        thisNode.img = node.imgsm
        childArray = node.questions
        console.info('TV-2', childArray)
        if (childArray) {
          parentKids = []
          childArray.forEach(function (childId) {
            console.info('TV-2A', childId)
            self.toJsTree(childId, function (err, tree) {
              console.info('TV-2B', err, tree)
              if (!errors) {
                errors = err
              } else {
                errors += err
              }
              if (tree) {
                parentKids.push(tree)
              }
            })
          })
        }
        childArray = node.answers
        console.info('TV-3', childArray)
        if (childArray) {
          if (!parentKids) {
            parentKids = []
          }
          childArray.forEach(function (childId) {
            self.toJsTree(childId, function (err, tree) {
              if (!errors) {
                errors = err
              } else {
                errors += err
              }
              if (tree) {
                parentKids.push(tree)
              }
            })
          })
        }
        childArray = node.pro
        console.info('TV-4', childArray)
        if (childArray) {
          if (!parentKids) {
            parentKids = []
          }
          childArray.forEach(function (childId) {
            self.toJsTree(childId, function (err, tree) {
              if (!errors) {
                errors = err
              } else {
                errors += err
              }
              if (tree) {
                parentKids.push(tree)
              }
            })
          })
        }
        childArray = node.con
        console.info('TV-5', childArray)
        if (childArray) {
          if (!parentKids) {
            parentKids = []
          }
          childArray.forEach(function (childId) {
            self.toJsTree(childId, function (err, tree) {
              if (!errors) {
                errors = err
              } else {
                errors += err
              }
              if (tree) {
                parentKids.push(tree)
              }
            })
          })
        }
        if (parentKids && parentKids.length > 0) {
          thisNode.children = parentKids
        }
        return callback(null, thisNode)
      })
      .catch((err) => {
        console.log('ToJsTreeError', err)
        return callback(err, null)
      })

  }

  async get (id, params) {
//    let promise = new Promise((resolve, reject) => {
      this.toJsTree(id, function (err, result) {
        if (err) {
          console.log('TreeViewError', JSON.stringify(err))
        }
        console.info('TreeViewResult', id, JSON.stringify(result))
        return result
      })
    })
//    let result = await promise
//    console.info('TreeViewResult2', id, JSON.stringify(result))
//    return result
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return data
  }

  async update (id, data, params) {
    return data
  }

  async patch (id, data, params) {
    return data
  }

  async remove (id, params) {
    return { id }
  }
}

module.exports = function (options) {
  return new Service(options)
};

module.exports.Service = Service
