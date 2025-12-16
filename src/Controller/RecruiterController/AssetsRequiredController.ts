import { createResponse } from "../../Helpers/response";
import { RECRUITER_ASSETS_MESSAGES as MSG } from "../../Helpers/masterJobTitle.messages";
import { AssetsRequired } from "../../Entities/AssetsRequired";
import { MasterAssets } from "../../Entities/MasterAssetsRequired";

/* ================= CREATE ================= */
export const createRecruiterAsset = async (req: any, res: any) => {
  try {
    const { assetId, userId, jobId, createdBy } = req.body;

    if (!assetId || !userId || !jobId) {
      return createResponse(res, 400, MSG.REQUIRED_FIELDS, []);
    }

    const exists = await AssetsRequired.findOne({
      where: { assetId, userId, jobId },
    });

    if (exists) {
      return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
    }

    const asset = AssetsRequired.create({
      assetId,
      userId,
      jobId,
      createdBy,
      updatedBy: createdBy,
    });

    await asset.save();

    return createResponse(res, 201, MSG.CREATED, asset);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= GET ALL ================= */
export const getRecruiterAssetsList = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = AssetsRequired.createQueryBuilder("a")
      .select([
        "a.id AS id",
        "a.userId AS userId",
        "a.jobId AS jobId",
        "a.isVerified AS isVerified",
        "ma.id AS assetId",
        "ma.name AS assetName",
        "ma.description AS description",
      ])
      .leftJoin(MasterAssets, "ma", "ma.id = a.assetId")
      .orderBy("a.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (["id", "userId", "assetId", "jobId", "isVerified"].includes(key)) {
        qb.andWhere(`a.${key} = :${key}`, { [key]: Number(value) });
      }

      if (key === "assetName") {
        qb.andWhere("ma.name ILIKE :name", { name: `%${value}%` });
      }
    });

    const items = await qb.getRawMany();
    const total = await AssetsRequired.createQueryBuilder("a").getCount();

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
export const updateRecruiterAsset = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { assetId, userId, jobId, isVerified, updatedBy } = req.body;

    const asset = await AssetsRequired.findOne({
      where: { id: Number(id) },
    });

    if (!asset) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    if (
      (assetId && assetId !== asset.assetId) ||
      (userId && userId !== asset.userId) ||
      (jobId && jobId !== asset.jobId)
    ) {
      const duplicate = await AssetsRequired.findOne({
        where: {
          assetId: assetId ?? asset.assetId,
          userId: userId ?? asset.userId,
          jobId: jobId ?? asset.jobId,
        },
      });

      if (duplicate) {
        return createResponse(res, 409, MSG.ALREADY_EXISTS, []);
      }
    }

    asset.assetId = assetId ?? asset.assetId;
    asset.userId = userId ?? asset.userId;
    asset.jobId = jobId ?? asset.jobId;
    asset.isVerified = isVerified ?? asset.isVerified;
    asset.updatedBy = updatedBy ?? asset.updatedBy;

    await asset.save();

    return createResponse(res, 200, MSG.UPDATED, asset);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};

/* ================= DELETE ================= */
export const deleteRecruiterAsset = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const asset = await AssetsRequired.findOne({
      where: { id: Number(id) },
    });

    if (!asset) {
      return createResponse(res, 404, MSG.NOT_FOUND, []);
    }

    await AssetsRequired.remove(asset);

    return createResponse(res, 200, MSG.DELETED, []);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
  }
};
