import { MasterQuestions } from "../../Entities/masterQuestion";
import { MasterQuestionOptions } from "../../Entities/MasterQuestionOptions";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";
///// Questions group 
export const createQuestion = async (req: any, res: any) => {
    try {
        const { categoryId, description, status } = req.body;

        if (!description || !categoryId) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
        }

        const question = MasterQuestions.create({
            categoryId: categoryId ?? null,
            description,
            status: status ?? 1,
        });

        await question.save();

        return createResponse(res, 201, MESSAGES.QUESTION_CREATED, question);

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
export const getAllQuestions = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const qb = MasterQuestions.createQueryBuilder("q")
            .select([
                "q.id",
                "q.categoryId",
                "q.description",
                "q.status",
                "q.createdAt",
                "q.updatedAt"
            ])
            .orderBy("q.id", "DESC")
            .limit(Number(limit))
            .offset(offset);

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {

                if (key === "id" || key === "status" || key === "categoryId") {
                    qb.andWhere(`q."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    qb.andWhere(`q."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }

            }
        });

        const items = await qb.getMany();

        // TOTAL COUNT
        const totalQB = MasterQuestions.createQueryBuilder("q")
            .select("COUNT(q.id)", "total");

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                if (key === "id" || key === "status" || key === "categoryId") {
                    totalQB.andWhere(`q."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    totalQB.andWhere(`q."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const total = await totalQB.getRawOne();
        const totalRecords = Number(total.total);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.QUESTIONS_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items
        });

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
export const updateQuestion = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { categoryId, description, status } = req.body;

        const question = await MasterQuestions.findOne({ where: { id: Number(id) } });
        if (!question) return createResponse(res, 404, MESSAGES.QUESTION_NOT_FOUND, [], true, true);

        question.categoryId = categoryId ?? question.categoryId;
        question.description = description ?? question.description;
        question.status = status ?? question.status;

        await question.save();

        return createResponse(res, 200, MESSAGES.QUESTION_UPDATED, question);

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
export const deleteQuestion = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const question = await MasterQuestions.findOne({ where: { id: Number(id) } });
        if (!question) return createResponse(res, 404, MESSAGES.QUESTION_NOT_FOUND, [], true, true);

        await MasterQuestions.remove(question);

        return createResponse(res, 200, MESSAGES.QUESTION_DELETED, []);

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
///// Options group 
export const createQuestionOption = async (req: any, res: any) => {
    try {
        const { questionId, optionText, status } = req.body;
        console.log(questionId, optionText);

        if (!questionId || !optionText) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
        }
        const exist = await MasterQuestionOptions.findOne({
            where: { questionId, optionText },
        });

        if (exist) {
            return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Option"), [], true, true);
        }

        const option = MasterQuestionOptions.create({
            questionId,
            optionText,
            status: status ?? 1,
        });

        await option.save();

        return createResponse(res, 201, MESSAGES.OPTION_CREATED, option);

    } catch (error: any) { 

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
export const getAllQuestionOptions = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const qb = MasterQuestionOptions.createQueryBuilder("opt")
            .select([
                "opt.id",
                "opt.questionId",
                "opt.optionText",
                "opt.status",
                "opt.createdAt",
                "opt.updatedAt",
            ])
            .orderBy("opt.id", "DESC")
            .limit(Number(limit))
            .offset(offset);

        // Dynamic Filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                if (["id", "status", "questionId"].includes(key)) {
                    qb.andWhere(`opt."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    qb.andWhere(`opt."${key}" ILIKE :${key}`, {
                        [key]: `%${value}%`,
                    });
                }
            }
        });

        const items = await qb.getMany();

        // Count Query
        const totalQB = MasterQuestionOptions.createQueryBuilder("opt")
            .select("COUNT(opt.id)", "total");

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                if (["id", "status", "questionId"].includes(key)) {
                    totalQB.andWhere(`opt."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    totalQB.andWhere(`opt."${key}" ILIKE :${key}`, {
                        [key]: `%${value}%`,
                    });
                }
            }
        });

        const total = await totalQB.getRawOne();
        const totalRecords = Number(total.total);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.OPTIONS_FETCHED, {
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
export const updateQuestionOption = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { questionId, optionText, status } = req.body;

        const option = await MasterQuestionOptions.findOne({ where: { id: Number(id) } });

        if (!option) {
            return createResponse(res, 404, MESSAGES.OPTION_NOT_FOUND, [], true, true);
        }

        // 🔍 Duplicate Check on Update
        if (questionId || optionText) {
            const check = await MasterQuestionOptions.findOne({
                where: {
                    questionId: questionId ?? option.questionId,
                    optionText: optionText ?? option.optionText,
                }
            });

            if (check && check.id !== option.id) {
                return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Option"), [], true, true);
            }
        }

        option.questionId = questionId ?? option.questionId;
        option.optionText = optionText ?? option.optionText;
        option.status = status ?? option.status;

        await option.save();

        return createResponse(res, 200, MESSAGES.OPTION_UPDATED, option);

    } catch (error: any) {
        console.log(error);

        if (error.code === "ER_DUP_ENTRY") {
            return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Option"), [], true, true);
        }

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
export const deleteQuestionOption = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const option = await MasterQuestionOptions.findOne({
            where: { id: Number(id) },
        });

        if (!option) {
            return createResponse(res, 404, MESSAGES.OPTION_NOT_FOUND, [], true, true);
        }

        await MasterQuestionOptions.remove(option);

        return createResponse(res, 200, MESSAGES.OPTION_DELETED, []);

    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
