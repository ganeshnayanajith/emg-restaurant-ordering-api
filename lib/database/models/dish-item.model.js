'use strict';

const logger = require('../../logger');

const DishItem = (sequelize, DataTypes) => {

  sequelize.define('DishItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dishItemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
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
