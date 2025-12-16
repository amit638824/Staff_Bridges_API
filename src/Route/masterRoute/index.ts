import express from "express";
const masterData = express.Router();
import * as MasterController from "./MasterController";
// Category CRUD 
masterData.post("/master-category", MasterController.createCategory);
masterData.get("/master-category", MasterController.getAllCategories); 
masterData.put("/master-category/:id", MasterController.updateCategory);
masterData.delete("/master-category/:id", MasterController.deleteCategory);

// Job Title CRUD 
masterData.post("/master-job-title", MasterController.createJobTitle);
masterData.get("/master-job-title", MasterController.getAllJobTitles);
masterData.put("/master-job-title/:id", MasterController.updateJobTitle);
masterData.delete("/master-job-title/:id", MasterController.deleteJobTitle);

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
// question CRUD 
masterData.post("/master-questions", MasterController.createQuestion);
masterData.get("/master-questions", MasterController.getAllQuestions);
masterData.put("/master-questions/:id", MasterController.updateQuestion);
masterData.delete("/master-questions/:id", MasterController.deleteQuestion);
// Options CRUD 
masterData.post("/master-options", MasterController.createQuestionOption);
masterData.get("/master-options", MasterController.getAllQuestionOptions);
masterData.put("/master-options/:id", MasterController.updateQuestionOption);
masterData.delete("/master-options/:id", MasterController.deleteQuestionOption);
// mster document upload  CRUD 
masterData.post("/master-recruiter-document", MasterController.createRecruiterDocument);
masterData.get("/master-recruiter-document", MasterController.getAllRecruiterDocuments); 
masterData.put("/master-recruiter-document/:id", MasterController.updateRecruiterDocument);
masterData.delete("/master-recruiter-document/:id", MasterController.deleteRecruiterDocument);
// mster skills  CRUD 


// mster job benifits  CRUD 
masterData.post("/master-job-benifits", MasterController.createMasterJobBenefit);
masterData.get("/master-job-benifits", MasterController.getAllMasterJobBenefits);
masterData.put("/master-job-benifits/:id", MasterController.updateMasterJobBenefit);
masterData.delete("/master-job-benifits/:id", MasterController.deleteMasterJobBenefit);

export default masterData;