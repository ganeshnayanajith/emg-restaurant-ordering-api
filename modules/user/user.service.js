'use strict';

const logger = require('../../lib/logger');
const CONSTANT = require('../../lib/constant.js');

class UserService {
  static async register(userData) {
    try {
      return Promise.resolve(userData);
    } catch (e) {
      logger.log(CONSTANT.LOGGER.ERROR, e);
      return Promise.reject(e);
    }
  }
}

module.exports = UserService;