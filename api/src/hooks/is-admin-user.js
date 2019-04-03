// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors')

module.exports = function (options = {}) {
  return async context => {
    const configSvc = await context.app.service('configuration');
    const config = await configSvc.get(1);
    const currentUser = context.params.user;
    console.info('Checking if admin...', {config, currentUser});
    if(config.loginCount > 1) {
      if (!currentUser || config.adminEmail !== currentUser.email) {
        throw new errors.Forbidden('You are not admin');
      }
    }
    return context;
  };
};
