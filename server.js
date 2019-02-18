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
  disableDotRule: true,
  verbose: true
}))
app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/spa-mat/index.html'));
});
app.listen(process.env.PORT);
