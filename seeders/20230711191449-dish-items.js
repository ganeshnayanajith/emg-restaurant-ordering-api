'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('dish_items', [
      {
        id: 1,
        dishCategoryId: 1,
        dishItemName: 'Chicken Rice',
        unitPrice: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        dishCategoryId: 1,
        dishItemName: 'Fish Rice',
        unitPrice: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        dishCategoryId: 2,
        dishItemName: 'Chicken Soup',
        unitPrice: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        dishCategoryId: 2,
        dishItemName: 'Vegetable Soup',
        unitPrice: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        dishCategoryId: 3,
        dishItemName: 'Chicken Kottu',
        unitPrice: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  },
};
