'use strict';

const { models: { DishCategory }, Op } = require('../../lib/database/mysql-db-sequelize');

class DishCategoryRepository {
  static async createDishCategory(data) {
    try {
      const result = await DishCategory.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllCategories() {
    try {
      const result = await DishCategory.findAndCountAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = DishCategoryRepository;
