'use strict';
const { ERRORS, MESSAGES, HTTP_CODES } = require('./constant');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const secretConfig = require('../secret-config');

class Utils {

  static async generateToken(data) {
    try {
      const opts = {
        expiresIn: '1d',
      };
      const token = jwt.sign(data, secretConfig.JWT_SECRET, opts);
      return Promise.resolve(token);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async decodeToken(token) {
    try {
      const payload = await jwt.verify(token, secretConfig.JWT_SECRET);
      return Promise.resolve(payload);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static successResponse(res, status, message, data) {
    return res.status(status).send({
      status,
      message,
      data,
      error: null,
    });
  }

  static errorResponse(res, err) {
    // TODO: Extra configs
    // logger.error(err);
    // console.error(err);

    let status = HTTP_CODES.SERVER_ERROR;
    let error = ERRORS.SERVER_ERROR;
    let message = MESSAGES.SOMETHING_WENT_WRONG;

    if (err.message) {
      message = err.message;
    }

    if (err.errors && err.errors[0] && err.errors[0].message) {
      status = HTTP_CODES.BAD_REQUEST;
      message = err.errors[0].message;
    }

    if (err.name) {
      error = err.name;
    }

    if (err.status) {
      status = err.status;
    }

    return res.status(status).send({
      status,
      error,
      message,
      data: null,
    });

  }

}

module.exports = Utils;
