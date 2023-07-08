'use strict';
const { sequelize, Sequelize } = require('../../lib/mysql-db-sequelize');
const logger = require('../../lib/logger');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  logger.info('User table creation successful');
}).catch((error) => {
  logger.error(`Unable to create user table : ${JSON.stringify(error)}`);
});

module.exports = User;
