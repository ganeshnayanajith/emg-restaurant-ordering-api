'use strict';

class CustomHttpError extends Error {
  constructor(status, name, message) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;
  }
}

module.exports = CustomHttpError;
