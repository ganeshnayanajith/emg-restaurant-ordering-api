'use strict';

const express = require('express');
const router = express.Router();
const DishCategoryController = require('./dish-category.controller');

router.post('/', DishCategoryController.createDishCategory);
router.get('/', DishCategoryController.getAllCategories);

module.exports = router;