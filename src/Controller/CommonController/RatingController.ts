import { RateUs } from "../../Entities/RateUs";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";

const applyRateUsFilters = (
    qb:any,
    filters: any
) => {
    if (filters.userId) {
        qb.andWhere("rate.userId = :userId", { userId: filters.userId });
    }

    if (filters.rating !== undefined) {
        qb.andWhere("rate.rating = :rating", { rating: filters.rating });
    }

    if (filters.status !== undefined) {
        qb.andWhere("rate.status = :status", { status: filters.status });
    }
};

 
export const createRateUs = async (req: any, res: any) => {
    try {
        const { userId, rating = 0, description, status = 1, createdBy } = req.body;

        if (!userId) {
            return createResponse(res, 400, "User ID is required", [], true, true);
        }

        if (rating < 0 || rating > 5) {
            return createResponse(res, 400, "Rating must be between 0 and 5");
        }

        const rateUs = RateUs.create({
            userId,
            rating,
            description,
            status,
            createdBy,
            updatedBy: createdBy,
        });

        await rateUs.save();

        return createResponse(res, 201, "Rating submitted successfully", rateUs);

    } catch (error) {
        console.error(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
export const getAllRateUs = async (req: any, res: any) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const filters = {
            userId: req.query.userId ? Number(req.query.userId) : undefined,
            rating: req.query.rating ? Number(req.query.rating) : undefined,
            status: req.query.status ? Number(req.query.status) : undefined,
        };

        const qb = RateUs.createQueryBuilder("rate")
            .orderBy("rate.createdAt", "DESC")
            .skip(offset)
            .take(limit);

        applyRateUsFilters(qb, filters);

        const [items, totalRecords] = await qb.getManyAndCount();

        return createResponse(res, 200, "Ratings fetched successfully", {
            currentPage: page,
            limit,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            items,
        });

    } catch (error) {
        console.error(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
export const updateRateUs = async (req: any, res: any) => {
    try {
        const id = Number(req.params.id);
        const { rating, description, status, updatedBy } = req.body;

        const rateUs = await RateUs.findOneBy({ id });
        if (!rateUs) {
            return createResponse(res, 404, "Rating not found");
        }

        if (rating !== undefined && (rating < 0 || rating > 5)) {
            return createResponse(res, 400, "Rating must be between 0 and 5");
        }

        Object.assign(rateUs, {
            rating: rating ?? rateUs.rating,
            description: description ?? rateUs.description,
            status: status ?? rateUs.status,
            updatedBy: updatedBy ?? rateUs.updatedBy,
        });

        await rateUs.save();

        return createResponse(res, 200, "Rating updated successfully", rateUs);

    } catch (error) {
        console.error(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
export const deleteRateUs = async (req: any, res: any) => {
    try {
        const id = Number(req.params.id);

        const result = await RateUs.delete({ id });
        if (!result.affected) {
            return createResponse(res, 404, "Rating not found");
        }

        return createResponse(res, 200, "Rating deleted successfully");

    } catch (error) {
        console.error(error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
