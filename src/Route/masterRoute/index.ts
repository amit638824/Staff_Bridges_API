import express from "express";
const masterData = express.Router();
import * as MasterController from "./MasterController";

masterData.post("/master-category", MasterController.createCategory);
masterData.get("/master-category", MasterController.getAllCategories);
masterData.get("/master-category/:id", MasterController.getCategoryById);
masterData.put("/master-category/:id", MasterController.updateCategory);
masterData.delete("/master-category/:id", MasterController.deleteCategory);

export default masterData;