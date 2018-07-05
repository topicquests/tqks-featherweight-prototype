const { authenticate } = require('@feathersjs/authentication').hooks

// Check if a response has answers, questions, pros, cons
const populateHook = async function (hook) {
  const toCheck = ['answers', 'questions', 'pros', 'cons']
  const { conversation } = hook.app.services;
  for (let i = 0; i < toCheck.length; i++) {
    let type = toCheck[i]

    // If it's there and has some elements
    if (typeof hook.result[type] !== 'undefined' && hook.result[type].length > 0) {
      const promises = hook.result[type].map(async (id) => {
        console.info('Fetching child id', id);
        const { data } = await conversation.find({query: {id}});
        console.info('Fetching child found', id, data);
        return data && data[0];
      })
      try {
        console.info('Populate', type, hook.result.id, 'fetching');
        const result = await Promise.all(promises)
        hook.result[type] = result;
        
      } catch (e) {
        console.error('Populate', hook.result.id)
      }
    }
  }
  return hook
}

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
};
