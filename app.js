const path = require('path');
const fs = require('fs');
const debug = require('./utils/debug')('app');
const serveStatic = require('./middlewares/serve-static');
const App = require('./src/Application');
const app = App();

const index = (req, res, next) => {
  debug('index()');
  const publicPath = path.join(__dirname, './public');

  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  })
}

const error404 = (req, res, next) => {
  debug('error404()');
  res.statusCode = 404;
  res.end('Not Found');
}

const error = (err, req, res, next) => {
  debug('error()');
  res.statusCode = 500;
  res.end();
}

app.use(serveStatic());
app.use(index);
app.use(error404);
app.use(error);


debug('App is initiated');

module.exports = app;
