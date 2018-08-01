const users = require('./users/users.service.js')

const messages = require('./messages/messages.service.js')

const channels = require('./channels/channels.service.js')

const history = require('./history/history.service.js')

const conversation = require('./conversation/conversation.service.js')

const invitations = require('./invitations/invitations.service.js')

const treeView = require('./tree-view/tree-view.service.js')

const tags = require('./tags/tags.service.js')

module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars

  app.configure(users)
  app.configure(messages)
  app.configure(channels)
  app.configure(history)
  app.configure(conversation)
  app.configure(invitations)
  app.configure(treeView)

  app.configure(tags)
}
