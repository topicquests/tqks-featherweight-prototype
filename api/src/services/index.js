const users = require("./users/users.service.js");
const channels = require("./channels/channels.service.js");
const conversation = require("./conversation/conversation.service.js");
const history = require("./history/history.service.js");
const invintations = require("./invintations/invintations.service.js");
const messages = require("./messages/messages.service.js");
const tags = require("./tags/tags.service.js");
const mailer = require("./mailer/mailer.service.js");
const authmanagement = require("./authmanagement/authmanagement.service.js");
const treeView = require("./tree-view/tree-view.service.js");
const configuration = require('./configuration/configuration.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(channels);
  app.configure(conversation);
  app.configure(history);
  app.configure(invintations);
  app.configure(messages);
  app.configure(tags);
  app.configure(mailer);
  app.configure(authmanagement);
  app.configure(treeView);
  app.configure(configuration);
};
