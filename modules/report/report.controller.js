'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');
const ReportService = require('./report.service');
const ReportValidator = require('./report.validator');

exports.getDailyTotalSales = async (req, res, next) => {
  try {
    const { fromDate, toDate } = await ReportValidator.getDailyTotalSalesValidation(req.query);
    const result = await ReportService.getDailyTotalSales(fromDate, toDate);
    Utils.successResponse(res, HTTP_CODES.OK, 'Daily total sales report data fetching successful', result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};