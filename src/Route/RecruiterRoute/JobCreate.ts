import express from "express";
import * as RecruiterController from "./importRecruiterController"; 
const recruiterRouter = express.Router(); 

recruiterRouter.post("/recruiter-create", RecruiterController.createRecruiter);
recruiterRouter.get("/recruiter-list", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-detail/:id", RecruiterController.getRecruiterDetail);
recruiterRouter.put("/recruiter-update/:id", RecruiterController.updateRecruiter);
recruiterRouter.delete("/recruiter-delete/:id", RecruiterController.deleteRecruiter);

 


export default recruiterRouter;
