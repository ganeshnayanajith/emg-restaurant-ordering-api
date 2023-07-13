'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const ReportService = require('./report.service');
const ReportValidator = require('./report.validator');

exports.getDailyTotalSales = async (req, res, next) => {
  try {
    const { fromDate, toDate } = await ReportValidator.fromDateToDateValidation(req.query);
    const result = await ReportService.getDailyTotalSales(fromDate, toDate);
    Utils.successResponse(res, HTTP_CODES.OK, 'Daily total sales report data fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getWeeklyTotalSales = async (req, res, next) => {
  try {
    const { fromDate, toDate } = await ReportValidator.fromDateToDateValidation(req.query);
    const result = await ReportService.getWeeklyTotalSales(fromDate, toDate);
    Utils.successResponse(res, HTTP_CODES.OK, 'Weekly total sales report data fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getMonthlyTotalSales = async (req, res, next) => {
  try {
    const { year } = await ReportValidator.getMonthlyTotalSalesValidation(req.query);
    const result = await ReportService.getMonthlyTotalSales(year);
    Utils.successResponse(res, HTTP_CODES.OK, 'Monthly total sales report data fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};