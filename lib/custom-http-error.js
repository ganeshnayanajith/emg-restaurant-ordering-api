'use strict';

class CustomHttpError extends Error {
  constructor(error, message) {
    super(message);
    this.error = error;
    this.message = message;
  }
}

module.exports = CustomHttpError;
