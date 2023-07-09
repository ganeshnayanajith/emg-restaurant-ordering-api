'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const UserService = require('./user.service');

exports.register = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await UserService.register(userData);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Registration successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await UserService.login(payload);
    Utils.successResponse(res, HTTP_CODES.OK, 'Login successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};