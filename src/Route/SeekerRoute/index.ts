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

// Job Question Answer CRUD
seekerRoute.post("/job-question-answer", seekerController.createJobAnswer);
seekerRoute.get("/job-question-answer", seekerController.getAllJobAnswers);
seekerRoute.put("/job-question-answer/:id", seekerController.updateJobAnswer);
seekerRoute.delete("/job-question-answer/:id", seekerController.deleteJobAnswer); 

export default seekerRoute;