'use strict';

const express = require('express');
const router = express.Router();
const DishItemController = require('./dish-item.controller');
const Authenticator = require('../../lib/security/authenticator');

router.post('/', Authenticator, DishItemController.createDishItem);
router.get('/', DishItemController.getAllDishItems);

module.exports = router;