'use strict';

const express = require('express');
const router = express.Router();
const ReportController = require('./report.controller');
const Authenticator = require('../../lib/security/authenticator');

router.get('/daily-total-sales', ReportController.getDailyTotalSales);

module.exports = router;