const users = require('./users/users.service.js')

const messages = require('./messages/messages.service.js')

const channels = require('./channels/channels.service.js');

const history = require('./history/history.service.js');

const quests = require('./quests/quests.service.js');

const conversation = require('./conversation/conversation.service.js');

module.exports = function() {
  const app = this; // eslint-disable-line no-unused-vars

  app.configure(users)
  app.configure(messages)
  app.configure(channels);
  app.configure(history);
  app.configure(quests);
  app.configure(conversation);
};
