'use strict';
const { ERRORS, MESSAGES, HTTP_CODES, LOGGER } = require('./constant');
const logger = require('./logger');

class Utils {
  static successResponse(res, status, message, data) {
    return res.status(status).send({
      status,
      message,
      data,
      error: null,
    });
  }

  static errorResponse(res, err) {
    logger.error(LOGGER.ERROR, JSON.stringify(err));
    console.error(err);
    if (err.status) {
      return res.status(err.status).send({
        status: err.status,
        error: err.error,
        message: err.message,
        data: null,
      });
    } else if (err.errors && err.errors[0] && err.errors[0].message) {
      return res.status(HTTP_CODES.BAD_REQUEST).send({
        status: HTTP_CODES.BAD_REQUEST,
        error: err.name,
        message: err.errors[0].message,
        data: null,
      });
    } else if (err.name) {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        status: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: err.name,
        data: null,
      });
    } else {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        status: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        data: null,
      });
    }
  }

}

module.exports = Utils;
