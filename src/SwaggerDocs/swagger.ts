import path from "path";
import swaggerJSDoc from "swagger-jsdoc"; 
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StaffBridges API",
      version: "1.0.0",
      description: "API Documentation for StaffBridges",
      contact: {
        name: "techwagger.com",
        email: "connect@techwagger.com",
        url: "https://www.techwagger.com",
      },
    },
    servers: 
    [
      { url: "https://staffbridgesapi.techwagger.com" },
      { url: "http://localhost:4600" },
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
    security: [{ BearerAuth: [] }],
  }, 
 
    //  MOST IMPORTANT FIX
  apis: [
    path.join(process.cwd(), "src/SwaggerDocs/*.ts"),
    path.join(process.cwd(), "src/Route/**/*.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
