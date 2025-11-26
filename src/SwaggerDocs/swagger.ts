import path from "path";
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
      { url: "http://localhost:8000" },
      { url: "https://staffbridgeapi.techwagger.com" },
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


