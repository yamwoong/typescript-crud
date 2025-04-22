import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Post CRUD API',
        version: '1.0.0',
        description: 'A simple CRUD API for managing posts built with Express and TypeScript',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local dev server',
        },
      ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
  };

const swaggerSpec = swaggerJSDoc(options);

export {
    swaggerUi,
    swaggerSpec
};