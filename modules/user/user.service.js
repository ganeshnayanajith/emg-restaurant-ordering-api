'use strict';

const logger = require('../../lib/logger');
const User = require('./user.model');
const Utils = require('../../lib/Utils');

class UserService {
  static async register(userData) {
    try {

      const { name, email, password } = userData;

      const user = await User.create({
        name,
        email,
        password,
      });

      const token = await Utils.generateToken({ userId: user.id, name, email });

      logger.info(`User registration successful ${JSON.stringify({ token, user })}`);

      return Promise.resolve({ token, user });

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;