'use strict';

const Ajv = require('ajv');
const CustomHttpError = require('../../lib/custom-http-error');
const logger = require('../../lib/logger');
const { HTTP_CODES, ERRORS } = require('../../lib/constant.js');

const registerSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: [ 'name', 'email', 'password' ],
  additionalProperties: false,
};

const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: [ 'email', 'password' ],
  additionalProperties: false,
};

const ajv = new Ajv();

class UserValidator {

  static registerValidation(data) {
    const validate = ajv.compile(registerSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return data;
    }
  }

  static loginValidation(data) {
    const validate = ajv.compile(loginSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return data;
    }
  }

}

module.exports = UserValidator;