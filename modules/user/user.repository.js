'use strict';

const { models: { User }, Op } = require('../../lib/database/mysql-db-sequelize');

class UserRepository {
  static async createUser(userData) {
    try {
      const result = await User.create(userData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findUserByEmailAndPassword(email, password) {
    try {
      const result = await User.findOne({ where: { email, password } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findUserByIdAndEmail(id, email) {
    try {
      const result = await User.findOne({ where: { id, email } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserRepository;
