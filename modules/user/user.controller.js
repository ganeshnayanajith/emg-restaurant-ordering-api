'use strict';

const { HTTP_CODES } = require('../../lib/constant');
const Utils = require('../../lib/utils');

exports.get = async (req, res, next) => {
  try {
    Utils.successResponse(res, HTTP_CODES.OK, 'Merged and saved successfully', { result: 'hi' });
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};