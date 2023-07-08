'use strict';

const logger = require('../../lib/logger');
const User = require('./user.model');

class UserService {
  static async register(userData) {
    try {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      logger.info(`User registration successful ${JSON.stringify(user)}`);
      return Promise.resolve(user);
    } catch (error) {
      logger.error(JSON.stringify(error));
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;