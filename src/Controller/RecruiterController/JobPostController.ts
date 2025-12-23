import { JobPost } from "../../Entities/JobPost";
import { createResponse } from "../../Helpers/response";
import { DeepPartial } from "typeorm";
// import { MasterJobBenifits } from "../../Entities/masterJobBenifits"; 
// import { MasterSkills } from "../../Entities/masterSkills";
// import { MasterAssets } from "../../Entities/MasterAssetsRequired";

// import { JobCategory } from "../../Entities/category";
import { AssetsRequired } from "../../Entities/AssetsRequired";
import { Skills } from "../../Entities/skills";
import { JobBenifits } from "../../Entities/JobBenifits";
import { RecruiterDocuments } from "../../Entities/recruiterDocuments";
import { createNotificationHelper } from "../../Helpers/notificationHelper"; 

export const createRecruiter = async (req: any, res: any) => {
  const uniqueArray = (arr: number[]) => [...new Set(arr)];

  try {
    const {
     recruiterId,
      titleId,
      categoryId,

      hiringForOthers = 1,
      openings = 1,
      agencyId = null,

      jobType,
      workLocation,

      cityId = null,
      localityId = null,

      gender = "Any",
      qualification = "highschool",

      minExerince = 0,
      maxExperince = 0,
      onlyFresher = 0,

      salaryBenifits = "Fixed",
      salaryMin = 0,
      salaryMax = 0,

      workingDays = "5",
      shift = "Day",
      minJobTiming = 0,
      maxJobTiming = 0,
      depositeRequired=0,

      interviewAddress = null,
      communicationWindow = [],

      candidateCanCall = 0,
      jobPostingFor = "INDIVIDUAL",
      verificationRequired = 0,

      description = null,
      status = "DRAFT",
      adminComments = null,

      createdBy,
      updatedBy,

      jobSkillsIds = [],
      assetsIds = [],
      documetnsIds = [],
      jobBenitsIds = [],
    } = req.body;

    /* ---------------- DUPLICACY CHECK ---------------- */
    const existingJob = await JobPost.findOne({
      where: {
        recruiterId,
        titleId,
        cityId,
        jobType,
      },
    });

    if (existingJob) {
      return createResponse(
        res,
        409,
        "Duplicate job already exists",
        null,
        false
      );
    }

    /* ---------------- JOB CREATE ---------------- */
    const jobPost = JobPost.create({
       recruiterId,
      titleId,
      categoryId,
      hiringForOthers,
      openings,
      agencyId,
      jobType,
      workLocation,
      cityId,
      localityId,
      gender,
      qualification,
      minExerince,
      maxExperince,
      onlyFresher,
      salaryBenifits,
      salaryMin,
      salaryMax,
      workingDays,
      shift,
      minJobTiming,
      maxJobTiming,
      depositeRequired,
      interviewAddress,
      communicationWindow,
      candidateCanCall,
      jobPostingFor,
      verificationRequired,
      description,
      status,
      adminComments,
      createdBy: createdBy || recruiterId,
      updatedBy: updatedBy || recruiterId,
    });

    const savedJob = await jobPost.save();
    await createNotificationHelper(recruiterId, savedJob.id)
    /* ---------------- SKILLS ---------------- */
    const skills = uniqueArray(jobSkillsIds);
    if (skills.length) {
      const skillsData: DeepPartial<Skills>[] = skills.map(id => ({
        documentId: id,
        userId: recruiterId,
        jobId: savedJob.id,
        isVerified: 0,
        createdBy: createdBy || recruiterId,
        updatedBy: updatedBy || recruiterId,
      }));
      await Skills.save(skillsData);
    }

    /* ---------------- ASSETS ---------------- */
    const assets = uniqueArray(assetsIds);
    if (assets.length) {
      const assetsData: DeepPartial<AssetsRequired>[] = assets.map(id => ({
        assetId: id,
        userId: recruiterId,
        jobId: savedJob.id,
        isVerified: 0,
        createdBy: createdBy || recruiterId,
        updatedBy: updatedBy || recruiterId,
      }));
      await AssetsRequired.save(assetsData);
    }

    /* ---------------- DOCUMENTS ---------------- */
    const documents = uniqueArray(documetnsIds);
    if (documents.length) {
      const documentsData: DeepPartial<RecruiterDocuments>[] = documents.map(id => ({
        documentId: id,
        userId: recruiterId,
        jobId: savedJob.id,
        isVerified: 0,
        createdBy: createdBy || recruiterId,
        updatedBy: updatedBy || recruiterId,
      }));
      await RecruiterDocuments.save(documentsData);
    }

    /* ---------------- BENEFITS ---------------- */
    const benefits = uniqueArray(jobBenitsIds);
    if (benefits.length) {
      const benefitsData: DeepPartial<JobBenifits>[] = benefits.map(id => ({
        benifitId: id,
        userId: recruiterId,
        jobId: savedJob.id,
        isVerified: 0,
        createdBy: createdBy || recruiterId,
        updatedBy: updatedBy || recruiterId,
      }));
      await JobBenifits.save(benefitsData);
    }

    return createResponse(
      res,
      201,
      "Recruiter job created successfully",
      savedJob
    );

  } catch (error) {
    console.error(error);
    return createResponse(res, 500, "Something went wrong", error, false, true);
  }
};



export const getRecruiterDetail = async (req: any, res: any) => {
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

export const updateRecruiter = async (req: any, res: any) => {
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
export const deleteRecruiter = async (req: any, res: any) => {
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


