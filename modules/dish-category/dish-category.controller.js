'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const DishCategoryService = require('./dish-category.service');

exports.createDishCategory = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await DishCategoryService.createDishCategory(payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Categories creation successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await DishCategoryService.getAllCategories();
    Utils.successResponse(res, HTTP_CODES.OK, 'Categories fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};