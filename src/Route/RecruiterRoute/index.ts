import express from "express";
import * as RecruiterController from "./importRecruiterController";
const recruiterRouter = express.Router(); 
 
recruiterRouter.get("/recruiter-jobpost-list", RecruiterController.getRecruiterList); 
recruiterRouter.get("/recruiter-best-job-your", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-similar-jobs", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-choose-from-job-categories", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-jobs-in-near-by-areas", RecruiterController.getRecruiterList);
recruiterRouter.get("/recruiter-job-details", RecruiterController.getRecruiterList);

recruiterRouter.post("/recruiter-apply-job",  RecruiterController.createRecruiterApplyJob);
recruiterRouter.get("/recruiter-apply-job",  RecruiterController.getRecruiterApplyJobList); 
recruiterRouter.put("/recruiter-apply-job/:id",  RecruiterController.updateRecruiterApplyJob);
recruiterRouter.delete("/recruiter-apply-job/:id",  RecruiterController.deleteRecruiterApplyJob);

recruiterRouter.post("/notification", RecruiterController.createNotification);
recruiterRouter.get("/notification", RecruiterController.getNotificationList);
recruiterRouter.put("/notification/:id/read", RecruiterController.markNotificationRead);
recruiterRouter.delete("/notification/:id", RecruiterController.deleteNotification);

recruiterRouter.post("/recruiter-jobpost-create", RecruiterController.createRecruiter); 
recruiterRouter.get("/recruiter-jobpost-detail/:id", RecruiterController.getRecruiterDetail);
recruiterRouter.put("/recruiter-jobpost-update/:id", RecruiterController.updateRecruiter);
recruiterRouter.delete("/recruiter-jobpost-delete/:id", RecruiterController.deleteRecruiter);

recruiterRouter.post("/recruiter-document-upload", RecruiterController.createRecruiterDocuments);
recruiterRouter.get("/recruiter-document-upload", RecruiterController.getRecruiterDocumentsList);
recruiterRouter.put("/recruiter-document-upload/:id", RecruiterController.updateRecruiterDocuments);
recruiterRouter.delete("/recruiter-document-upload/:id", RecruiterController.deleteRecruiterDocuments); 

recruiterRouter.post("/recruiter-skills", RecruiterController.createRecruiterSkill);
recruiterRouter.get("/recruiter-skills", RecruiterController.getRecruiterJobBenefitsList);
recruiterRouter.put("/recruiter-skills/:id", RecruiterController.updateRecruiterSkill);
recruiterRouter.delete("/recruiter-skills/:id", RecruiterController.deleteRecruiterSkill);


recruiterRouter.post("/recruiter-job-benifit", RecruiterController.createRecruiterJobBenefit);
recruiterRouter.get("/recruiter-job-benifit", RecruiterController.getRecruiterJobBenefitsList);
recruiterRouter.put("/recruiter-job-benifit/:id", RecruiterController.updateRecruiterJobBenefit);
recruiterRouter.delete("/recruiter-job-benifit/:id", RecruiterController.deleteRecruiterJobBenefit);

recruiterRouter.post("/recruiter-assets-required", RecruiterController.createRecruiterAsset);
recruiterRouter.get("/recruiter-assets-required", RecruiterController.getRecruiterAssetsList);
recruiterRouter.put("/recruiter-assets-required/:id", RecruiterController.updateRecruiterAsset);
recruiterRouter.delete("/recruiter-assets-required/:id", RecruiterController.deleteRecruiterAsset);

export default recruiterRouter;
