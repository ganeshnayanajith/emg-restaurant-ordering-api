'use strict';

const { Sequelize } = require('sequelize');
const secretConfig = require('../secret-config');

const sequelize = new Sequelize(secretConfig.MYSQL_DB_NAME, secretConfig.MYSQL_DB_USER, secretConfig.MYSQL_DB_PASSWORD,
  {
    host: secretConfig.MYSQL_DB_HOST,
    dialect: secretConfig.MYSQL_DB_DIALECT,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;