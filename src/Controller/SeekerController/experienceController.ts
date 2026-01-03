import { createResponse } from "../../Helpers/response";
import { MESSAGES } from "../../Helpers/constants";
import { Experience } from "../../Entities/experience"; 
import { MasterCategory } from "../../Entities/masterCategory";
import { User } from "../../Entities/user";

// ================= CREATE EXPERIENCE =================
export const createExperience = async (req: any, res: any) => {
  try {
    const { 
      categoryId, 
      userId, 
      status, 
      createdBy, 
      experience, 
      company, 
      year, 
      months 
    } = req.body;

    if (!categoryId || !userId || !experience) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    // CHECK MAX 4 EXPERIENCES PER USER
    const experienceCount = await Experience.count({ where: { userId } });
    if (experienceCount >= 4) {
      return createResponse(res, 400, "User cannot have more than 4 experiences", [], true, true);
    }

    // CHECK DUPLICATE categoryId + userId
    const exists = await Experience.findOne({ 
      where: { 
        categoryId, 
        userId,
        experience // Also check experience value to avoid duplicate entries
      } 
    });
    if (exists) {
      return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Experience"), [], true, true);
    }

    const exp = Experience.create({
      categoryId,
      userId,
      experience,
      company: company || null,
      year: year || 0,
      months: months || 0,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await exp.save();

    return createResponse(res, 201, MESSAGES.CATEGORY_CREATED, exp);

  } catch (error: any) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

// ================= GET ALL EXPERIENCES =================
export const getAllExperience = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = Experience.createQueryBuilder("exp")
      .select([
        "exp.id AS experience_id",
        "exp.categoryId AS experience_categoryId",
        "exp.userId AS experience_userId",
        "exp.experience AS experience_value",
        "exp.company AS experience_company",
        "exp.year AS experience_year",
        "exp.months AS experience_months",
        "exp.status AS experience_status",
        "exp.createdAt AS experience_createdAt",
        "exp.updatedAt AS experience_updatedAt",

        "category.name AS category_name",
        "category.image AS category_image",

        "user.fullName AS user_fullName",
        "user.email AS user_email"
      ])
      .leftJoin(MasterCategory, "category", "exp.categoryId = category.id")
      .leftJoin(User, "user", "exp.userId = user.id")
      .orderBy("exp.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    // APPLY FILTERS
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "id":
        case "categoryId":
        case "userId":
        case "status":
        case "year":
        case "months":
          qb.andWhere(`exp.${key} = :${key}`, { [key]: Number(value) });
          break;

        case "experience":
          qb.andWhere(`exp.experience ILIKE :experience`, { experience: `%${value}%` });
          break;

        case "company":
          qb.andWhere(`exp.company ILIKE :company`, { company: `%${value}%` });
          break;

        case "categoryName":
          qb.andWhere(`category.name ILIKE :categoryName`, { categoryName: `%${value}%` });
          break;

        case "fullName":
          qb.andWhere(`user.fullName ILIKE :fullName`, { fullName: `%${value}%` });
          break;

        case "email":
          qb.andWhere(`user.email ILIKE :email`, { email: `%${value}%` });
          break;
      }
    });

    const items = await qb.getRawMany();

    // COUNT QUERY
    const totalQB = Experience.createQueryBuilder("exp")
      .leftJoin(MasterCategory, "category", "exp.categoryId = category.id")
      .leftJoin(User, "user", "exp.userId = user.id")
      .select("COUNT(exp.id)", "total");

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "id":
        case "categoryId":
        case "userId":
        case "status":
        case "year":
        case "months":
          totalQB.andWhere(`exp.${key} = :${key}`, { [key]: Number(value) });
          break;

        case "experience":
          totalQB.andWhere(`exp.experience ILIKE :experience`, { experience: `%${value}%` });
          break;

        case "company":
          totalQB.andWhere(`exp.company ILIKE :company`, { company: `%${value}%` });
          break;

        case "categoryName":
          totalQB.andWhere(`category.name ILIKE :categoryName`, { categoryName: `%${value}%` });
          break;

        case "fullName":
          totalQB.andWhere(`user.fullName ILIKE :fullName`, { fullName: `%${value}%` });
          break;

        case "email":
          totalQB.andWhere(`user.email ILIKE :email`, { email: `%${value}%` });
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
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

// ================= UPDATE EXPERIENCE =================
export const updateExperience = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { 
      categoryId, 
      userId, 
      status, 
      updatedBy, 
      experience, 
      company, 
      year, 
      months 
    } = req.body;

    const exp = await Experience.findOne({ where: { id: Number(id) } });
    if (!exp) {
      return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);
    }

    // CHECK DUPLICATE IF categoryId OR userId OR experience CHANGED
    if ((categoryId && categoryId !== exp.categoryId) || 
        (userId && userId !== exp.userId) ||
        (experience && experience !== exp.experience)) {
      
      const duplicate = await Experience.findOne({
        where: {
          categoryId: categoryId ?? exp.categoryId,
          userId: userId ?? exp.userId,
          experience: experience ?? exp.experience
        }
      });

      // Exclude current record from duplicate check
      if (duplicate && duplicate.id !== exp.id) {
        return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Experience"), [], true, true);
      }
    }

    // MAX 4 EXPERIENCES PER USER CHECK (only if userId is being changed)
    if (userId && userId !== exp.userId) {
      const experienceCount = await Experience.count({ where: { userId } });
      if (experienceCount >= 4) {
        return createResponse(res, 400, "User cannot have more than 4 experiences", [], true, true);
      }
    }

    exp.categoryId = categoryId ?? exp.categoryId;
    exp.userId = userId ?? exp.userId;
    exp.status = status ?? exp.status;
    exp.experience = experience ?? exp.experience;
    exp.company = company ?? exp.company;
    exp.year = year ?? exp.year;
    exp.months = months ?? exp.months;
    exp.updatedBy = updatedBy ?? exp.updatedBy;

    await exp.save();

    return createResponse(res, 200, MESSAGES.CATEGORY_UPDATED, exp);

  } catch (error: any) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

// ================= DELETE EXPERIENCE =================
export const deleteExperience = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const exp = await Experience.findOne({ where: { id: Number(id) } });
    if (!exp) {
      return createResponse(res, 404, MESSAGES.CATEGORY_NOT_FOUND, [], true, true);
    }

    await Experience.remove(exp);

    return createResponse(res, 200, MESSAGES.CATEGORY_DELETED, []);

  } catch (error) {
     // tslint:disable-next-line:no-console 
    console.log(error);

    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};