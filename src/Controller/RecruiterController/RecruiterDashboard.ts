import { AppliedJob } from "../../Entities/AppliedJob";
import { JobPost } from "../../Entities/JobPost";
import { RecruiterDocuments } from "../../Entities/recruiterDocuments";
import { User } from "../../Entities/user";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";


export const recruiterVerificationData = async (req: any, res: any) => {
    try {
        const id = Number(req.query.id);
        if (!id) {
            return createResponse(res, 400, "Recruiter id is required", [], false, true);
        }
        const user = await User.findOneBy({ id });
        const firstJob = await JobPost.createQueryBuilder("job")
            .where("job.recruiterId = :id", { id })
            .orderBy("job.createdAt", "DESC")
            .getOne();

        // Live Jobs Count
        const liveJob = await JobPost.createQueryBuilder("job")
            .where("job.recruiterId = :id", { id })
            .andWhere("job.status = :status", { status: "LIVE" })
            .getCount();

        // Under Review Jobs Count
        const underReviewJob = await JobPost.createQueryBuilder("job")
            .where("job.recruiterId = :id", { id })
            .andWhere("job.status = :status", { status: "UNDER_REVIEW" })
            .getCount();

        /* ================= DOCUMENTS ================= */
        const documents = await RecruiterDocuments.createQueryBuilder("doc")
            .where("doc.userId = :id", { id })
            .orderBy("doc.createdAt", "DESC")
            .getMany();

        /* ================= PENDING CANDIDATES ================= */
        const pendingCandidate = await AppliedJob.createQueryBuilder("app")
            .where("app.userId = :id", { id })
            .orderBy("app.createdAt", "DESC")
            .getCount();

        /* ================= FINAL RESPONSE ================= */
        const finalData = {
            isAccountCreated: user ? 1 : 0,
            isVerified: user?.isVerified ? 1 : 0,
            isEmailVerified: user?.isEmailVerified ? 1 : 0,
            credits: user?.credits ?? 0,

            firstJob: firstJob ? 1 : 0,
            firstJobVerified: firstJob?.isVerified ? 1 : 0,

            documentSubmission: documents?.length > 0 ? 1 : 0,
            liveJob,
            underReviewJob,
            pendingCandidate,
        };


        return createResponse(res, 200, MESSAGES.DATA_FETCH_SUCCESS, finalData, true, false);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], false, true);
    }
};


