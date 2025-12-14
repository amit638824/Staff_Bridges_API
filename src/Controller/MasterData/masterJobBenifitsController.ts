 
import { MasterJobBenifits } from "../../Entities/masterJobBenifits";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";

/* ================= CREATE ================= */
export const createMasterJobBenefit = async (req: any, res: any) => {
  try {
    const { name, description, status = 1, createdBy = 1 } = req.body;

    if (!name) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    const exist = await MasterJobBenifits.findOne({ where: { name } });
    if (exist) {
      return createResponse(
        res,
        409,
        MESSAGES.ALREADY_EXISTS("Job benefit"),
        [],
        true,
        true
      );
    }

    const benefit = MasterJobBenifits.create({
      name,
      description,
      status,
      createdBy,
      updatedBy: createdBy,
    });

    await benefit.save();

    return createResponse(res, 201, MESSAGES.JOB_BENEFIT_CREATED, benefit);
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= GET ALL ================= */
export const getAllMasterJobBenefits = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterJobBenifits.createQueryBuilder("benefit")
      .select([
        "benefit.id",
        "benefit.name",
        "benefit.description",
        "benefit.status",
        "benefit.createdAt",
      ])
      .orderBy("benefit.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      key === "id" || key === "status"
        ? qb.andWhere(`benefit."${key}" = :${key}`, { [key]: Number(value) })
        : qb.andWhere(`benefit."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
    });

    const items = await qb.getMany();

    const totalQB = MasterJobBenifits.createQueryBuilder("benefit").select(
      "COUNT(benefit.id)",
      "total"
    );

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      key === "id" || key === "status"
        ? totalQB.andWhere(`benefit."${key}" = :${key}`, { [key]: Number(value) })
        : totalQB.andWhere(`benefit."${key}" ILIKE :${key}`, {
            [key]: `%${value}%`,
          });
    });

    const totalRecords = Number((await totalQB.getRawOne()).total);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MESSAGES.JOB_BENEFIT_FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalPages,
      totalRecords,
      items,
    });
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= UPDATE ================= */
export const updateMasterJobBenefit = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, description, status, updatedBy } = req.body;

    const benefit = await MasterJobBenifits.findOne({
      where: { id: Number(id) },
    });

    if (!benefit) {
      return createResponse(
        res,
        404,
        MESSAGES.JOB_BENEFIT_NOT_FOUND,
        [],
        true,
        true
      );
    }

    benefit.name = name ?? benefit.name;
    benefit.description = description ?? benefit.description;
    benefit.status = status ?? benefit.status;
    benefit.updatedBy = updatedBy ?? benefit.updatedBy;

    await benefit.save();

    return createResponse(res, 200, MESSAGES.JOB_BENEFIT_UPDATED, benefit);
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= DELETE ================= */
export const deleteMasterJobBenefit = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const benefit = await MasterJobBenifits.findOne({
      where: { id: Number(id) },
    });

    if (!benefit) {
      return createResponse(
        res,
        404,
        MESSAGES.JOB_BENEFIT_NOT_FOUND,
        [],
        true,
        true
      );
    }

    await MasterJobBenifits.remove(benefit);

    return createResponse(res, 200, MESSAGES.JOB_BENEFIT_DELETED, []);
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
