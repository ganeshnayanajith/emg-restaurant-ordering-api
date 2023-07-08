'use strict';

class CustomHttpError extends Error {
  constructor(status, error, message) {
    super(message);
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

module.exports = CustomHttpError;
