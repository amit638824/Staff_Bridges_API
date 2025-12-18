
import { createResponse } from "../../Helpers/response";
import { NOTIFICATION_MESSAGES as MSG } from "../../Helpers/AditionalMessages";
import { Notification } from "../../Entities/notification";
import { JobPost } from "../../Entities/JobPost";

export const createNotification = async (req: any, res: any) => {
    try {
        const { userId, jobId, createdBy } = req.body;

        if (!userId) {
            return createResponse(res, 400, MSG.REQUIRED_FIELDS, []);
        }

        const notification = Notification.create({
            userId,
            jobId: jobId ?? null,
            isVerified: 0,
            createdBy: createdBy ?? null,
        });

        await notification.save();

        return createResponse(res, 201, MSG.CREATED, notification);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};

export const getNotificationList = async (req: any, res: any) => {
    try {
        const { userId, page = 1, limit = 10, isVerified } = req.query;

        // Base query
        const qb = Notification.createQueryBuilder("n")
            .leftJoin(JobPost, "job", "job.id = n.jobId"); // fixed aj -> n

        // Apply userId filter only if provided
        if (userId) {
            qb.andWhere("n.userId = :userId", { userId: Number(userId) });
        }

        // Apply isVerified filter only if provided
        if (isVerified !== undefined) {
            qb.andWhere("n.isVerified = :isVerified", { isVerified: Number(isVerified) });
        }

        // Select job fields
        qb.select([
            "n.id",  // Add this line
            "job.id",
            "job.recruiterId",
            "job.titleId",
            "job.categoryId",
            "job.hiringForOthers",
            "job.openings",
            "job.agencyId",
            "job.jobType",
            "job.workLocation",
            "job.jobPostingFor",
            "job.cityId",
            "job.localityId",
            "job.gender",
            "job.qualification",
            "job.minExerince",
            "job.maxExperince",
            "job.onlyFresher",
            "job.salaryBenifits",
            "job.salaryMin",
            "job.salaryMax",
            "job.shift",
            "job.workingDays",
            "job.communicationWindow",
            "job.candidateCanCall",
            "job.verificationRequired",
            "job.status",
            "job.adminComments",
            "job.description",
            "job.createdAt",
            "job.updatedAt",
        ]);
        ;

        // Ordering and pagination
        qb.orderBy("n.id", "DESC")
            .skip((page - 1) * limit)
            .take(limit);

        const items = await qb.getRawMany();

        // Total count (with same filters)
        const totalQb = Notification.createQueryBuilder("n");
        if (userId) totalQb.andWhere("n.userId = :userId", { userId: Number(userId) });
        if (isVerified !== undefined) totalQb.andWhere("n.isVerified = :isVerified", { isVerified: Number(isVerified) });
        const total = await totalQb.getCount();

        return createResponse(res, 200, MSG.FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
            items,
        });
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};

export const markNotificationRead = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { updatedBy } = req.body;

        const notification = await Notification.findOne({
            where: { id: Number(id) },
        });

        if (!notification) {
            return createResponse(res, 404, MSG.NOT_FOUND, []);
        }

        notification.isVerified = 1;
        notification.updatedBy = updatedBy ?? null;

        await notification.save();

        return createResponse(res, 200, MSG.UPDATED, notification);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};
export const deleteNotification = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({
            where: { id: Number(id) },
        });

        if (!notification) {
            return createResponse(res, 404, MSG.NOT_FOUND, []);
        }

        await Notification.remove(notification);

        return createResponse(res, 200, MSG.DELETED, []);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};
