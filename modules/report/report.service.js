'use strict';

const logger = require('../../lib/logger');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');
const OrderService = require('../order/order.service');
const { OrderStatusEnum } = require('../../lib/enums/enum');

class ReportService {

  static async getDailyTotalSales(fromDate, toDate) {
    try {
      const result = await OrderService.getDailyTotalSales(fromDate, toDate);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = ReportService;