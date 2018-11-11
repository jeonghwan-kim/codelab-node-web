const debug = require('../utils/debug')('index');
const path = require('path');
const fs = require('fs');

const listPosts = () => (req, res, next) => {
  debug('index()');
  const publicPath = path.join(__dirname, '../public');

  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  })
}

module.exports = {
  listPosts
}