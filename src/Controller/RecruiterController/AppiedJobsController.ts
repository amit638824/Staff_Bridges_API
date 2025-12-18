import { createResponse } from "../../Helpers/response";
import { APPLIED_JOB_MESSAGES as MSG } from "../../Helpers/AditionalMessages";
import { AppliedJob } from "../../Entities/AppliedJob";
import { JobPost } from "../../Entities/JobPost";

export const createRecruiterApplyJob = async (req: any, res: any) => {
    try {
        const { jobId, userId, reqruiterId } = req.body;

        if (!jobId || !userId || !reqruiterId) {
            return createResponse(res, 400, MSG.REQUIRED_FIELDS, []);
        }

        const exists = await AppliedJob.findOne({
            where: { jobId, userId },
        });

        if (exists) {
            return createResponse(res, 409, MSG.ALREADY_APPLIED, []);
        }

        const applyJob = AppliedJob.create({
            jobId,
            userId,
            reqruiterId,
        });

        await applyJob.save();

        return createResponse(res, 201, MSG.CREATED, applyJob);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};


export const getRecruiterApplyJobList = async (req: any, res: any) => {
    try {
        const {
            page = 1,
            limit = 10,
            jobId,
            userId,
            reqruiterId,
            status,
        } = req.query;

        const qb = AppliedJob.createQueryBuilder("aj")
            .leftJoin(JobPost, "job", "job.id = aj.jobId")
            .select([
                // 🔹 Applied Job
                "aj.id",
                "aj.userId",
                "aj.reqruiterId",
                "aj.status",
                "aj.createdAt",

                // 🔥 JOB TABLE – SARA DATA (NO ALIAS)
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
            ])

            .orderBy("aj.id", "DESC")
            .skip((Number(page) - 1) * Number(limit))
            .take(Number(limit));

        // 🔍 Filters
        if (jobId !== undefined)
            qb.andWhere("aj.jobId = :jobId", { jobId: Number(jobId) });

        if (userId !== undefined)
            qb.andWhere("aj.userId = :userId", { userId: Number(userId) });

        if (reqruiterId !== undefined)
            qb.andWhere("aj.reqruiterId = :reqruiterId", {
                reqruiterId: Number(reqruiterId),
            });

        if (status !== undefined)
            qb.andWhere("aj.status = :status", { status: Number(status) });

        const items = await qb.getRawMany();

        // 🔢 COUNT QUERY (safe)
        const countQb = AppliedJob.createQueryBuilder("aj");

        if (jobId !== undefined)
            countQb.andWhere("aj.jobId = :jobId", { jobId: Number(jobId) });

        if (userId !== undefined)
            countQb.andWhere("aj.userId = :userId", { userId: Number(userId) });

        if (reqruiterId !== undefined)
            countQb.andWhere("aj.reqruiterId = :reqruiterId", {
                reqruiterId: Number(reqruiterId),
            });

        if (status !== undefined)
            countQb.andWhere("aj.status = :status", { status: Number(status) });

        const total = await countQb.getCount();

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

export const updateRecruiterApplyJob = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { status, updatedBy } = req.body;

        const job = await AppliedJob.findOne({
            where: { id: Number(id) },
        });

        if (!job) {
            return createResponse(res, 404, MSG.NOT_FOUND, []);
        }

        job.status = status ?? job.status;
        job.updatedBy = updatedBy ?? job.updatedBy;

        await job.save();

        return createResponse(res, 200, MSG.UPDATED, job);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};

export const deleteRecruiterApplyJob = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const job = await AppliedJob.findOne({
            where: { id: Number(id) },
        });

        if (!job) {
            return createResponse(res, 404, MSG.NOT_FOUND, []);
        }

        await AppliedJob.remove(job);

        return createResponse(res, 200, MSG.DELETED, []);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MSG.INTERNAL_ERROR, []);
    }
};
