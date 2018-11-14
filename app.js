const debug = require('debug')('app');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const apiPost = require('./routes/api/post');
const errors = require('./middlewares/errors');
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));

app.get('/api/posts', apiPost.index());
app.post('/api/posts', apiPost.create());

app.use(errors.error404());
app.use(errors.error());

debug('App is initiated');

module.exports = app;
