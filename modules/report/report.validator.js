'use strict';

const Ajv = require('ajv');
const CustomHttpError = require('../../lib/custom-http-error');
const logger = require('../../lib/logger');
const { HTTP_CODES, ERRORS } = require('../../lib/constant.js');

const fromDateToDateSchema = {
  type: 'object',
  properties: {
    fromDate: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
    toDate: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
  },
  required: [ 'fromDate', 'toDate' ],
  additionalProperties: false,
};

const getMonthlyTotalSalesSchema = {
  type: 'object',
  properties: {
    year: { type: 'string', pattern: '^[0-9]{4}$' },
  },
  required: [ 'year' ],
  additionalProperties: false,
};


const ajv = new Ajv();

class ReportValidator {

  static fromDateToDateValidation(data) {
    const validate = ajv.compile(fromDateToDateSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {

      const fromDate = new Date(data.fromDate);
      const toDate = new Date(data.toDate);

      if (toDate.getTime() < fromDate.getTime()) {
        logger.error('toDate is not greater than fromDate');
        throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, 'toDate is not greater than fromDate');
      } else {
        return data;
      }

    }
  }

  static getMonthlyTotalSalesValidation(data) {
    const validate = ajv.compile(getMonthlyTotalSalesSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return data;
    }
  }

}

module.exports = ReportValidator;