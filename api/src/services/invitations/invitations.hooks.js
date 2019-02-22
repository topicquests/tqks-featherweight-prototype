const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [
      restrictToOwner({ idField: 'id', ownerField: 'userId' })
    ],
    create: [],
    update: [
      restrictToOwner()
    ],
    patch: [
      restrictToOwner()
    ],
    remove: [
      restrictToOwner()
    ]
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
