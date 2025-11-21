import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./SwaggerDocs/swagger";
import loginRoute from "./Route/CommonRoute/index";
import { AppDataSource } from "./DbConfig/TypeOrm";
import { throttleMiddleware } from "./Middleware/ThrottleMiddleware";
import recruiterRouter from "./Route/RecruiterRoute/JobCreate";
import expressFileupload from "express-fileupload";
// import { BatchFileExecution } from "./helpers/CronJob";
const app = express();
dotenv.config();
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressFileupload());
// Static serve path
app.use("/api/uploads", express.static("./src/uploads"));

// Initialize PostgreSQL Database
AppDataSource.initialize()
  .then(() => {
    // tslint:disable-next-line:no-console
    console.log("🚀Data Source has been initialized! ✅");
  })
  .catch((err: any) => {

    // tslint:disable-next-line:no-console
    console.error("Error during Data Source initialization", err);
  });

// Swagger setup
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customSiteTitle: "StaffBridge API Docs"  }));

//  BatchFileExecution(); // batch file logic automate 30 min   
//  testCronJob()  test cron job
// Routes
app.use("/auth", throttleMiddleware, loginRoute); 
app.use("/api", throttleMiddleware, recruiterRouter);
app.get("/", throttleMiddleware, (req: Request, res: Response) => {

  res.send("Welcome to the server !!!");
});

app.get("/test", throttleMiddleware, (req: Request, res: Response) => {

  res.send("Welcome to the 2020");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // tslint:disable-next-line:no-console
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Hi Server is Running 🚀 at Port ${PORT}`);
});