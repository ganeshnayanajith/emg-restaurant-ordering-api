'use strict';

const Ajv = require('ajv');
const CustomHttpError = require('../../lib/custom-http-error');
const logger = require('../../lib/logger');
const { HTTP_CODES, ERRORS } = require('../../lib/constant.js');

const createSchema = {
  type: 'object',
  properties: {
    dishCategoryName: { type: 'string' },
  },
  required: [ 'dishCategoryName' ],
  additionalProperties: false,
};

const ajv = new Ajv();

class DishCategoryValidator {

  static createValidation(data) {
    const validate = ajv.compile(createSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return data;
    }
  }

}

module.exports = DishCategoryValidator;