'use strict';

const logger = require('../../lib/logger');
const OrderService = require('../order/order.service');

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

  static async getWeeklyTotalSales(fromDate, toDate) {
    try {
      const result = await OrderService.getWeeklyTotalSales(fromDate, toDate);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async getMonthlyTotalSales(year) {
    try {
      const result = await OrderService.getMonthlyTotalSales(year);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = ReportService;