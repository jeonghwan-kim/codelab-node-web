const debug = require('./utils/debug')('app');
const serveStatic = require('./middlewares/serve-static');
const App = require('./src/Application');
const app = App();

app.use(serveStatic());
debug('App is initiated');

module.exports = app;
