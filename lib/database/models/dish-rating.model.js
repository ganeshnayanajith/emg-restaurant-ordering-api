'use strict';

const logger = require('../../logger');

const DishRating = (sequelize, DataTypes) => {

  sequelize.define('DishRating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // userId is a part of this through the associations
    // OrderItemId is a part of this through the associations
  }, {
    tableName: 'dish_ratings',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('dish_ratings table creation successful');
  }).catch((error) => {
    logger.error(`unable to create dish_ratings table : ${error}`);
  });

};

module.exports = DishRating;
