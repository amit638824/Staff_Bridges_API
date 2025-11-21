import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StaffBridge API",
      version: "1.0.0",
      description: "API Documentation for StaffBridge",
      contact: {
        name: "techwagger.com",
        email: "connect@techwagger.com",
        url: "https://www.techwagger.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      {
        url: "https://staffbridgeapi.techwagger.com",
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/Route/**/*.ts"],  // 👈 FIXED
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
