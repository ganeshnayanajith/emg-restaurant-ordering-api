'use strict';

module.exports = {
  API: {
    BASE_PATH: '/api',
  },
  LOGGER: {
    INFO: 'info',
    ERROR: 'error',
  },
  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
  },
  ERRORS: {
    SERVER_ERROR: 'ServerError',
    VALIDATION_ERROR: 'ValidationError',
    AUTHENTICATION_ERROR: 'AuthenticationFailError',
    AUTHORIZATION_ERROR: 'AuthorizationFailError',
    NOT_FOUND_ERROR: 'NotFoundError',
    UNPROCESSABLE_ENTITY_ERROR: 'UnprocessableEntityError',
  },
  MESSAGES: {
    SOMETHING_WENT_WRONG: 'Something went wrong',
  },
};
