'use strict';

const { models: { Order }, Op, sequelize } = require('../../lib/database/mysql-db-sequelize');

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

  static async getDailyTotalSales(fromDate, toDate) {
    try {
      const result = await Order.findAll({
        attributes: [
          [ sequelize.fn('date', sequelize.col('createdAt')), 'date' ],
          [ sequelize.fn('sum', sequelize.col('totalPrice')), 'totalSales' ],
        ],
        where: {
          createdAt: {
            [Op.between]: [ fromDate, toDate ],
          },
        },
        group: [ sequelize.fn('date', sequelize.col('createdAt')) ],
        order: [ [ sequelize.fn('date', sequelize.col('createdAt')), 'ASC' ] ],
        raw: true,
        nest: true,
      });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OrderRepository;
