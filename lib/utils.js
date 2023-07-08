'use strict';
const { ERRORS, MESSAGES, HTTP_CODES, LOGGER } = require('./constant');
const logger = require('./logger');

class Utils {
  static successResponse(res, statusCode, message, data) {
    return res.status(statusCode).send({
      statusCode,
      message,
      data,
      error: null,
    });
  }

  static errorResponse(res, err) {
    logger.log(LOGGER.ERROR, JSON.stringify(err));
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send({
        statusCode: err.statusCode,
        error: err.error,
        message: err.message,
        data: null,
      });
    } else if (err.errors && err.errors[0] && err.errors[0].message) {
      return res.status(HTTP_CODES.BAD_REQUEST).send({
        statusCode: HTTP_CODES.BAD_REQUEST,
        error: err.name,
        message: err.errors[0].message,
        data: null,
      });
    } else if (err.name) {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        statusCode: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: err.name,
        data: null,
      });
    } else {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        statusCode: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        data: null,
      });
    }
  }

}

module.exports = Utils;
