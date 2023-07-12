'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');
const DishItemRepository = require('./dish-item.repository');

class DishItemService {
  static async createDishItem(data, userId) {
    try {
      data.userId = userId;
      const result = await DishItemRepository.createDishItem(data);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getAllDishItems() {
    try {
      const result = await DishItemRepository.getAllDishItems();
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getDishItemsByIds(ids) {
    try {
      const result = await DishItemRepository.getDishItemsByIds(ids);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = DishItemService;