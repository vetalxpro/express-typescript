import swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'api-docs'
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
    schemes: [
      'http'
    ],
    consumes: [
      'application/json'
    ],
    produces: [
      'application/json'
    ],
    tags: [
      {
        name: 'users',
        description: 'Operation with users'
      },
      {
        name: 'status',
        description: 'Server status'
      }
    ]
  },
  apis: [ './REST/v1/**/*.ts' ]
};

const swaggerSpec = swaggerJsDoc(options);
swaggerSpec.definitions.User = require('./definitions/user.json');
swaggerSpec.definitions.Status = require('./definitions/status.json');
swaggerSpec.responses = require('./definitions/responses.json');
swaggerSpec.securityDefinitions = require('./definitions/security.json');

export { swaggerSpec };
