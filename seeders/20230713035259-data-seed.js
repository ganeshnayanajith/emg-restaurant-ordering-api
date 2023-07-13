'use strict';
const faker = require('faker');
const dishItemsData = require('../resources/dish-items-data');

const getUsers = () => {

  const users = [];

  for (let i = 1; i <= 100; i++) {

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const name = `${randomFirstName} ${randomLastName}`;
    const email = `${randomFirstName}.${randomLastName}@gmail.com`;

    const user = {
      id: i,
      name,
      email,
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);
  }

  return users;
};

const getDishCategories = () => {

  const dishCategoryNames = [ 'Fried Rice', 'Rice and Curry', 'Biriyani', 'Kottu', 'Noodles', 'Shorties', 'Juice', 'Soup' ];
  const dishCategories = [];

  let i = 0;

  for (const dishCategoryName of dishCategoryNames) {

    i++;

    const dishCategory = {
      id: i,
      dishCategoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dishCategories.push(dishCategory);
  }

  return dishCategories;

};

const getDishItems = () => {

  const dishItems = [];
  let i = 0;

  for (const item of dishItemsData) {

    i++;

    const dishItem = {
      id: i,
      dishItemName: item.dishItemName,
      unitPrice: item.unitPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      dishCategoryId: item.dishCategoryId,
    };

    dishItems.push(dishItem);
  }

  return dishItems;

};

module.exports = {
  async up(queryInterface, Sequelize) {

    const users = getUsers();
    const dishCategories = getDishCategories();
    const dishItems = getDishItems();

    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('dish_categories', dishCategories, {});
    await queryInterface.bulkInsert('dish_items', dishItems, {});


  },

  async down(queryInterface, Sequelize) {
  },
};
