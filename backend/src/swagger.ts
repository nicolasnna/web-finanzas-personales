import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentación para el servicio backend de finanzas personales',
      contact: {
        name: 'Nicolas Norambuena',
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      {
        name: 'Autenticación',
        description: 'Operaciones relacionadas con la autenticación de usuarios',
      },
      {
        name: 'Ingresos',
        description: 'Operaciones relacionadas con ingresos',
      },
      {
        name: 'Gastos',
        description: 'Operaciones relacionadas con gastos',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  apis: ['./src/docs/*.yml'], // Include both routes and models for better documentation
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;