'use strict';

const { models: { OrderItem, DishItem }, Op, sequelize } = require('../../lib/database/mysql-db-sequelize');

class OrderItemRepository {
  static async createOrderItems(dataArray) {
    try {
      const result = await OrderItem.bulkCreate(dataArray);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getTopSellingItems() {
    try {
      const result = await OrderItem.findAll({
        attributes: [
          'dishItemId',
          [ sequelize.fn('COUNT', sequelize.col('dishItemId')), 'itemCount' ],
        ],
        include: [
          {
            model: DishItem,
            attributes: [ 'dishItemName' ],
          },
        ],
        group: [ 'dishItemId' ],
        order: [ [ 'dishItemId', 'ASC' ] ],
      });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OrderItemRepository;
