// Initializes the `tags` service on path `/tags`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tags.model');
const hooks = require('./tags.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tags', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags');

  service.hooks(hooks);
};
