const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');

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

app.listen(process.env.PORT);