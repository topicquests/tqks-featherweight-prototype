const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');
const { lowerCase } = require('feathers-hooks-common');

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const gravatar = require('../../hooks/gravatar');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      lowerCase('email'),
      hashPassword(),
      gravatar(),
      verifyHooks.addVerification()
    ],
    update: [authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [commonHooks.when(hook => hook.params.provider, protect('password'))],
    find: [],
    get: [],
    create: [
      context => {
        accountService(context.app).notifier(
          'resendVerifySignup',
          context.result
        );
      },
      verifyHooks.removeVerification()
    ],
    update: [
      context => {
        accountService(context.app).notifier('resetPwd', context.result);
      }
    ],
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
