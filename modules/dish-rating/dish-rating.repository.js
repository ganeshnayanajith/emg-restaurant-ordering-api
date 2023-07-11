'use strict';

const { models: { DishRating }, Op } = require('../../lib/database/mysql-db-sequelize');

class DishRatingRepository {
  static async createDishRating(data) {
    try {
      const result = await DishRating.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllDishRatings() {
    try {
      const result = await DishRating.findAndCountAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = DishRatingRepository;
