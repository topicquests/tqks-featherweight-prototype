const { authenticate } = require('@feathersjs/authentication').hooks
const search = require('feathers-nedb-fuzzy-search')

const populateChildren = async function (hook, tag) {
  const { conversation } = hook.app.services
  // Walk along child node types
    // If it's there and has some elements
  const mynodes = tag.nodes
  console.info('TagsHooksMyNodes', mynodes)
  if (mynodes !== undefined && mynodes.length > 0) {
      // walk along the node's array carried in the hook
      const promises = mynodes.map(async (id) => {
        console.info('Fetching child id', id)
        const { data } = await conversation.find({ query: { id }, skippop: true  })
        const  theData = data
        console.info('Fetching child found', id, theData)
        // if this returns nothing, you see empty nodes
        // returning data[0] shows nodes
        // console.info('foo', data && data[0])
        // console.info('bar', data)
        // returning data && data[0] is equivalent to returning data[0]
        return theData[0]
        // return data && data[0]
        // To paint full child nodes, this must return the fetched node
        // That is the node which will populate the final array below
      })
    
    try {
      console.info('Populating')
      console.info('Populate', tag.id, 'fetching')
      // Wait for all the fetches in the map return
      const result = await Promise.all(promises)
      // Replace a list of node id values with a list of nodes
      console.info('PromisesGot', result)
      tag['nodes'] = result
      // console.info('HOOK', hook)
    } catch (e) {
      console.error('Populate', tag.id)
    }
  }
}

const populateHookSingle = async function (hook) {
  await populateChildren(hook, hook.result)
}
const populateHookBatch = async function (hook) {
  console.info('HOOK', hook.params)
  if (!hook.params.skippop && hook.result.data && hook.result.data.length > 0)
  {
    console.info('PopulateHookBatch', hook.params.skippop)
    for (let i=0; i<hook.result.data.length; i++) {
      await populateChildren(hook, hook.result.data[i])
    }
  }
}

function hookBeforeFind(hook) {
  // console.info('HOOKING', hook)
  if (hook && hook.params.query.skippop)
  {
    // console.info('FoundSkipPop')
    hook.params = hook.params || {}
    hook.params.skippop = true
    delete hook.params.query.skippop
  }
  // return hook
}

const compactDB  = async function (hook) {
  const model = hook.service.Model
  model.persistence.compactDatafile
  // console.info('COMPACT', model)
}
module.exports = {
  before: {
    all: [],
    find: [hookBeforeFind, search({
      fields: ['label'],
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
    update: [compactDB],
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
