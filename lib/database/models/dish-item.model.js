'use strict';

const logger = require('../../logger');

const DishItem = (sequelize, DataTypes) => {

  sequelize.define('DishItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dishItemName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // dishCategoryId - As a part of this through the associations
  }, {
    tableName: 'dish_items',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('dish_items table creation successful');
  }).catch((error) => {
    logger.error(`unable to create dish_items table : ${error}`);
  });

};

module.exports = DishItem;
