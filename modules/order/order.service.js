'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');
const OrderRepository = require('./order.repository');
const OrderItemRepository = require('./order-item.repository');
const DishItemService = require('../dish-item/dish-item.service');

class OrderService {
  static async createOrder(data, userId) {
    try {

      const dishItemIdArray = data.dishItems.map(item => item.dishItemId);

      const dishItemsData = await DishItemService.getDishItemsByIds(dishItemIdArray);

      if (dishItemsData.length !== dishItemIdArray.length) {
        logger.error(`Dish items not found`);
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, 'Dish items not found'));
      }


      const orderItems = [];
      let totalItemQuantity = 0;
      let totalPrice = 0;

      data.dishItems.forEach(item => {
        const dishItem = dishItemsData.find(d => d.id === item.dishItemId);
        if (dishItem) {
          const itemsTotalPrice = dishItem.unitPrice * item.quantity;

          const orderItem = {
            userId,
            dishItemId: item.dishItemId,
            itemsTotalPrice,
            unitSoldPrice: dishItem.unitPrice,
            itemsQuantity: item.quantity,
          };

          orderItems.push(orderItem);

          totalItemQuantity += item.quantity;
          totalPrice += itemsTotalPrice;

        } else {

          const errorMessage = `Dish item data not found for id: ${item.dishItemId}`;
          logger.error(errorMessage);
          return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, errorMessage));

        }
      });

      const order = {
        totalPrice,
        totalItemQuantity,
        userId,
      };

      const orderDetails = await OrderRepository.createOrder(order);

      orderItems.forEach(orderItem => {
        orderItem.orderId = orderDetails.id;
      });

      const orderItemsDetails = await OrderItemRepository.createOrderItems(orderItems);

      return Promise.resolve({ orderDetails, orderItemsDetails });

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getAllOrders() {
    try {
      const result = await OrderRepository.getAllOrders();
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = OrderService;