// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors')

module.exports = function (options = {}) {
  return async context => {
    const configSvc = await context.app.service('configuration');
    const config = await configSvc.get(1);
    console.info('incrementing login', { config });
    // does this need to be a string?
    config.loginCount += 1;
    await configSvc.update([1, config]);
    console.info('incrementing login', 'done', {count: config.loginCount});
    return context;
  };
};
