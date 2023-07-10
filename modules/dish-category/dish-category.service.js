'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');

class DishCategoryService {
  static async getAllCategories() {
    try {

      return Promise.resolve([]);

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = DishCategoryService;