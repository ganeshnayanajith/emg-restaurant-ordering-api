'use strict';

const express = require('express');
const router = express.Router();
const OrderController = require('./order.controller');
const Authenticator = require('../../lib/security/authenticator');

router.post('/', Authenticator, OrderController.createOrder);
router.get('/', OrderController.getAllOrders);

module.exports = router;