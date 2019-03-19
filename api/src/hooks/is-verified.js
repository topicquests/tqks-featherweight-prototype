// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require("@feathersjs/errors");
const { checkContext } = require("feathers-hooks-common");

module.exports = isVerified;

function isVerified() {
  return hook => {
    checkContext(hook, "before");

    if (!hook.param.user || !hook.params.user.isVerified) {
      throw new errors.BadRequest("User's email is not yet verified.");
    }
  };
}
