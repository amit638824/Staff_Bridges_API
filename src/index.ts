 
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
import routerFileUpload from "./Controller/CommonController/fileUpload";
const translatte = require("translatte");
const app = express();
dotenv.config();

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressFileupload());

app.use("/api/uploads", express.static("./src/uploads"));

AppDataSource.initialize()
  .then(() => console.log("🚀 Data Source has been initialized! ✅"))
  .catch((err: any) => console.error("❌ Error during Data Source initialization", err));

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { customSiteTitle: "StaffBridges API Docs" })
);

app.use("/auth", throttleMiddleware, loginRoute);
app.use("/api", throttleMiddleware, recruiterRouter);
app.use("/file", throttleMiddleware, routerFileUpload);

// Translation route
app.get("/", async (req: any, res: any) => {
  try {
    const result = await translatte("Amit Chauhan", { to: "hi" });
    res.send(result.text);
  } catch (err) {
    console.error("Translate Error:", err);
    res.status(500).send("Translation failed");
  }
});

app.get("/test", throttleMiddleware, (req: Request, res: Response) => {
  res.send("Welcome to the 2020");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
