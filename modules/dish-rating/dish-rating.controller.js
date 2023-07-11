'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const DishRatingService = require('./dish-rating.service');

exports.createDishRating = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await DishRatingService.createDishRating(payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Dish rating creation successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAllDishRatings = async (req, res, next) => {
  try {
    const result = await DishRatingService.getAllDishRatings();
    Utils.successResponse(res, HTTP_CODES.OK, 'Dish ratings fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};