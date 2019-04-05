const isAdminUser = require('../../hooks/is-admin-user');
const { pluck } = require('feathers-hooks-common');

// Only these fields maybe changed in the config file
const CONFIG_WHITELIST = [
  'isPrivatePortal',
  'requiresInvite',
  'adminEmail'
]

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [isAdminUser()],//, pluck(CONFIG_WHITELIST)],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
