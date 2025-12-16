import { MasterJobTitle } from "../../Entities/MasterJobTitle";
import { MASTER_JOB_TITLE_MESSAGES } from "../../Helpers/masterJobTitle.messages";
import { createResponse } from "../../Helpers/response"; 
export const createJobTitle = async (req: any, res: any) => {
  try {
    const { name, description, status, createdBy } = req.body;

    if (!name) {
      return createResponse(res, 400, MASTER_JOB_TITLE_MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    const exist = await MasterJobTitle.findOne({ where: { name } });
    if (exist) {
      return createResponse(res, 409, MASTER_JOB_TITLE_MESSAGES.ALREADY_EXISTS, [], true, true);
    }

    const jobTitle = MasterJobTitle.create({
      name,
      description,
      status: status ?? 1,
      createdBy,
      updatedBy: createdBy,
    });

    await jobTitle.save();

    return createResponse(res, 201, MASTER_JOB_TITLE_MESSAGES.CREATED, jobTitle);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MASTER_JOB_TITLE_MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

export const getAllJobTitles = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterJobTitle.createQueryBuilder("jt")
      .select(["jt.id", "jt.name", "jt.description", "jt.status"])
      .orderBy("jt.id", "DESC")
      .limit(Number(limit))
      .offset(offset);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (key === "id" || key === "status") {
        qb.andWhere(`jt."${key}" = :${key}`, { [key]: Number(value) });
      } else {
        qb.andWhere(`jt."${key}" ILIKE :${key}`, {
          [key]: `%${value}%`,
        });
      }
    });

    const items = await qb.getMany();

    const total = await MasterJobTitle.createQueryBuilder("jt")
      .getCount();

    return createResponse(res, 200, MASTER_JOB_TITLE_MESSAGES.FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalRecords: total,
      totalPages: Math.ceil(total / Number(limit)),
      items,
    });
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MASTER_JOB_TITLE_MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
export const updateJobTitle = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, description, status, updatedBy } = req.body;

    const jobTitle = await MasterJobTitle.findOne({
      where: { id: Number(id) },
    });

    if (!jobTitle) {
      return createResponse(res, 404, MASTER_JOB_TITLE_MESSAGES.NOT_FOUND, [], true, true);
    }

    jobTitle.name = name ?? jobTitle.name;
    jobTitle.description = description ?? jobTitle.description;
    jobTitle.status = status ?? jobTitle.status;
    jobTitle.updatedBy = updatedBy ?? jobTitle.updatedBy;

    await jobTitle.save();

    return createResponse(res, 200, MASTER_JOB_TITLE_MESSAGES.UPDATED, jobTitle);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MASTER_JOB_TITLE_MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
export const deleteJobTitle = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const jobTitle = await MasterJobTitle.findOne({
      where: { id: Number(id) },
    });

    if (!jobTitle) {
      return createResponse(res, 404, MASTER_JOB_TITLE_MESSAGES.NOT_FOUND, [], true, true);
    }

    await MasterJobTitle.remove(jobTitle);

    return createResponse(res, 200, MASTER_JOB_TITLE_MESSAGES.DELETED, []);
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, MASTER_JOB_TITLE_MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
/**
 * @swagger
 * tags:
 *   - name: Master Category
 *     description: APIs for managing master categories
 */
/**
 * @swagger
 * /api/master-category:
 *   post:
 *     tags:
 *       - Master Category
 *     summary: Create a new master category
 *     description: Adds a new category to the system including optional image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Information Technology
 *               description:
 *                 type: string
 *                 example: All IT related fields
 *               status:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 101
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Category image file
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Category already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-category:
 *   get:
 *     tags:
 *       - Master Category
 *     summary: Get all categories with filters and pagination
 *     description: Returns list of master categories with optional filters and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by category ID (exact match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by category name (partial, case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0,1]
 *         description: Filter by status (0 = inactive, 1 = active)
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filter by category description (partial, case-insensitive)
 *     responses:
 *       200:
 *         description: Successfully fetched categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalRecords:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: integer
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */ 
/**
 * @swagger
 * /api/master-category/{id}:
 *   put:
 *     tags:
 *       - Master Category
 *     summary: Update an existing category
 *     description: Updates category fields by ID. Supports optional image upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *               status:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 101
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file to upload
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 image:
 *                   type: string
 *                   description: URL of uploaded image
 *                 updatedBy:
 *                   type: integer
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-category/{id}:
 *   delete:
 *     tags:
 *       - Master Category
 *     summary: Delete a category
 *     description: Removes a master category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
