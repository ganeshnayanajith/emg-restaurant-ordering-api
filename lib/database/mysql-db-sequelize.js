'use strict';

const { Sequelize, DataTypes, Op } = require('sequelize');
const secretConfig = require('../../secret-config');
const logger = require('../logger');

const sequelize = new Sequelize(secretConfig.MYSQL_DB_NAME, secretConfig.MYSQL_DB_USER, secretConfig.MYSQL_DB_PASSWORD,
  {
    host: secretConfig.MYSQL_DB_HOST,
    dialect: secretConfig.MYSQL_DB_DIALECT,
  },
);

const modelDefiners = [
  require('./models/user.model'),
  require('./models/dish-category.model'),
  require('./models/dish-item.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

const initialize = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection establishment successful');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
};

const db = {};

db.initialize = initialize;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = sequelize.models;
db.Op = Op;

module.exports = db;