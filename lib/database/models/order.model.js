'use strict';

const logger = require('../../logger');

const Order = (sequelize, DataTypes) => {

  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalItemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // userId is a part of this through the associations
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('orders table creation successful');
  }).catch((error) => {
    logger.error(`unable to create orders table : ${error}`);
  });

};

module.exports = Order;
