const debug = require('../utils/debug')('Application');
const http = require('http');
const path = require('path');
const fs = require('fs');

const Application = () => {
  const _server = http.createServer((req, res) => {
    const mimeType = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.eot': 'appliaction/vnd.ms-fontobject',
      '.ttf': 'aplication/font-sfnt'
    };
    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, '../public')


    if (Object.keys(mimeType).includes(ext)) {
      fs.readFile(`${publicPath}${req.url}`, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not found');
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', mimeType[ext]);
          res.end(data)
        }
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      const filePath = path.join(__dirname, '../public/index.html')
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;

        res.end(data);
      })
    }
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