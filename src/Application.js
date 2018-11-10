const debug = require('../utils/debug')('Application');
const http = require('http');

const Application = () => {
  const _server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  });

  const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
    _server.listen(port, hostname, fn)
    debug('server is listening');
  }

  return {
    _server,
    listen
  }
}




module.exports = Application