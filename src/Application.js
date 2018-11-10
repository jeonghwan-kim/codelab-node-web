const debug = require('../utils/debug')('Application');
const http = require('http');
const path = require('path');
const fs = require('fs');

const Application = () => {
  const _server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const filePath = path.join(__dirname, '../public/index.html')
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      res.end(data);
    })
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