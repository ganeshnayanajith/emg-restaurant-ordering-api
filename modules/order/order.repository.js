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

  static async getWeeklyTotalSales(fromDate, toDate) {
    try {
      // reset the first monday's date to the fromDate of the given date range
      const startOfWeek = new Date(fromDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

      // reset the last sunday's date to the toDate of the given date range
      const endOfWeek = new Date(toDate);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));

      const results = await Order.findAll({
        attributes: [
          [ sequelize.fn('DATE_FORMAT', sequelize.fn('MIN', sequelize.col('createdAt')), '%Y-%m-%d'), 'weekStart' ],
          [ sequelize.fn('DATE_FORMAT', sequelize.fn('MAX', sequelize.col('createdAt')), '%Y-%m-%d'), 'weekEnd' ],
          [ sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSales' ],
        ],
        where: {
          createdAt: {
            [Op.between]: [ startOfWeek, endOfWeek ],
          },
        },
        group: sequelize.literal('YEARWEEK(createdAt, 1)'),
        order: sequelize.literal('YEARWEEK(createdAt, 1)'),
        raw: true,
      });

      const weeklySalesReport = results.map((result) => ({
        weekStart: result.weekStart,
        weekEnd: result.weekEnd,
        totalSales: result.totalSales,
      }));

      return Promise.resolve(weeklySalesReport);

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OrderRepository;
