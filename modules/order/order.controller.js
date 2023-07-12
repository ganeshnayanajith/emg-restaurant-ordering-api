'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const OrderService = require('./order.service');

exports.createOrder = async (req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.user.userId;
    const result = await OrderService.createOrder(payload, userId);
    Utils.successResponse(res, HTTP_CODES.CREATED, 'Order creation successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const result = await OrderService.getAllOrders();
    Utils.successResponse(res, HTTP_CODES.OK, 'Orders fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};