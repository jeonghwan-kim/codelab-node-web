const debug = require('../utils/debug')('Middleware');

const Middleware = () => {
  const _middlewares = [];

  return {
    _middlewares,
  }
}

module.exports = Middleware;
