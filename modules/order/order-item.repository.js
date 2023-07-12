'use strict';

const { models: { OrderItem }, Op } = require('../../lib/database/mysql-db-sequelize');

class OrderItemRepository {
  static async createOrderItems(dataArray) {
    try {
      const result = await OrderItem.bulkCreate(dataArray);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OrderItemRepository;
