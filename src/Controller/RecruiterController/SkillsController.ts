import { createResponse } from "../../Helpers/response";
import { RECRUITER_SKILLS_MESSAGES as MSG } from "../../Helpers/AditionalMessages";
import { Skills } from "../../Entities/skills";
import { MasterSkills } from "../../Entities/masterSkills";

/* ================= CREATE ================= */
export const createRecruiterSkill = async (req: any, res: any) => {
  try {
    const { documentId, userId, jobId, createdBy } = req.body;

    // jobId NOT required
    if (!documentId || !userId) {
      return createResponse(res, 400, MSG.REQUIRED_FIELDS, []);
    }

    const exists = await Skills.findOne({
      where: { documentId, userId },
    });

    if (exists) {
      return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
    }

    const skill = Skills.create({
      documentId,
      userId,
      jobId: jobId ?? null,
      createdBy,
      updatedBy: createdBy,
    });

    await skill.save();

    return createResponse(res, 201, MSG.CREATED, skill);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= GET ALL ================= */
export const getRecruiterSkillsList = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = Skills.createQueryBuilder("s")
      .select([
        "s.id AS id",
        "s.userId AS userId",
        "s.jobId AS jobId",
        "s.isVerified AS isVerified",
        "ms.id AS skillId",
        "ms.name AS skillName",
        "ms.description AS description",
      ])
      .leftJoin(MasterSkills, "ms", "ms.id = s.documentId")
      .orderBy("s.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (["id", "userId", "documentId", "jobId", "isVerified"].includes(key)) {
        qb.andWhere(`s.${key} = :${key}`, { [key]: Number(value) });
      }

      if (key === "skillName") {
        qb.andWhere("ms.name ILIKE :name", { name: `%${value}%` });
      }
    });

    const items = await qb.getRawMany();
    const total = await Skills.createQueryBuilder("s").getCount();

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
export const updateRecruiterSkill = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { documentId, userId, jobId, isVerified, updatedBy } = req.body;

    const skill = await Skills.findOne({ where: { id: Number(id) } });
    if (!skill) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    // duplicate check only if changed
    if (
      (documentId && documentId !== skill.documentId) ||
      (userId && userId !== skill.userId)
    ) {
      const duplicate = await Skills.findOne({
        where: {
          documentId: documentId ?? skill.documentId,
          userId: userId ?? skill.userId,
        },
      });

      if (duplicate) {
        return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
      }
    }

    skill.documentId = documentId ?? skill.documentId;
    skill.userId = userId ?? skill.userId;
    skill.jobId = jobId ?? skill.jobId;
    skill.isVerified = isVerified ?? skill.isVerified;
    skill.updatedBy = updatedBy ?? skill.updatedBy;

    await skill.save();

    return createResponse(res, 200, MSG.UPDATED, skill);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= DELETE ================= */
export const deleteRecruiterSkill = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const skill = await Skills.findOne({ where: { id: Number(id) } });
    if (!skill) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    await Skills.remove(skill);

    return createResponse(res, 200, MSG.DELETED, []);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};
