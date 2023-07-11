'use strict';

const logger = require('../../logger');

const DishRating = (sequelize, DataTypes) => {

  sequelize.define('DishRating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dishCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishItemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ratedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
