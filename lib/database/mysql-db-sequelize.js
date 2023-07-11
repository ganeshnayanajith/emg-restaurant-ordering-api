'use strict';

const { Sequelize, DataTypes, Op } = require('sequelize');
const secretConfig = require('../../secret-config');
const logger = require('../logger');

const applyAssociations = (sequelize) => {
  const {
    User,
    DishCategory,
    DishItem,
    DishRating,
  } = sequelize.models;

  DishCategory.hasMany(DishItem, { foreignKey: { name: 'dishCategoryId', allowNull: false }, sourceKey: 'id' });
  DishItem.belongsTo(DishCategory, { foreignKey: { name: 'dishCategoryId', allowNull: false }, targetKey: 'id' });

  User.hasMany(DishItem, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  DishItem.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' });

  DishItem.hasOne(DishRating, { foreignKey: { name: 'dishItemId', allowNull: false }, sourceKey: 'id' });
  DishRating.belongsTo(DishItem, { foreignKey: { name: 'dishItemId', allowNull: false }, targetKey: 'id' });

  DishCategory.hasMany(DishRating, { foreignKey: { name: 'dishCategoryId', allowNull: false }, sourceKey: 'id' });
  DishRating.belongsTo(DishCategory, { foreignKey: { name: 'dishCategoryId', allowNull: false }, targetKey: 'id' });

  User.hasMany(DishRating, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  DishRating.belongsTo(DishItem, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' });

};

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
  require('./models/dish-rating.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

applyAssociations(sequelize);

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