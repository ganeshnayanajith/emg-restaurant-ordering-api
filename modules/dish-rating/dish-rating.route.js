'use strict';

const express = require('express');
const router = express.Router();
const DishRatingController = require('./dish-rating.controller');

router.post('/', DishRatingController.createDishRating);
router.get('/', DishRatingController.getAllDishRatings);

module.exports = router;