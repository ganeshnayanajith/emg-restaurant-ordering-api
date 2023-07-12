'use strict';

const { models: { Order }, Op } = require('../../lib/database/mysql-db-sequelize');

class OrderRepository {
  static async createOrder(data) {
    try {
      const result = await Order.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllOrders() {
    try {
      const result = await Order.findAndCountAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const result = await Order.update(
        { status },
        {
          where: {
            id: orderId,
          },
        });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OrderRepository;
