'use strict';

class Swagger {
  static getOptions() {
    return {
      definition: {
        openapi: '3.0.3',
        info: {
          title: 'EMG Restaurant Ordering Service',
          version: '1.0.0',
          description:
            'This is the EMG restaurant ordering api under the EMG services stack',
          contact: {
            name: 'EMG',
            url: 'https://eatme.sg/',
            email: 'support@emg.com',
          },
        },
        servers: [
          {
            url: 'http://localhost:3000/api',
          },
        ],
        components: {
          securitySchemes: {
            Token: {
              scheme: 'bearer',
              type: 'http',
              in: 'header',
            },
          },
        },
      },
      apis: [ './modules/*/*.route.js' ],
    };
  }
}

module.exports = Swagger;