const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

// dependency 'morgan' is used for logger https://gist.github.com/leommoore/7524073
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

// App works here http://localhost:4001/
