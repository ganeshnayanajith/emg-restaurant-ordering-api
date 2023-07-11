'use strict';

const express = require('express');
const router = express.Router();
const DishItemController = require('./dish-item.controller');

module.exports = () => {
  router.post('/', DishItemController.createDishItem);
  router.get('/', DishItemController.getAllDishItems);

  return router;
};