const { authenticate } = require('@feathersjs/authentication').hooks;
const isAdminUser = require('../../hooks/is-admin-user');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [isAdminUser()],
    get: [isAdminUser()],
    create: [],
    update: [],
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
