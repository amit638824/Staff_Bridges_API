import express from "express";
const masterData = express.Router();
import * as MasterController from "./MasterController";
// Category CRUD 
masterData.post("/master-category", MasterController.createCategory);
masterData.get("/master-category", MasterController.getAllCategories); 
masterData.put("/master-category/:id", MasterController.updateCategory);
masterData.delete("/master-category/:id", MasterController.deleteCategory);

// Country CRUD 
masterData.post("/master-country", MasterController.createCountry);
masterData.get("/master-country", MasterController.getAllCountries); 
masterData.put("/master-country/:id", MasterController.updateCountry);
masterData.delete("/master-country/:id", MasterController.deleteCountry);

// State CRUD 
masterData.post("/master-state", MasterController.createState);
masterData.get("/master-state", MasterController.getAllStates); 
masterData.put("/master-state/:id", MasterController.updateState);
masterData.delete("/master-state/:id", MasterController.deleteState);

// City CRUD 
masterData.post("/master-city", MasterController.createCity);
masterData.get("/master-city", MasterController.getAllCities); 
masterData.put("/master-city/:id", MasterController.updateCity);
masterData.delete("/master-city/:id", MasterController.deleteCity);

// locality CRUD 
masterData.post("/master-locality", MasterController.createLocality);
masterData.get("/master-locality", MasterController.getAllLocalities); 
masterData.put("/master-locality/:id", MasterController.updateLocality);
masterData.delete("/master-locality/:id", MasterController.deleteLocality);

export default masterData;