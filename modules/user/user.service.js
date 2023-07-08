'use strict';

const logger = require('../../lib/logger');
const CONSTANT = require('../../lib/constant.js');

class UserService {
  static async register(userData) {
    try {
      return Promise.resolve(userData);
    } catch (error) {
      logger.error(CONSTANT.LOGGER.ERROR, error);
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;