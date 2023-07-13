'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const UserService = require('./user.service');
const UserValidator = require('./user.validator');

exports.register = async (req, res, next) => {
  try {
    const userData = await UserValidator.registerValidation(req.body);
    const result = await UserService.register(userData);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Registration successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const payload = await UserValidator.loginValidation(req.body);
    const result = await UserService.login(payload);
    Utils.successResponse(res, HTTP_CODES.OK, 'Login successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};