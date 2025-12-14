 
import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants";
import { MasterCategory } from "../../Entities/masterCategory";
import { uploadToS3 } from "../../Helpers/s3";
 
export const createCategory = async (req: any, res: any) => {
  try {
    const { name, description, status, createdBy } = req.body;

    if (!name) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    } 
    const exist = await MasterCategory.findOne({ where: { name } });
    if (exist) {
      return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Category"), [], true, true);
    }

    let imageUrl: string | undefined = undefined; 
    if (req.files && req.files.file) {
      const file = req.files.file;
      const uploaded = await uploadToS3(file, "category");
      imageUrl = uploaded.url;
    } 
    const category = MasterCategory.create({
      name,
      description,
      image: imageUrl,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await category.save();

    return createResponse(res, 201, MESSAGES.CATEGORY_CREATED, category);

  } catch (error: any) { 
     // tslint:disable-next-line:no-console  
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};  
// GET ALL CATEGORIES WITH FILTERS + PAGINATION
export const getAllCategories = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Base query
        const qb = MasterCategory.createQueryBuilder("cat")
            .select([
                "cat.id",
                "cat.name",
                "cat.image",
                "cat.description",
                "cat.status" 
            ])
            .orderBy("cat.id", "DESC")
            .limit(Number(limit))
            .offset(offset);

        // Dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {

                if (key === "status") {
                    qb.andWhere(`cat."${key}" = :${key}`, { [key]: Number(value) });
                }  
                else if (key === "id") {
                    qb.andWhere(`cat."${key}" = :${key}`, { [key]: Number(value) });
                }
                else {
                    qb.andWhere(`cat."${key}" ILIKE :${key}`, {
                        [key]: `%${value}%`,
                    });
                }
            }
        });

        const items = await qb.getMany();

        // Total count query
        const totalQB = MasterCategory.createQueryBuilder("cat")
            .select("COUNT(cat.id)", "total");

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {

                if (key === "status") {
                    totalQB.andWhere(`cat."${key}" = :${key}`, { [key]: Number(value) });
                }
                else if (key === "id") {
                    totalQB.andWhere(`cat."${key}" = :${key}`, { [key]: Number(value) });
                }
                else {
                    totalQB.andWhere(`cat."${key}" ILIKE :${key}`, {
                        [key]: `%${value}%`,
                    });
                }
            }
        });

        const totalResult = await totalQB.getRawOne();
        const totalRecords = parseInt(totalResult.total || "0", 10);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.CATEGORIES_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items,
        });

    } catch (error) {
         // tslint:disable-next-line:no-console 
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// UPDATE CATEGORY WITH IMAGE SUPPORT
export const updateCategory = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { name, description, status, updatedBy } = req.body;

        // Fetch existing category
        const category = await MasterCategory.findOne({ where: { id: Number(id) } });
        if (!category) return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);

        // Handle image upload if file exists
        let imageUrl: string | undefined = category.image; // Keep existing if no new file
        if (req.files && req.files.file) {
            const file = req.files.file;
            const uploaded = await uploadToS3(file, "category");
            imageUrl = uploaded.url;
        }

        // Update fields
        category.name = name ?? category.name;
        category.description = description ?? category.description;
        category.status = status ?? category.status;
        category.updatedBy = updatedBy ?? category.updatedBy;
        category.image = imageUrl;

        await category.save();

        return createResponse(res, 200, MESSAGES.CATEGORY_UPDATED, category);

    } catch (error: any) {
         // tslint:disable-next-line:no-console 
        console.log(error); 

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
         // tslint:disable-next-line:no-console 
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
