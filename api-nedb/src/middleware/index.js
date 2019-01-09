const handler = require('@feathersjs/express/errors')
const notFound = require('feathers-errors/not-found')
const dbSet = require('feathers-nedb-dump').set
const dbDump = require('feathers-nedb-dump').get

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this
  // GET and POST to return and receive service database
  app.get('/db-dump/:service', dbDump(app))
  app.post('/db-set', dbSet(app))
  app.use(notFound())
  app.use(handler())
}
