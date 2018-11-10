const debug = require('../utils/debug')('Middleware');

const Middleware = () => {
  const _middlewares = [];

  const add = fn => {
    _middlewares.push(fn);
  }

  return {
    _middlewares,
    add,
  }
}

module.exports = Middleware;
