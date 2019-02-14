// Initializes the `history` service on path `/history`
const createService = require('feathers-mongoose');
const createModel = require('../../models/history.model');
const hooks = require('./history.hooks');

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/history', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('history')

  service.hooks(hooks)
}
