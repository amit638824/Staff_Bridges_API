import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants";
import { JobCategory } from "../../Entities/category"; 
import { MasterCategory } from "../../Entities/masterCategory";
import { User } from "../../Entities/user";
// CREATE JOB CATEGORY
export const createJobCategory = async (req: any, res: any) => {
  try {
    const { categoryId, userId, status, createdBy } = req.body;

    if (!categoryId || !userId) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    // CHECK IF USER ALREADY HAS 4 OR MORE CATEGORIES
    const categoryCount = await JobCategory.count({ where: { userId } });
    if (categoryCount >= 4) {
      return createResponse(
        res,
        400,
        `User cannot have more than 4 job categories`,
        [],
        true,
        true
      );
    }

    // CHECK DUPLICATE userId + categoryId
    const exists = await JobCategory.findOne({ where: { categoryId, userId } });
    if (exists) {
      return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Job Category"), [], true, true);
    }

    const jobCat = JobCategory.create({
      categoryId,
      userId,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await jobCat.save();

    return createResponse(res, 201, MESSAGES.CATEGORY_CREATED, jobCat);

  } catch (error: any) {
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

// GET ALL JOB CATEGORIES + FILTER + PAGINATION
export const getAllJobCategories = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = JobCategory.createQueryBuilder("job")
      .select([
        "job.id AS job_id",
        "job.categoryId AS job_categoryId",
        "job.userId AS job_userId",

        // CATEGORY FIELDS 
        "category.name AS category_name",
        "category.image AS category_image",

        // USER FIELDS 
        "user.fullName AS user_fullName",
        "user.email AS user_email"
      ])
      .leftJoin(MasterCategory, "category", "job.categoryId = category.id")
      .leftJoin(User, "user", "job.userId = user.id")
      .orderBy("job.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    // FILTERS
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "id":
        case "categoryId":
        case "userId":
        case "status":
          qb.andWhere(`job.${key} = :${key}`, { [key]: Number(value) });
          break;

        case "categoryName":
          qb.andWhere(`category.name ILIKE :categoryName`, {
            categoryName: `%${value}%`,
          });
          break;

        case "fullName":
          qb.andWhere(`user.fullName ILIKE :fullName`, {
            fullName: `%${value}%`,
          });
          break;

        case "email":
          qb.andWhere(`user.email ILIKE :email`, {
            email: `%${value}%`,
          });
          break;
      }
    });

    const items = await qb.getRawMany();

    // COUNT QUERY
    const totalQB = JobCategory.createQueryBuilder("job")
      .leftJoin(MasterCategory, "category", "job.categoryId = category.id")
      .leftJoin(User, "user", "job.userId = user.id")
      .select("COUNT(job.id)", "total");

    // APPLY SAME FILTERS
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "id":
        case "categoryId":
        case "userId":
        case "status":
          totalQB.andWhere(`job.${key} = :${key}`, { [key]: Number(value) });
          break;

        case "categoryName":
          totalQB.andWhere(`category.name ILIKE :categoryName`, {
            categoryName: `%${value}%`,
          });
          break;

        case "fullName":
          totalQB.andWhere(`user.fullName ILIKE :fullName`, {
            fullName: `%${value}%`,
          });
          break;

        case "email":
          totalQB.andWhere(`user.email ILIKE :email`, {
            email: `%${value}%`,
          });
          break;
      }
    });

    const total = await totalQB.getRawOne();
    const totalRecords = Number(total.total || 0);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MESSAGES.CATEGORIES_FETCHED, {
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

// UPDATE JOB CATEGORY
export const updateJobCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { categoryId, userId, status, updatedBy } = req.body;

    const jobCat = await JobCategory.findOne({ where: { id: Number(id) } });

    if (!jobCat) {
      return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);
    }

    // IF categoryId + userId changed → check duplicate
    if ((categoryId && categoryId !== jobCat.categoryId) || (userId && userId !== jobCat.userId)) {
      const duplicate = await JobCategory.findOne({
        where: {
          categoryId: categoryId ?? jobCat.categoryId,
          userId: userId ?? jobCat.userId,
        }
      });

      if (duplicate) {
        return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Job Category"), [], true, true);
      }
    }

    jobCat.categoryId = categoryId ?? jobCat.categoryId;
    jobCat.userId = userId ?? jobCat.userId;
    jobCat.status = status ?? jobCat.status;
    jobCat.updatedBy = updatedBy ?? jobCat.updatedBy;

    await jobCat.save();

    return createResponse(res, 200, MESSAGES.CATEGORY_UPDATED, jobCat);

  } catch (error: any) {
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
}; 
// DELETE JOB CATEGORY
export const deleteJobCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const jobCat = await JobCategory.findOne({ where: { id: Number(id) } });

    if (!jobCat) {
      return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);
    }

    await JobCategory.remove(jobCat);

    return createResponse(res, 200, MESSAGES.CATEGORY_DELETED, []);

  } catch (error) {
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
