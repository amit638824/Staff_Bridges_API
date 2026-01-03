/**
 * @swagger
 * tags:
 *   name: Seeker Category
 *   description: Job Category (User + Category Mapping) Management
 */
 
/**
 * @swagger
 * /api/seeker-category:
 *   post:
 *     summary: Create a new Job Category (User + Category Mapping)
 *     tags: [Seeker Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - userId
 *             properties:
 *               categoryId:
 *                 type: number
 *                 example: 3
 *               userId:
 *                 type: number
 *                 example: 15
 *               status:
 *                 type: number
 *                 example: 1
 *               createdBy:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Job Category created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Duplicate job category mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/seeker-category:
 *   get:
 *     summary: Get all Job Categories with filters & pagination
 *     tags: [Seeker Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         example: 5
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: number
 *         example: 3
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         example: 10
 
 *     
 *     responses:
 *       200:
 *         description: Job Categories fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/seeker-category/{id}:
 *   put:
 *     summary: Update Job Category
 *     tags: [Seeker Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: number
 *               userId:
 *                 type: number
 *               status:
 *                 type: number
 *               updatedBy:
 *                 type: number
 *     responses:
 *       200:
 *         description: Job Category updated successfully
 *       404:
 *         description: Job Category not found
 *       409:
 *         description: Duplicate mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/seeker-category/{id}:
 *   delete:
 *     summary: Delete Job Category
 *     tags: [Seeker Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 12
 *     responses:
 *       200:
 *         description: Job Category deleted successfully
 *       404:
 *         description: Job Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/seeker-experience:
 *   post:
 *     summary: Create a new Experience (User + Category Mapping)
 *     tags: [Seeker Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - userId
 *               - experience
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 3
 *               userId:
 *                 type: integer
 *                 example: 15
 *               experience:
 *                 type: string
 *                 example: "5 years in UI/UX"
 *               company:
 *                 type: string
 *                 example: "Tech Corp Inc"
 *               year:
 *                 type: integer
 *                 minimum: 0
 *                 example: 5
 *               months:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 11
 *                 example: 3
 *               status:
 *                 type: integer
 *                 default: 1
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Experience created successfully.
 *       400:
 *         description: Required fields missing or user already has 4 experiences.
 *       409:
 *         description: Duplicate experience mapping found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/seeker-experience:
 *   get:
 *     summary: Get all Experiences with filters & pagination
 *     tags: [Seeker Experience]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer 
 *           default: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer 
 *           default: 10
 *         example: 10
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *         example: 1 
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         example: "Tech Corp"
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         example: 5
 *       - in: query
 *         name: months
 *         schema:
 *           type: integer
 *         example: 3 
 *     responses:
 *       200:
 *         description: Experiences fetched successfully.
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
 *                       experience_id:
 *                         type: integer
 *                       experience_categoryId:
 *                         type: integer
 *                       experience_userId:
 *                         type: integer
 *                       experience_value:
 *                         type: string
 *                       experience_company:
 *                         type: string
 *                       experience_year:
 *                         type: integer
 *                       experience_months:
 *                         type: integer
 *                       experience_status:
 *                         type: integer
 *                       experience_createdAt:
 *                         type: string
 *                         format: date-time
 *                       experience_updatedAt:
 *                         type: string
 *                         format: date-time
 *                       category_name:
 *                         type: string
 *                       category_image:
 *                         type: string
 *                       user_fullName:
 *                         type: string
 *                       user_email:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/seeker-experience/{id}:
 *   put:
 *     summary: Update an existing Experience
 *     tags: [Seeker Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 4
 *               userId:
 *                 type: integer
 *                 example: 15
 *               experience:
 *                 type: string
 *                 example: "7 years in web development"
 *               company:
 *                 type: string
 *                 example: "Web Solutions Ltd"
 *               year:
 *                 type: integer
 *                 example: 7
 *               months:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Experience updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       400:
 *         description: User cannot have more than 4 experiences.
 *       404:
 *         description: Experience not found.
 *       409:
 *         description: Duplicate experience mapping found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/seeker-experience/{id}:
 *   delete:
 *     summary: Delete an Experience
 *     tags: [Seeker Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: Experience deleted successfully.
 *       404:
 *         description: Experience not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         userId:
 *           type: integer
 *         status:
 *           type: integer
 *         experience:
 *           type: string
 *         company:
 *           type: string
 *         year:
 *           type: integer
 *         months:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: integer
 *         updatedBy:
 *           type: integer
 */