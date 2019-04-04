// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const _ = require("lodash");
const errors = require("feathers-errors");
const { checkContext } = require("feathers-hooks-common");

/**
 *@method validateSignon
 *
 * @returns
 */
module.exports = function validateSignon(hook) {
  return hook => {
    checkContext(hook, "after");
    console.info(" Hook: ", hook.params);
    if (!hook.params.verifyToken || hook.params.verifyToken === undefined) {
      if (!hook.result.data[0].isVerified) {
        throw new errors.BadRequest("User's email is not yet verified.");
      }
    }
  };
};
