import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants"; 
import { uploadToS3 } from "../../Helpers/s3";
import { MasterRecruiterDocument } from "../../Entities/MasterRecruiterDocuments";

/* ================= CREATE ================= */
export const createRecruiterDocument = async (req: any, res: any) => {
  try {
    const { name, description, status, createdBy } = req.body;

    if (!name) return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);

    const exist = await MasterRecruiterDocument.findOne({ where: { name } });
    if (exist) return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Document"), [], true, true);

    let imageUrl;
    if (req.files?.file) {
      const uploaded = await uploadToS3(req.files.file, "recruiter-documents");
      imageUrl = uploaded.url;
    }

    const document = MasterRecruiterDocument.create({
      name,
      description,
      image: imageUrl,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await document.save();

    return createResponse(res, 201, MESSAGES.RECRUITER_DOCUMENT_CREATED, document);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= GET ALL ================= */
export const getAllRecruiterDocuments = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterRecruiterDocument.createQueryBuilder("doc")
      .select(["doc.id", "doc.name", "doc.image", "doc.description", "doc.status", "doc.createdAt"])
      .orderBy("doc.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (key === "status" || key === "id") qb.andWhere(`doc."${key}" = :${key}`, { [key]: Number(value) });
      else qb.andWhere(`doc."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
    });

    const items = await qb.getMany();

    const totalQB = MasterRecruiterDocument.createQueryBuilder("doc").select("COUNT(doc.id)", "total");
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (key === "status" || key === "id") totalQB.andWhere(`doc."${key}" = :${key}`, { [key]: Number(value) });
      else totalQB.andWhere(`doc."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
    });

    const totalRecords = Number((await totalQB.getRawOne()).total);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MESSAGES.RECRUITER_DOCUMENT_FETCHED, { currentPage: Number(page), limit: Number(limit), totalPages, totalRecords, items });
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= UPDATE ================= */
export const updateRecruiterDocument = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, description, status, updatedBy } = req.body;

    const document = await MasterRecruiterDocument.findOne({ where: { id: Number(id) } });
    if (!document) return createResponse(res, 404, MESSAGES.RECRUITER_DOCUMENT_NOT_FOUND, [], true, true);

    let imageUrl = document.image;
    if (req.files?.file) {
      const uploaded = await uploadToS3(req.files.file, "recruiter-documents");
      imageUrl = uploaded.url;
    }

    document.name = name ?? document.name;
    document.description = description ?? document.description;
    document.status = status ?? document.status;
    document.updatedBy = updatedBy ?? document.updatedBy;
    document.image = imageUrl;

    await document.save();

    return createResponse(res, 200, MESSAGES.RECRUITER_DOCUMENT_UPDATED, document);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

/* ================= DELETE ================= */
export const deleteRecruiterDocument = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const document = await MasterRecruiterDocument.findOne({ where: { id: Number(id) } });
    if (!document) return createResponse(res, 404, MESSAGES.RECRUITER_DOCUMENT_NOT_FOUND, [], true, true);

    await MasterRecruiterDocument.remove(document);

    return createResponse(res, 200, MESSAGES.RECRUITER_DOCUMENT_DELETED, []);
  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
