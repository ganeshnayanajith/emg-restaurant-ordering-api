'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

module.exports = () => {
  router.post('/', UserController.register);

  return router;
};