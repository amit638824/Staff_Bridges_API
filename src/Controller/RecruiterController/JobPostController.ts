
import { createResponse } from "../../Helpers/response";
 import { JobPost } from "../../Entities/JobPost";
 
export const createRecruiter = async (req: any, res: any) => {
  try {
    const {
      recruiterId,
      titleId,
      categoryId,
      hiringForOthers,
      agencyId,
      jobType,
      workLocation,
      cityId,
      localityId,
      address,
      salaryMin,
      salaryMax,
      salaryBenifits,
      gender,
      qualification,
      minExerince,
      maxExperince,
      onlyFresher,
      workingDays,
      jobBenefitsId,
      jobskillsId,
      documents,
      communicationWindow,
      candidateCanCall,
      openings,
      jobPostingFor,
      verificationRequired,
      description,
      status,
      adminComments,
      createdBy,
      updatedBy
    } = req.body;

    const jobPost = JobPost.create({
      recruiterId,
      titleId,
      categoryId,
      hiringForOthers,
      agencyId,
      jobType,
      workLocation,
      cityId,
      localityId,
      interviewAddress: address,
      salaryMin,
      salaryMax,
      salaryBenifits,
      gender,
      qualification,
      minExerince,
      maxExperince,
      onlyFresher,
      workingDays,
      jobBenefitsId,
      jobskillsId,
      documents,
      communicationWindow,
      candidateCanCall,
      openings,
      jobPostingFor,
      verificationRequired,
      description,
      status,
      adminComments,
      createdBy,
      updatedBy
    });

    const savedJob = await jobPost.save();

    return createResponse(res, 201, "Recruiter created successfully", savedJob);

  } catch (error) {
    console.error(error);
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};

 
export const getRecruiterList = async(req: any, res: any) => {
  try {
    const recruiters = await JobPost.find();

    return createResponse(res, 200, "Recruiter List", recruiters);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};
 
export const getRecruiterDetail = async(req: any, res: any) => {
  try {
    const { id } = req.params;

    const recruiter = await JobPost.findOne({ where: { id: +id } });

    if (!recruiter) {
      return createResponse(res, 404, "Recruiter not found");
    }

    return createResponse(res, 200, "Recruiter Details", recruiter);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};

export const updateRecruiter = async(req: any, res: any) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const recruiter = await JobPost.findOne({ where: { id: +id } });

    if (!recruiter) {
      return createResponse(res, 404, "Recruiter not found");
    }

    const updatedRecruiter = await JobPost.save({ ...recruiter, ...updateData });

    return createResponse(res, 200, "Recruiter updated successfully", updatedRecruiter);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};

// ---------------------- DELETE -------------------------
export const deleteRecruiter = async(req: any, res: any) => {
  try {
    const { id } = req.params;

    const recruiter = await JobPost.findOne({ where: { id: +id } });

    if (!recruiter) {
      return createResponse(res, 404, "Recruiter not found");
    }

    await JobPost.delete(id);

    return createResponse(res, 200, "Recruiter deleted successfully");
  } catch (error) {
     // tslint:disable-next-line:no-console 
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};
 