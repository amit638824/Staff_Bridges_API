import express from "express";
const masterData = express.Router();
import * as MasterController from "./MasterController";
// Category CRUD 
masterData.post("/master-category", MasterController.createCategory);
masterData.get("/master-category", MasterController.getAllCategories);
masterData.get("/master-category/:id", MasterController.getCategoryById);
masterData.put("/master-category/:id", MasterController.updateCategory);
masterData.delete("/master-category/:id", MasterController.deleteCategory);

// Country CRUD 
masterData.post("/master-country", MasterController.createCountry);
masterData.get("/master-country", MasterController.getAllCountries);
masterData.get("/master-country/:id", MasterController.getCountryById);
masterData.put("/master-country/:id", MasterController.updateCountry);
masterData.delete("/master-country/:id", MasterController.deleteCountry);
export default masterData;