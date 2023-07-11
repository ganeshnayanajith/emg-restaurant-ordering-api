'use strict';

const { models: { DishItem }, Op } = require('../../lib/database/mysql-db-sequelize');

class DishItemRepository {
  static async createDishItem(data) {
    try {
      const result = await DishItem.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllDishItems() {
    try {
      const result = await DishItem.findAndCountAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = DishItemRepository;
