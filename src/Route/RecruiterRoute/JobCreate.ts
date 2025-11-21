import express from "express";
import * as RecruiterController from "./importRecruiterController"; 
const recruiterRouter = express.Router();  
recruiterRouter.post("/recruiter-jobpost-create", RecruiterController.createRecruiter);
recruiterRouter.get("/recruiter-jobpost-list", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-jobpost-detail/:id", RecruiterController.getRecruiterDetail);
recruiterRouter.put("/recruiter-jobpost-update/:id", RecruiterController.updateRecruiter);
recruiterRouter.delete("/recruiter-jobpost-delete/:id", RecruiterController.deleteRecruiter);

export default recruiterRouter;
 