'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

module.exports = () => {
  router.post('/register', UserController.register);
  router.post('/login', UserController.login);

  return router;
};