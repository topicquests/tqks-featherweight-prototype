const { authenticate } = require('@feathersjs/authentication').hooks

// Check if a response has answers, questions, pros, cons
// If so, replace the arrays of node identifiers with
// arrays containing the nodes identified in the found arrays
const populateHook = async function (hook) {
  console.info('PopHook')
  const toCheck = ['answers', 'questions', 'pros', 'cons']
  const { conversation } = hook.app.services
  // Walk along child node types
  for (let i = 0; i < toCheck.length; i++) {
    let type = toCheck[i]
    // If it's there and has some elements
    if (typeof hook.result[type] !== 'undefined' && hook.result[type].length > 0) {
      // walk along the node's array carried in the hook
      const promises = hook.result[type].map(async (id) => {
        console.info('Fetching child id', type, id)
        const { data } = await conversation.find({ query: { id } })
        console.info('Fetching child found', id, data)
        // if this returns nothing, you see empty nodes
        // returning data[0] shows nodes
        // console.info('foo', data && data[0])
        // console.info('bar', data)
        // returning data && data[0] is equivalent to returning data[0]
        return data[0]
        // return data && data[0]
        // To paint full child nodes, this must return the fetched node
        // That is the node which will populate the final array below
      })
      try {
        console.info('Populate', type, hook.result.id, 'fetching')
        // Wait for all the fetches in the map return
        const result = await Promise.all(promises)
        // Replace a list of node id values with a list of nodes
        console.info('PromisesGot', result)
        hook.result[type] = result
      } catch (e) {
        console.error('Populate', hook.result.id)
      }
    }
  }
  return hook
}
// diagnostic tools to watch what this hook is doing
const afind = function () {
  console.info('####finding')
}
const aget = function () {
  console.info('####getting')
}
module.exports = {
  before: {
    all: [],
    find: [afind],
    get: [aget],
    create: [ authenticate('jwt') ],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [],
    find: [],
    get: [populateHook],
    create: [],
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
}
