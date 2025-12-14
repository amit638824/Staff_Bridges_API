 import { MasterSkills } from "../../Entities/masterSkills";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";

/* ================= CREATE ================= */
export const createMasterSkill = async (req: any, res: any) => {
  try {
    const { name, description, status= 1, createdBy= 1 } = req.body;

    if (!name) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    const exist = await MasterSkills.findOne({ where: { name } });
    if (exist) {
      return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Master skill"), [], true, true);
    }

    const skill = MasterSkills.create({
      name,
      description,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await skill.save();

    return createResponse(res, 201, MESSAGES.MASTER_SKILL_CREATED, skill);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.error(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= GET ALL ================= */
export const getAllMasterSkills = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterSkills.createQueryBuilder("skill")
      .select(["skill.id", "skill.name", "skill.description", "skill.status", "skill.createdAt"])
      .orderBy("skill.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      key === "status" || key === "id"
        ? qb.andWhere(`skill."${key}" = :${key}`, { [key]: Number(value) })
        : qb.andWhere(`skill."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
    });

    const items = await qb.getMany();

    const totalQB = MasterSkills.createQueryBuilder("skill").select("COUNT(skill.id)", "total");
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      key === "status" || key === "id"
        ? totalQB.andWhere(`skill."${key}" = :${key}`, { [key]: Number(value) })
        : totalQB.andWhere(`skill."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
    });

    const totalRecords = Number((await totalQB.getRawOne()).total);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MESSAGES.MASTER_SKILL_FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalPages,
      totalRecords,
      items,
    });
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.error(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= UPDATE ================= */
export const updateMasterSkill = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, description, status, updatedBy } = req.body;

    const skill = await MasterSkills.findOne({ where: { id: Number(id) } });
    if (!skill) {
      return createResponse(res, 404, MESSAGES.MASTER_SKILL_NOT_FOUND, [], true, true);
    }

    skill.name = name ?? skill.name;
    skill.description = description ?? skill.description;
    skill.status = status ?? skill.status;
    skill.updatedBy = updatedBy ?? skill.updatedBy;

    await skill.save();

    return createResponse(res, 200, MESSAGES.MASTER_SKILL_UPDATED, skill);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.error(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= DELETE ================= */
export const deleteMasterSkill = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const skill = await MasterSkills.findOne({ where: { id: Number(id) } });
    if (!skill) {
      return createResponse(res, 404, MESSAGES.MASTER_SKILL_NOT_FOUND, [], true, true);
    }

    await MasterSkills.remove(skill);

    return createResponse(res, 200, MESSAGES.MASTER_SKILL_DELETED, []);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.error(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
