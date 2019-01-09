// Initializes the `invitations` service on path `/invitations`
const createService = require('feathers-nedb');
const createModel = require('../../models/invitations.model');
const hooks = require('./invitations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/invitations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('invitations');

  service.hooks(hooks);
};
