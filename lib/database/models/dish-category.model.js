'use strict';

const logger = require('../../logger');

const DishCategory = (sequelize, DataTypes) => {

  sequelize.define('DishCategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dishCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'dish_categories',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('dish_categories table creation successful');
  }).catch((error) => {
    logger.error(`unable to create dish_categories table : ${error}`);
  });

};

module.exports = DishCategory;
