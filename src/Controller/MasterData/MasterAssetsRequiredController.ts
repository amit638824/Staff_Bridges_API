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
    const items = await MasterAssets.find({ order: { id: "DESC" } });
    return createResponse(res, 200, MSG.FETCHED, items);
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
