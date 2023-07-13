'use strict';

const lodash = require('lodash');
const Utils = require('../utils');
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS, MESSAGES } = require('../constant');
const moment = require('moment');
const UserService = require('../../modules/user/user.service');

const authentication = async (req, res, next) => {
  try {
    if (lodash.has(req.headers, 'authorization')) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await Utils.decodeToken(token);
      if (payload.exp <= moment().unix()) {
        Utils.errorResponse(res, new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, 'Authentication token is required'));
      }

      const userId = payload.userId;
      const email = payload.email;

      await UserService.findUserByIdAndEmail(userId, email);

      req.user = {
        userId,
        email,
      };

      next();

    } else {
      Utils.errorResponse(res, new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, 'Authentication token is required'));
    }
  } catch (err) {
    Utils.errorResponse(res, new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, err.message));
  }
};

module.exports = authentication;
