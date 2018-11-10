const debug = require('./utils/debug')('app');
const App = require('./src/Application');
const app = App();

debug('App is initiated');

module.exports = app;
