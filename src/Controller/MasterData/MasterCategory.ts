 
import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants";
import { MasterCategory } from "../../Entities/masterCategory";
 
// CREATE CATEGORY
export const createCategory = async (req: any, res: any) => {
    try {
        const { name, description, status, createdBy } = req.body;

        if (!name) return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);

        const category = MasterCategory.create({
            name,
            description,
            status: status ?? 1,
            createdBy,
            updatedBy: createdBy
        });

        await category.save();

        return createResponse(res, 201, MESSAGES.CATEGORY_CREATED, category);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req: any, res: any) => {
    try {
        const list = await MasterCategory.find();
        return createResponse(res, 200, MESSAGES.CATEGORIES_FETCHED, list);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const category = await MasterCategory.findOne({ where: { id: Number(id) } });

        if (!category) return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);

        return createResponse(res, 200, MESSAGES.CATEGORY_FETCHED, category);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// UPDATE CATEGORY
export const updateCategory = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { name, description, status, updatedBy } = req.body;

        const category = await MasterCategory.findOne({ where: { id: Number(id) } });

        if (!category) return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);

        category.name = name ?? category.name;
        category.description = description ?? category.description;
        category.status = status ?? category.status;
        category.updatedBy = updatedBy ?? category.updatedBy;

        await category.save();

        return createResponse(res, 200, MESSAGES.CATEGORY_UPDATED, category);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// DELETE CATEGORY
export const deleteCategory = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const category = await MasterCategory.findOne({ where: { id: Number(id) } });

        if (!category) return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);

        await MasterCategory.remove(category);

        return createResponse(res, 200, MESSAGES.CATEGORY_DELETED, []);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
