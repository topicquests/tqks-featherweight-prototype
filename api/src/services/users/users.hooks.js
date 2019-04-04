const { authenticate } = require("@feathersjs/authentication").hooks;
const verifyHooks = require("feathers-authentication-management").hooks;
const accountService = require("../authmanagement/notifier");
const { lowerCase } = require("feathers-hooks-common");
const commonHooks = require("feathers-hooks-common");
const gravatar = require("../../hooks/gravatar");
const validateSignon = require("../../hooks/validate-signon");

const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [
      lowerCase("email"),
      hashPassword(),
      gravatar(),
      verifyHooks.addVerification()
    ],
    update: [commonHooks.disallow("external")],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider("external"),
        commonHooks.preventChanges(
          "email",
          "isVerified",
          "verifyToken",
          "verifyShortToken",
          "verifyExpires",
          "vferifyChanges",
          "resetToken",
          "resetShorttoken",
          "resetExpires"
        )
      )
    ],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [commonHooks.when(hook => hook.params.provider, protect("password"))],
    find: [validateSignon(this.hook)],
    get: [],
    create: [
      context => {
        accountService(context.app).notifier(
          "resendVerifySignup",
          context.result
        );
      },
      verifyHooks.removeVerification()
    ],
    update: [
      context => {
        accountService(context.app).notifier("resetPwd", context.result);
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
