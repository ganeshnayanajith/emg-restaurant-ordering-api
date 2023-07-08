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
      logger.info(user, 'User registration successful');
      return Promise.resolve(user);
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;