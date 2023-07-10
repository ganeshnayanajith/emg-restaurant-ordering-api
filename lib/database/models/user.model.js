'use strict';

const logger = require('../../logger');

const User = (sequelize, DataTypes) => {

  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  sequelize.sync().then(() => {
    logger.info('users table creation successful');
  }).catch((error) => {
    logger.error(`unable to create users table : ${error}`);
  });

};

module.exports = User;
