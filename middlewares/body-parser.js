const debug = require('../utils/debug')('body-parser');

const bodyParser = () => (req, res, next) => {
  let body = []

  req.on('data', chunk => {
    body.push(chunk);
    console.log('data', chunk) // todo debug 모듈 개선 필요
  })

  req.on('end', () => {
    body = Buffer.concat(body).toString();

    body = body.split('&').reduce((body, pair) => {
      if (!pair) return body;
      const frg = pair.split('=');
      body[frg[0]] = frg[1];
      return body;
    }, {});

    req.body = body;
    next();
  })
}

module.exports = bodyParser;
