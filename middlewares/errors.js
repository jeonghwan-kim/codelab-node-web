const debug = require('debug')('errors');

const error404 = () => (req, res, next) => {

  debug('error404()');

  res.statusCode = 404;
  res.end('Not Found');
}

const error = () => (err, req, res, next) => {

  debug('error()');

  res.statusCode = 500;
  res.end();
}

module.exports = {
  error404,
  error,
}