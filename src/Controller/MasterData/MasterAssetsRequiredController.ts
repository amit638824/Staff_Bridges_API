import { MasterAssets } from "../../Entities/MasterAssetsRequired";
import { MASTER_ASSETS_MESSAGES as MSG } from "../../Helpers/AditionalMessages";
import { createResponse } from "../../Helpers/response";

/* ================= CREATE ================= */
export const createMasterAssets = async (req: any, res: any) => {
  try {
    const { name, description, status = 1, createdBy = 1 } = req.body;

    if (!name)
      return createResponse(res, 400, MSG.REQUIRED_FIELDS, [], true);

    const exist = await MasterAssets.findOne({ where: { name } });
    if (exist)
      return createResponse(res, 409, MSG.ALREADY_EXISTS, [], true);

    const asset = MasterAssets.create({
      name,
      description,
      status,
      createdBy,
      updatedBy: createdBy,
    });

    await asset.save();

    return createResponse(res, 201, MSG.CREATED, asset);
  } catch (err) {
    console.error(err);
    return createResponse(res, 500, "Internal server error", [], true);
  }
};

/* ================= GET ALL ================= */
export const getAllMasterAssets = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterAssets.createQueryBuilder("asset")
      .select([
        "asset.id",
        "asset.name",
        "asset.description",
        "asset.status",
        "asset.createdAt",
      ])
      .orderBy("asset.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    // 🔹 Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      key === "id" || key === "status"
        ? qb.andWhere(`asset."${key}" = :${key}`, { [key]: Number(value) })
        : qb.andWhere(`asset."${key}" ILIKE :${key}`, {
            [key]: `%${value}%`,
          });
    });

    const items = await qb.getMany();

    // 🔹 Total count query
    const totalQB = MasterAssets.createQueryBuilder("asset").select(
      "COUNT(asset.id)",
      "total"
    );

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      key === "id" || key === "status"
        ? totalQB.andWhere(`asset."${key}" = :${key}`, { [key]: Number(value) })
        : totalQB.andWhere(`asset."${key}" ILIKE :${key}`, {
            [key]: `%${value}%`,
          });
    });

    const totalRecords = Number((await totalQB.getRawOne()).total);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MSG.FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalPages,
      totalRecords,
      items,
    });
  } catch (err) {
    console.error(err);
    return createResponse(res, 500, "Internal server error", [], true);
  }
};


/* ================= UPDATE ================= */
export const updateMasterAssets = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, description, status, updatedBy } = req.body;

    const asset = await MasterAssets.findOne({ where: { id: Number(id) } });
    if (!asset)
      return createResponse(res, 404, MSG.NOT_FOUND, [], true);

    asset.name = name ?? asset.name;
    asset.description = description ?? asset.description;
    asset.status = status ?? asset.status;
    asset.updatedBy = updatedBy ?? asset.updatedBy;

    await asset.save();

    return createResponse(res, 200, MSG.UPDATED, asset);
  } catch (err) {
    console.error(err);
    return createResponse(res, 500, "Internal server error", [], true);
  }
};

/* ================= DELETE ================= */
export const deleteMasterAssets = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const asset = await MasterAssets.findOne({ where: { id: Number(id) } });
    if (!asset)
      return createResponse(res, 404, MSG.NOT_FOUND, [], true);

    await MasterAssets.remove(asset);

    return createResponse(res, 200, MSG.DELETED, []);
  } catch (err) {
    console.error(err);
    return createResponse(res, 500, "Internal server error", [], true);
  }
};
