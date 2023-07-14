'use strict';

const Ajv = require('ajv');
const CustomHttpError = require('../../lib/custom-http-error');
const logger = require('../../lib/logger');
const { HTTP_CODES, ERRORS } = require('../../lib/constant.js');
const { OrderStatusEnum } = require('../../lib/enums/enum');

const createSchema = {
  type: 'object',
  properties: {
    dishItems: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dishItemId: {
            type: 'number',
          },
          quantity: {
            type: 'number',
          },
        },
        required: [ 'dishItemId', 'quantity' ],
      },
    },
  },
  required: [ 'dishItems' ],
  additionalProperties: false,
};

const updateSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: [ OrderStatusEnum.PENDING, OrderStatusEnum.PREPARING, OrderStatusEnum.PACKING, OrderStatusEnum.ON_THE_WAY, OrderStatusEnum.COMPLETED ],
    },
  },
  required: [ 'status' ],
  additionalProperties: false,
};

const getAllSchema = {
  type: 'object',
  properties: {
    skip: {
      type: 'number',
      default: 0,
    },
    limit: {
      type: 'number',
      default: 50,
    },
  },
  additionalProperties: false,
};

const ajv = new Ajv();

class OrderValidator {

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

  static updateValidation(data) {
    const validate = ajv.compile(updateSchema);
    const valid = validate(data);
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return data;
    }
  }

  static getAllValidation(data) {
    const validate = ajv.compile(getAllSchema);
    const valid = validate({ skip: parseInt(data.skip), limit: parseInt(data.limit) });
    if (!valid) {
      logger.error(JSON.stringify(validate.errors));
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, validate.errors[0].message);
    } else {
      return { skip: parseInt(data.skip), limit: parseInt(data.limit) };
    }
  }

}

module.exports = OrderValidator;