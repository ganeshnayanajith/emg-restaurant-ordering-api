'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const loggerMorgan = require('morgan');
const cors = require('cors');

const CONSTANT = require('./lib/constant.js');
const logger = require('./lib/logger');
const secretConfig = require('./secret-config');
const { sequelize } = require('./lib/mysql-db-sequelize');

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
})();

const indexRouter = require('./routes/index');
const usersRouter = require('./modules/user/user.route');

const BASE_PATH = CONSTANT.API.BASE_PATH;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(loggerMorgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use(`${BASE_PATH}/`, indexRouter);
app.use(`${BASE_PATH}/users`, usersRouter());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
