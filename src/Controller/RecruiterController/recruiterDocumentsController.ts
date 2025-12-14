
import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants";
import { RecruiterDocuments } from "../../Entities/recruiterDocuments";
import { MasterRecruiterDocument } from "../../Entities/MasterRecruiterDocuments";
import { uploadToS3 } from "../../Helpers/s3";

export const createRecruiterDocuments = async (req: any, res: any) => {
    try {
        const { documentId, userId, createdBy } = req.body;
        const file = req?.files?.document;

        if (!documentId || !userId) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, []);
        }

        const exists = await RecruiterDocuments.findOne({ where: { documentId, userId } });
        if (exists) {
            return createResponse(res, 409, MESSAGES.DOCUMENT_ALREADY_EXISTS, []);
        }

        let documentUrl: string | undefined;

        // upload only if file exists
        if (file) {
            const upload = await uploadToS3(file, "recruiter-documents");
            documentUrl = upload.url;
        }

        const doc = RecruiterDocuments.create({
            documentId,
            userId,
            document: documentUrl, 
            createdBy,
            updatedBy: createdBy,
        });

        await doc.save();

        return createResponse(res, 201, MESSAGES.DOCUMENT_CREATED, doc);
    } catch (error) {
         // tslint:disable-next-line:no-console 
        console.log(error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, []);
    }
};
export const getRecruiterDocumentsList = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const qb = RecruiterDocuments.createQueryBuilder("rd")
            .select([
                "rd.id AS id",
                "rd.document AS document",
                "rd.isVerified AS isVerified",
                "rd.userId AS userId",

                "md.name AS documentName",
                "md.description AS description",
            ])
            .leftJoin(MasterRecruiterDocument, "md", "md.id = rd.documentId")
            .orderBy("rd.id", "DESC")
            .limit(Number(limit))
            .offset(offset);

        Object.entries(filters).forEach(([key, value]) => {
            if (!value) return;

            if (["id", "documentId", "userId", "isVerified"].includes(key)) {
                qb.andWhere(`rd.${key} = :${key}`, { [key]: Number(value) });
            }

            if (key === "documentName") {
                qb.andWhere("md.name ILIKE :name", { name: `%${value}%` });
            }
        });

        const items = await qb.getRawMany();

        const total = await RecruiterDocuments.createQueryBuilder("rd")
            .leftJoin(MasterRecruiterDocument, "md", "md.id = rd.documentId")
            .getCount();

        return createResponse(res, 200, MESSAGES.DOCUMENT_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalRecords: total,
            totalPages: Math.ceil(total / Number(limit)),
            items,
        });
    } catch (error) {
         // tslint:disable-next-line:no-console 
        console.log(error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, []);
    }
};

export const updateRecruiterDocuments = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { documentId, userId, isVerified, updatedBy } = req.body;
        const file = req?.files?.document;

        const doc = await RecruiterDocuments.findOne({ where: { id: Number(id) } });
        if (!doc) {
            return createResponse(res, 404, MESSAGES.DOCUMENT_NOT_FOUND, []);
        }

        // ✅ duplicate check only if changed
        if (
            (documentId && documentId !== doc.documentId) ||
            (userId && userId !== doc.userId)
        ) {
            const duplicate = await RecruiterDocuments.findOne({
                where: {
                    documentId: documentId ?? doc.documentId,
                    userId: userId ?? doc.userId,
                },
            });
            if (duplicate) {
                return createResponse(res, 409, MESSAGES.DOCUMENT_ALREADY_EXISTS, []);
            }
        }

        // ✅ upload only when file exists
        if (file) {
            const upload = await uploadToS3(file, "recruiter-documents");
            doc.document = upload.url;
        }

        doc.documentId = documentId ?? doc.documentId;
        doc.userId = userId ?? doc.userId;
        doc.isVerified = isVerified ?? doc.isVerified;
        doc.updatedBy = updatedBy ?? doc.updatedBy;

        await doc.save();

        return createResponse(res, 200, MESSAGES.DOCUMENT_UPDATED, doc);
    } catch (error) {
         // tslint:disable-next-line:no-console 
        console.log(error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, []);
    }
}; 

export const deleteRecruiterDocuments = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const doc = await RecruiterDocuments.findOne({ where: { id: Number(id) } });
        if (!doc) {
            return createResponse(res, 404, MESSAGES.DOCUMENT_NOT_FOUND, []);
        }

        await RecruiterDocuments.remove(doc);

        return createResponse(res, 200, MESSAGES.DOCUMENT_DELETED, []);
    } catch (error) {
         // tslint:disable-next-line:no-console 
        console.log(error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, []);
    }
};
