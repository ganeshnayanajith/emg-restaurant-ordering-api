'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const DishCategoryService = require('./dish-category.service');
const DishCategoryValidator = require('./dish-category.validator');

exports.createDishCategory = async (req, res, next) => {
  try {
    const payload = await DishCategoryValidator.createValidation(req.body);
    const result = await DishCategoryService.createDishCategory(payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Dish category creation successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await DishCategoryService.getAllCategories();
    Utils.successResponse(res, HTTP_CODES.OK, 'Dish categories fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};