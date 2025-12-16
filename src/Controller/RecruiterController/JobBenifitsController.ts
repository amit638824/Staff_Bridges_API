import { createResponse } from "../../Helpers/response";
import { RECRUITER_JOB_BENEFIT_MESSAGES as MSG } from "../../Helpers/masterJobTitle.messages";
import { JobBenifits } from "../../Entities/JobBenifits";
import { MasterJobBenifits } from "../../Entities/masterJobBenifits";

/* ================= CREATE ================= */
export const createRecruiterJobBenefit = async (req: any, res: any) => {
  try {
    const { benifitId, userId, jobId, createdBy } = req.body;

    // jobId NOT required
    if (!benifitId || !userId) {
      return createResponse(res, 400, MSG.REQUIRED_FIELDS, []);
    }

    const exists = await JobBenifits.findOne({
      where: { benifitId, userId },
    });

    if (exists) {
      return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
    }

    const benefit = JobBenifits.create({
      benifitId,
      userId,
      jobId: jobId ?? null,
      createdBy,
      updatedBy: createdBy,
    });

    await benefit.save();

    return createResponse(res, 201, MSG.CREATED, benefit);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= GET ALL ================= */
export const getRecruiterJobBenefitsList = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = JobBenifits.createQueryBuilder("jb")
      .select([
        "jb.id AS id",
        "jb.userId AS userId",
        "jb.jobId AS jobId",
        "jb.isVerified AS isVerified",
        "mb.id AS benifitId",
        "mb.name AS benifitName",
        "mb.description AS description",
      ])
      .leftJoin(MasterJobBenifits, "mb", "mb.id = jb.benifitId")
      .orderBy("jb.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (["id", "userId", "benifitId", "jobId", "isVerified"].includes(key)) {
        qb.andWhere(`jb.${key} = :${key}`, { [key]: Number(value) });
      }

      if (key === "benifitName") {
        qb.andWhere("mb.name ILIKE :name", { name: `%${value}%` });
      }
    });

    const items = await qb.getRawMany();
    const total = await JobBenifits.createQueryBuilder("jb").getCount();

    return createResponse(res, 200, MSG.FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalRecords: total,
      totalPages: Math.ceil(total / Number(limit)),
      items,
    });
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= UPDATE ================= */
export const updateRecruiterJobBenefit = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { benifitId, userId, jobId, isVerified, updatedBy } = req.body;

    const benefit = await JobBenifits.findOne({
      where: { id: Number(id) },
    });

    if (!benefit) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    // duplicate check only if changed
    if (
      (benifitId && benifitId !== benefit.benifitId) ||
      (userId && userId !== benefit.userId)
    ) {
      const duplicate = await JobBenifits.findOne({
        where: {
          benifitId: benifitId ?? benefit.benifitId,
          userId: userId ?? benefit.userId,
        },
      });

      if (duplicate) {
        return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
      }
    }

    benefit.benifitId = benifitId ?? benefit.benifitId;
    benefit.userId = userId ?? benefit.userId;
    benefit.jobId = jobId ?? benefit.jobId;
    benefit.isVerified = isVerified ?? benefit.isVerified;
    benefit.updatedBy = updatedBy ?? benefit.updatedBy;

    await benefit.save();

    return createResponse(res, 200, MSG.UPDATED, benefit);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= DELETE ================= */
export const deleteRecruiterJobBenefit = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const benefit = await JobBenifits.findOne({
      where: { id: Number(id) },
    });

    if (!benefit) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    await JobBenifits.remove(benefit);

    return createResponse(res, 200, MSG.DELETED, []);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};
