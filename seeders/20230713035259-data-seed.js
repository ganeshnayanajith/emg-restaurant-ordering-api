'use strict';
const faker = require('faker');
const dishItemsData = require('../resources/dish-items-data');
const { OrderStatusEnum } = require('../lib/enums/enum');

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

const getOrdersAndOrderItems = (users, dishItems) => {

  const orders = [];
  const orderItems = [];
  let orderItemId = 1;

  // creating 10000 orders for a random user
  for (let i = 1; i <= 10000; i++) {

    // current order details for a random user

    // selecting a random user id within inserted data (100 users currently saved in the database)
    const userId = Math.floor(Math.random() * 100) + 1;
    // random date for the order
    const date = faker.date.past();
    // consider a user can have items in the order between 1 and 5
    const totalItemQuantity = Math.floor(Math.random() * 5) + 1;
    let totalPrice = 0;
    const currentOrderItems = [];

    // random order items for current order
    for (let j = 0; j < totalItemQuantity; j++) {
      // selecting a random dish item id within inserted data (44 dish items currently saved in the database)
      const dishItemId = Math.floor(Math.random() * 44) + 1;

      const dishItem = dishItems.find(di => di.id === dishItemId);

      totalPrice += dishItem.unitPrice;

      const existingDishItemInCurrentOrderItems = currentOrderItems.find(coi => coi.dishItemId === dishItemId);

      if (existingDishItemInCurrentOrderItems) {
        existingDishItemInCurrentOrderItems.itemsQuantity = existingDishItemInCurrentOrderItems.itemsQuantity + 1;
        existingDishItemInCurrentOrderItems.itemsTotalPrice = existingDishItemInCurrentOrderItems.itemsTotalPrice + dishItem.unitPrice;
      } else {
        const orderItem = {
          id: orderItemId,
          itemsQuantity: 1,
          unitSoldPrice: dishItem.unitPrice,
          itemsTotalPrice: dishItem.unitPrice,
          orderId: i,
          dishItemId,
          userId,
          createdAt: date,
          updatedAt: date,
        };
        orderItemId++;
        currentOrderItems.push(orderItem);
      }

    }
    // end of creating order items for current order

    const order = {
      id: i,
      totalItemQuantity,
      totalPrice,
      status: OrderStatusEnum.COMPLETED,
      userId,
      createdAt: date,
      updatedAt: date,
    };

    orders.push(order);
    orderItems.push(...currentOrderItems);

  }
  // end of creating 10000 orders

  return { orders, orderItems };

};

module.exports = {
  async up(queryInterface, Sequelize) {

    const users = getUsers();
    const dishCategories = getDishCategories();
    const dishItems = getDishItems();
    const { orders, orderItems } = getOrdersAndOrderItems(users, dishItems);

    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('dish_categories', dishCategories, {});
    await queryInterface.bulkInsert('dish_items', dishItems, {});
    await queryInterface.bulkInsert('orders', orders, {});
    await queryInterface.bulkInsert('order_items', orderItems, {});


  },

  async down(queryInterface, Sequelize) {
  },
};
