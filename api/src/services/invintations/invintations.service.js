// Initializes the `invintations` service on path `/invintations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/invintations.model');
const hooks = require('./invintations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/invintations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('invintations');

  service.hooks(hooks);
};
