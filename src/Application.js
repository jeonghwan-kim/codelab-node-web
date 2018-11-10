const debug = require('../utils/debug')('Application');
const http = require('http');
const serveStatic = require('./serve-static');
const path = require('path');
const fs = require('fs');


const Application = () => {
  const _server = http.createServer((req, res) => {
    serveStatic(req, res)

    const publicPath = path.join(__dirname, '../public')
    fs.readFile(`${publicPath}/index.html`, (err, data) => {
      if (err) throw err

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html');
      res.end(data)
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