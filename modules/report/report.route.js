'use strict';

const express = require('express');
const router = express.Router();
const ReportController = require('./report.controller');
const Authenticator = require('../../lib/security/authenticator');

router.get('/daily-total-sales', ReportController.getDailyTotalSales);
router.get('/weekly-total-sales', ReportController.getWeeklyTotalSales);
router.get('/monthly-total-sales', ReportController.getMonthlyTotalSales);
router.get('/top-selling-items', ReportController.getTopSellingItems);

module.exports = router;