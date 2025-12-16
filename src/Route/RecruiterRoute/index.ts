import express from "express";
import * as RecruiterController from "./importRecruiterController";
const recruiterRouter = express.Router();

recruiterRouter.post("/recruiter-jobpost-create", RecruiterController.createRecruiter);
recruiterRouter.get("/recruiter-jobpost-list", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-jobpost-detail/:id", RecruiterController.getRecruiterDetail);
recruiterRouter.put("/recruiter-jobpost-update/:id", RecruiterController.updateRecruiter);
recruiterRouter.delete("/recruiter-jobpost-delete/:id", RecruiterController.deleteRecruiter);

recruiterRouter.post("/recruiter-document-upload", RecruiterController.createRecruiterDocuments);
recruiterRouter.get("/recruiter-document-upload", RecruiterController.getRecruiterDocumentsList);
recruiterRouter.put("/recruiter-document-upload/:id", RecruiterController.updateRecruiterDocuments);
recruiterRouter.delete("/recruiter-document-upload/:id", RecruiterController.deleteRecruiterDocuments);


recruiterRouter.post("/recruiter-skills", RecruiterController.createRecruiterDocuments);
recruiterRouter.get("/recruiter-skills", RecruiterController.getRecruiterDocumentsList);
recruiterRouter.put("/recruiter-skills/:id", RecruiterController.updateRecruiterDocuments);
recruiterRouter.delete("/recruiter-skills/:id", RecruiterController.deleteRecruiterDocuments);


recruiterRouter.post("/recruiter-job-benifit", RecruiterController.createRecruiterJobBenefit);
recruiterRouter.get("/recruiter-job-benifit", RecruiterController.getRecruiterJobBenefitsList);
recruiterRouter.put("/recruiter-job-benifit/:id", RecruiterController.updateRecruiterJobBenefit);
recruiterRouter.delete("/recruiter-job-benifit/:id", RecruiterController.deleteRecruiterJobBenefit);

recruiterRouter.post("/recruiter-assets-required", RecruiterController.createRecruiterDocuments);
recruiterRouter.get("/recruiter-assets-required", RecruiterController.getRecruiterDocumentsList);
recruiterRouter.put("/recruiter-assets-required/:id", RecruiterController.updateRecruiterDocuments);
recruiterRouter.delete("/recruiter-assets-required/:id", RecruiterController.deleteRecruiterDocuments);
export default recruiterRouter;
