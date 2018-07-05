// Initializes the `quests` service on path `/quests`
const createService = require('feathers-nedb');
const createModel = require('../../models/quests.model');
const hooks = require('./quests.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: 'id'
  };

  // Initialize our service with any options it requires
  app.use('/quests', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('quests');

  service.hooks(hooks);
};
