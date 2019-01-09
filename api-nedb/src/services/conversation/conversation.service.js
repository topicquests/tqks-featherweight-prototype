// Initializes the `conversation` service on path `/conversation`
const createService = require('feathers-nedb');
const createModel = require('../../models/conversation.model');
const hooks = require('./conversation.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: 'id'
  };

  // Initialize our service with any options it requires
  app.use('/conversation', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('conversation');

  service.hooks(hooks);
};
