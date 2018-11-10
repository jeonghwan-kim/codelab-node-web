const debug = require('../utils/debug')('Middleware');

const Middleware = () => {
  const _middlewares = [];

  const _run = (i, err) => {
    if (i < 0 || i >= _middlewares.length) return;

    debug(`i:${i} _middlewares:${_middlewares.length}`)

    const nextMw = _middlewares[i]
    const next = err => _run(i + 1, err)

    nextMw(_req, _res, next);
  }


  const add = fn => {
    _middlewares.push(fn);
  }

  const run = (req, res) => {
    _req = req;
    _res = res;

    _run(0, null);
  }

  return {
    _middlewares,
    add,
    run,
  }
}

module.exports = Middleware;
