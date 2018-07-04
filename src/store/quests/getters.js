import api from 'src/api'
const conversation = api.service('conversation')
const quests = api.service('quests')

//TODO
// We need to move node fetching out of getters

// There is an intention to drop Quest nodes
// and replace them with IBIS Map nodes
// The Quest service will just store enough metadata to
// populate the quest list
//   * node id
//   * node label
// Then any node which is fetched is always fetched by the
// conversation service, which will make this much simpler
function recursiveFetch (service, nodeList, cursor, result, callback) {
  // alert(JSON.stringify(nodeList) + ' ' + cursor + ' ' + JSON.stringify(result))
  var jsonQuery = {}
  var idq = {}
  idq.id = nodeList[cursor++]
  jsonQuery.query = idq
  // alert('Q ' + JSON.stringify(jsonQuery))
  service.find(jsonQuery)
    .then((response) => {
      var x = response.data[0]
      // alert('L ' + JSON.stringify(x))
      result.push(x)
      if (nodeList.length === cursor) {
        // alert('R ' + JSON.stringify(result))
        return callback(result)
      } else {
        recursiveFetch(service, nodeList, cursor, result, callback)
      }
    })
}
function populateChildList (service, nodeList, callback) {
  // alert(JSON.stringify(nodeList))
  var result = []
  if (!nodeList) {
    return callback(result)
  }
  recursiveFetch(service, nodeList, 0, result, function (data) {
    // alert('R2 ' + JSON.stringify(data))
    return callback(data)
  })
}

// TODO
// It's not yet clear how this will get called
// PERHAPS it's' just a function to be called by the
// getter: theNode
getQuestNode: (state, id) => {
  // if (this.user) {
  //  state.isAuthenticated = true
  // }
  var q = {}
  var idx = {}
  idx.id = id
  q.query = idx
  var x
  quests.find(q)
    .then((response) => {
      x = response.data[0]
      if (x) {
        // alert(JSON.stringify(x))
        state.label = x.label
        state.details = x.details
        state.image = x.img
        state.pid = x.id
        state.ptype = x.type
        state.parentLabel = x.parentLabel
        // alert('A ' + this.$data.label)
        populateChildList(conversation, x.questions, function (data) {
          state.questions = data
          populateChildList(conversation, x.answers, function (data) {
            state.answers = data
            populateChildList(conversation, x.pros, function (data) {
              state.pros = data
              populateChildList(conversation, x.cons, function (data) {
                state.cons = data
              })
            })
          })
        })
      } else {
        conversation.find(q)
          .then((response) => {
            var x = response.data[0]
            // alert('F ' + JSON.stringify(x))
            state.label = x.label
            state.details = x.details
            state.image = x.img
            state.pid = x.id
            state.ptype = x.type
            state.parentLabel = x.parentLabel
            populateChildList(conversation, x.questions, function (data) {
              state.data = data
              populateChildList(conversation, x.answers, function (data) {
                state.answers = data
                populateChildList(conversation, x.pros, function (data) {
                  state.pros = data
                  populateChildList(conversation, x.cons, function (data) {
                    state.cons = data
                  })
                })
              })
            })
          })
      }
   })
}

// TODO
// Write getters for all the stuff in a node
// But they rely on firing getQuestNode to populate State
// 
theNode: (state, id) => {

},
isAuthenticated: state => {
  return state.isAuthenticated
}
