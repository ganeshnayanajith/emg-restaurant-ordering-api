'use strict';

const lodash = require('lodash');
const Utils = require('../utils');
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS, MESSAGES } = require('../constant');
const moment = require('moment');

const authentication = (req, res, next) => {
  try {
    if (lodash.has(req.headers, 'authorization')) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = Utils.decodeToken(token);
      if (payload.exp <= moment().unix()) {
        Utils.errorResponse(res, new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, 'Authentication token is required'));
      }
      req.user = {
        userId: payload.userId,
        email: payload.email,
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
