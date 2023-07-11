'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('dish_categories', [
      {
        id: 1,
        dishCategoryName: 'Rice',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        dishCategoryName: 'Soup',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        dishCategoryName: 'Kottu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        dishCategoryName: 'Biriyani',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        dishCategoryName: 'Salad',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  },
};
