'use strict';

const logger = require('../../lib/logger');

class UserService {
  static async register(userData) {
    try {
      return Promise.resolve(userData);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;