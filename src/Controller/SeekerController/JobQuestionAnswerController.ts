import { jobQuestionAnswer } from "../../Entities/jobQuestionAnswer";
import { MasterQuestions } from "../../Entities/masterQuestion";
import { MasterQuestionOptions } from "../../Entities/MasterQuestionOptions";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";

// CREATE Answer
export const createJobAnswer = async (req: any, res: any) => {
    try {
        const { categoryId, questionId, userId, optionId, status, createdBy } = req.body;

        if (!questionId || !userId) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
        }

        // Duplicate check: same user, same question, same category, same option
        const exist = await jobQuestionAnswer.findOne({
            where: { userId, questionId, categoryId, optionId }
        });

        if (exist) {
            return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Answer"), [], true, true);
        }

        const answer = jobQuestionAnswer.create({
            categoryId: categoryId ?? null,
            questionId,
            userId,
            optionId,
            status: status ?? 1,
            createdBy,
            updatedBy: createdBy,
        });

        await answer.save();

        return createResponse(res, 201, MESSAGES.ANSWER_CREATED, answer);

    } catch (error: any) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// GET ALL Answers
export const getAllJobAnswers = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const qb = jobQuestionAnswer.createQueryBuilder("ans")
            .leftJoinAndSelect(MasterQuestions, "q", "ans.questionId = q.id")
            .leftJoinAndSelect(MasterQuestionOptions, "opt", "ans.optionId = opt.id")
            .select([
                "ans.id",
                "ans.categoryId",
                "ans.questionId",
                "ans.userId",
                "ans.optionId",
                "ans.status",
                "ans.createdAt",
                "ans.updatedAt",
                "q.description",
                "q.status",
                "opt.optionText",
                "opt.status"
            ])
            .orderBy("ans.id", "DESC")
            .limit(Number(limit))
            .offset(offset);

        // Dynamic Filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                if (["id", "status", "categoryId", "questionId", "userId", "optionId"].includes(key)) {
                    qb.andWhere(`ans."${key}" = :${key}`, { [key]: Number(value) });
                }
            }
        });

        const items = await qb.getMany();

        // Count Query
        const totalQB = jobQuestionAnswer.createQueryBuilder("ans")
            .select("COUNT(ans.id)", "total");

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                if (["id", "status", "categoryId", "questionId", "userId", "optionId"].includes(key)) {
                    totalQB.andWhere(`ans."${key}" = :${key}`, { [key]: Number(value) });
                }
            }
        });

        const total = await totalQB.getRawOne();
        const totalRecords = Number(total.total);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.ANSWERS_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items,
        });

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// UPDATE Answer
export const updateJobAnswer = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { categoryId, questionId, userId, optionId, status, updatedBy } = req.body;

        const answer = await jobQuestionAnswer.findOne({ where: { id: Number(id) } });
        if (!answer) {
            return createResponse(res, 404, MESSAGES.ANSWER_NOT_FOUND, [], true, true);
        }

        // Duplicate check
        if (questionId || userId || categoryId || optionId) {
            const check = await jobQuestionAnswer.findOne({
                where: {
                    userId: userId ?? answer.userId,
                    questionId: questionId ?? answer.questionId,
                    categoryId: categoryId ?? answer.categoryId,
                    optionId: optionId ?? answer.optionId,
                }
            });

            if (check && check.id !== answer.id) {
                return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Answer"), [], true, true);
            }
        }

        answer.categoryId = categoryId ?? answer.categoryId;
        answer.questionId = questionId ?? answer.questionId;
        answer.userId = userId ?? answer.userId;
        answer.optionId = optionId ?? answer.optionId;
        answer.status = status ?? answer.status;
        answer.updatedBy = updatedBy ?? answer.updatedBy;

        await answer.save();

        return createResponse(res, 200, MESSAGES.ANSWER_UPDATED, answer);

    } catch (error: any) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// DELETE Answer
export const deleteJobAnswer = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const answer = await jobQuestionAnswer.findOne({ where: { id: Number(id) } });
        if (!answer) {
            return createResponse(res, 404, MESSAGES.ANSWER_NOT_FOUND, [], true, true);
        }

        await jobQuestionAnswer.remove(answer);

        return createResponse(res, 200, MESSAGES.ANSWER_DELETED, []);

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
