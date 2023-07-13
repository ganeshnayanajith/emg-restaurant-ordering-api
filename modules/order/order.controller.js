'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const OrderService = require('./order.service');
const OrderValidator = require('./order.validator');

exports.createOrder = async (req, res, next) => {
  try {
    const payload = await OrderValidator.createValidation(req.body);
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

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = parseInt(req.params['orderId']);
    const { status } = await OrderValidator.updateValidation(req.body);
    const result = await OrderService.updateOrderStatus(orderId, status);
    Utils.successResponse(res, HTTP_CODES.OK, 'Order updating successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};