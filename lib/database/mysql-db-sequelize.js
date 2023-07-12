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
    Order,
    OrderItem,
  } = sequelize.models;

  DishCategory.hasMany(DishItem, { foreignKey: { name: 'dishCategoryId', allowNull: false }, sourceKey: 'id' });
  DishItem.belongsTo(DishCategory, { foreignKey: { name: 'dishCategoryId', allowNull: false }, targetKey: 'id' });

  User.hasMany(Order, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  Order.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' });

  Order.belongsToMany(DishItem, {
    through: OrderItem,
    foreignKey: { name: 'orderId', allowNull: false },
    sourceKey: 'id',
  });
  DishItem.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: { name: 'dishItemId', allowNull: false },
    sourceKey: 'id',
  });

  OrderItem.hasOne(DishRating, { foreignKey: { name: 'OrderItemId', allowNull: false }, sourceKey: 'id' });
  DishRating.belongsTo(OrderItem, { foreignKey: { name: 'OrderItemId', allowNull: false }, targetKey: 'id' });

  User.hasMany(OrderItem, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  OrderItem.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' });

  User.hasMany(DishRating, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  DishRating.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' });

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
  require('./models/order.model'),
  require('./models/order-item.model'),
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