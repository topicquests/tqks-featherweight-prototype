const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const feathersProxy = proxy({
  target: 'http://localhost:8081',
  logLevel: 'debug',
  ws: true, 
  pathRewrite: {
      '^/api' : '/' 
  }
});

app.use('/api', feathersProxy);
app.use(express.static('dist/spa-mat'));
app.use(history({
  index: '/dist/spa-mat/index.html'
}))
app.use(express.static('dist/spa-mat'));
app.listen(process.env.PORT);
