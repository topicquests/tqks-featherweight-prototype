// Initializes the `configuration` service on path `/configuration`
const createService = require('./configuration.class.js');
const hooks = require('./configuration.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/configuration', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('configuration');

  service.hooks(hooks);
};
