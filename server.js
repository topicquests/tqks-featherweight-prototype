const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const path = require('path');

const feathersProxy = proxy({
  target: 'http://localhost:8081',
  logLevel: 'debug',
  ws: true, 
  pathRewrite: {
      '^/api' : '/' 
  }
});
const staticFileMiddleware = express.static('dist/spa-mat');
app.use('/api', feathersProxy);
app.use(staticFileMiddleware);
app.use(history({
  index: '/dist/spa-mat/index.html'
}))
app.use(staticFileMiddleware);
app.get('*', function (req, res) {
  console.info('Catch all routes');
  res.sendFile(path.join(__dirname + '/dist/spa-mat/index.html'));
});
app.listen(process.env.PORT);
