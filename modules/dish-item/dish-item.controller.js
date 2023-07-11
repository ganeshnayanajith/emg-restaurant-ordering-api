'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const DishItemService = require('./dish-item.service');

exports.createDishItem = async (req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.user.userId;
    const result = await DishItemService.createDishItem(payload, userId);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Dish item creation successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAllDishItems = async (req, res, next) => {
  try {
    const result = await DishItemService.getAllDishItems();
    Utils.successResponse(res, HTTP_CODES.OK, 'Dish items fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};