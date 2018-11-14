const debug = require('debug')('bin');
const app = require('./app');
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
