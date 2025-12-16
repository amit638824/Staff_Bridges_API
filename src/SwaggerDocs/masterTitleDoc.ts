/**
 * @swagger
 * tags:
 *   - name: Master Job Title
 *     description: APIs for managing master job titles
 */
/**
 * @swagger
 * /api/master-job-title:
 *   post:
 *     tags:
 *       - Master Job Title
 *     summary: Create a new job title
 *     description: Adds a new job title to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Software Engineer
 *               description:
 *                 type: string
 *                 example: Responsible for software development
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Job title created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Job title already exists
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-job-title:
 *   get:
 *     tags:
 *       - Master Job Title
 *     summary: Get all job titles
 *     description: Returns job titles with optional filters and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Records per page
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by job title ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by job title name (partial match) 
 *     responses:
 *       200:
 *         description: Job titles fetched successfully
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
 *                       description:
 *                         type: string
 *                       status:
 *                         type: integer
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-job-title/{id}:
 *   put:
 *     tags:
 *       - Master Job Title
 *     summary: Update a job title
 *     description: Updates an existing job title by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Senior Software Engineer
 *               description:
 *                 type: string
 *                 example: Handles senior-level responsibilities
 *               status:
 *                 type: integer
 *                 enum: [0,1]
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Job title updated successfully
 *       404:
 *         description: Job title not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-job-title/{id}:
 *   delete:
 *     tags:
 *       - Master Job Title
 *     summary: Delete a job title
 *     description: Deletes a job title by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Job title deleted successfully
 *       404:
 *         description: Job title not found
 *       500:
 *         description: Internal server error
 */
