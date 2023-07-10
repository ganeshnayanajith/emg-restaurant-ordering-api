'use strict';

const express = require('express');
const router = express.Router();
const DishCategoryController = require('./dish-category.controller');

module.exports = () => {
  router.get('/all', DishCategoryController.getAllCategories);

  return router;
};