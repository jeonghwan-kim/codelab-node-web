const debug = require('../utils/debug')('Application');
const http = require('http');
const Middleware = require('./Middleware');


const Application = () => {
  const _middleware = Middleware();

  const _server = http.createServer((req, res) => {
    _middleware.run(req, res);
  });

  const use = fn => _middleware.add(fn);

  const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
    _server.listen(port, hostname, fn);

    debug('server is listening');
  }

  return {
    _middleware,
    _server,
    use,
    listen
  }
}




module.exports = Application