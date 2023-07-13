'use strict';

const Ajv = require('ajv');
const CustomHttpError = require('../../lib/custom-http-error');
const logger = require('../../lib/logger');
const { HTTP_CODES, ERRORS } = require('../../lib/constant.js');

const createSchema = {
  type: 'object',
  properties: {
    dishCategoryId: { type: 'number' },
    dishItemName: { type: 'string' },
    unitPrice: { type: 'number' },
  },
  required: [ 'dishCategoryId', 'dishItemName', 'unitPrice' ],
  additionalProperties: false,
};

const ajv = new Ajv();

class DishItemValidator {

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

module.exports = DishItemValidator;