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


masterData.post("/master-state", MasterController.createState);
masterData.get("/master-state", MasterController.getAllStates);
masterData.get("/master-state/:id", MasterController.getStateById);
masterData.put("/master-state/:id", MasterController.updateState);
masterData.delete("/master-state/:id", MasterController.deleteState);

masterData.post("/master-city", MasterController.createCity);
masterData.get("/master-city", MasterController.getAllCities);
masterData.get("/master-city/:id", MasterController.getCityById);
masterData.put("/master-city/:id", MasterController.updateCity);
masterData.delete("/master-city/:id", MasterController.deleteCity);

export default masterData;