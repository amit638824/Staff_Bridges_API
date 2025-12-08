import express from "express";
const seekerRoute = express.Router();
import * as seekerController from "./seekerControllers";
// Category CRUD 
seekerRoute.post("/seeker-category", seekerController.createJobCategory);
seekerRoute.get("/seeker-category", seekerController.getAllJobCategories); 
seekerRoute.put("/seeker-category/:id", seekerController.updateJobCategory);
seekerRoute.delete("/seeker-category/:id", seekerController.deleteJobCategory); 

// Category CRUD 
seekerRoute.post("/seeker-experience", seekerController.createExperience);
seekerRoute.get("/seeker-experience", seekerController.getAllExperience); 
seekerRoute.put("/seeker-experience/:id", seekerController.updateExperience);
seekerRoute.delete("/seeker-experience/:id", seekerController.deleteExperience); 

export default seekerRoute;