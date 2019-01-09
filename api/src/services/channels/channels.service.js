// Initializes the `channels` service on path `/channels`
const createService = require('feathers-mongoose');
const createModel = require('../../models/channels.model');
const hooks = require('./channels.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/channels', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('channels');

  service.hooks(hooks);
};
