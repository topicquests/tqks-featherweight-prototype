const { authenticate } = require('@feathersjs/authentication').hooks
const search = require('feathers-nedb-fuzzy-search')

const populateChildren = async function (hook, conv) {
  const toCheck = ['answers', 'questions', 'pros', 'cons']
  const { conversation } = hook.app.services
  // Walk along child node types
  for (let i = 0; i < toCheck.length; i++) {
    let type = toCheck[i]
    // If it's there and has some elements
    if (typeof conv[type] !== 'undefined' && conv[type].length > 0) {
      // walk along the node's array carried in the hook
      const promises = conv[type].map(async (id) => {
        console.info('Fetching child id', type, id)
        const { data } = await conversation.find({ query: { id }, skippop: true  })
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
        console.info('Populating')
        console.info('Populate', type, conv.id, 'fetching')
        // Wait for all the fetches in the map return
        const result = await Promise.all(promises)
        // Replace a list of node id values with a list of nodes
        console.info('PromisesGot', result)
        conv[type] = result
        // console.info('HOOK', hook)
      } catch (e) {
        console.error('Populate', conv.id)
      }
    }
  }
}
// Check if a response has answers, questions, pros, cons
// If so, replace the arrays of node identifiers with
// arrays containing the nodes identified in the found arrays
// Singleton services (GET, PUT, PATCH, REMOVE)
const populateHookSingle = async function (hook) {
  await populateChildren(hook, hook.result)
}

// Find (GET, PUT, PATCH, REMOVE)
const populateHookBatch = async function (hook) {
  console.dir(hook.params);
  if (!hook.params.skippop && hook.result.data && hook.result.data.length > 0)
  {
    for (let i=0; i<hook.result.data.length; i++) {
      await populateChildren(hook, hook.result.data[i]);
    }
  }
}

module.exports = {
  before: {
    all: [],
    find: [search({
      fields: ['label', 'details'],
      deep: true
    })],
    get: [],
    create: [ authenticate('jwt') ],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [],
    find: [populateHookBatch],
    get: [populateHookSingle],
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
