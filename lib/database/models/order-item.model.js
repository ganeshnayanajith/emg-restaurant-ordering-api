'use strict';

const logger = require('../../logger');

const OrderItem = (sequelize, DataTypes) => {

  sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitSoldPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    itemsTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // orderId is a part of this through the associations
    // dishItemId is a part of this through the associations
    // userId is a part of this through the associations
  }, {
    tableName: 'order_items',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('order_items table creation successful');
  }).catch((error) => {
    logger.error(`unable to create order_items table : ${error}`);
  });

};

module.exports = OrderItem;
