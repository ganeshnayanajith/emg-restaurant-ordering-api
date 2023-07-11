'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');
const DishRatingRepository = require('./dish-rating.repository');

class DishRatingService {
  static async createDishRating(data) {
    try {
      const result = await DishRatingRepository.createDishRating(data);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getAllDishRatings() {
    try {
      const result = await DishRatingRepository.getAllDishRatings();
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = DishRatingService;