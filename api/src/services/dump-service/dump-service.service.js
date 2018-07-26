// Initializes the `DumpService` service on path `/dump-service`
const createService = require('./dump-service.class.js');
const hooks = require('./dump-service.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dump-service', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('dump-service');

  service.hooks(hooks);
};
