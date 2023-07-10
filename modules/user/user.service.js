'use strict';

const logger = require('../../lib/logger');
const UserRepository = require('./user.repository');
const Utils = require('../../lib/Utils');
const CustomHttpError = require('../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../lib/constant');

class UserService {
  static async register(userData) {
    try {

      const { name, email, password } = userData;

      const user = await UserRepository.createUser({
        name,
        email,
        password,
      });

      const accessToken = await Utils.generateToken({ userId: user.id, name, email });

      logger.info(`User registration successful ${JSON.stringify({ accessToken, user })}`);

      return Promise.resolve({ accessToken, user });

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }

  static async login(payload) {
    try {

      const { email, password } = payload;

      const user = await UserRepository.findUserByEmailAndPassword(email, password);

      if (!user) {
        logger.error(`User not found`);
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.BAD_REQUEST_ERROR, 'Invalid credentials'));
      }

      const accessToken = await Utils.generateToken({ userId: user.id, name: user.name, email });

      logger.info(`User login successful ${JSON.stringify({ accessToken, user })}`);

      return Promise.resolve({ accessToken, user });

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = UserService;