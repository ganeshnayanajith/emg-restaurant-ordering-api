'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');
const DishCategoryRepository = require('./dish-category.repository');

class DishCategoryService {
  static async createDishCategory(data) {
    try {
      const result = await DishCategoryRepository.createDishCategory(data);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getAllCategories() {
    try {
      const result = await DishCategoryRepository.getAllCategories();
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = DishCategoryService;