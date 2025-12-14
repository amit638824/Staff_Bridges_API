/**
 * @swagger
 * tags:
 *   - name: Master Job Benefits
 *     description: APIs for managing master job benefits
 */

/**
 * @swagger
 * /api/master-job-benifits:
 *   post:
 *     tags:
 *       - Master Job Benefits
 *     summary: Create job benefit
 *     description: Creates a new job benefit if it does not already exist.
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
 *                 example: Health Insurance
 *               description:
 *                 type: string
 *                 example: Medical and health insurance coverage
 *               status:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Job benefit created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Job benefit already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-job-benifits:
 *   get:
 *     tags:
 *       - Master Job Benefits
 *     summary: Get job benefits
 *     description: Fetch job benefits with pagination and optional filters.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *     responses:
 *       200:
 *         description: Job benefits fetched successfully
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
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-job-benifits/{id}:
 *   put:
 *     tags:
 *       - Master Job Benefits
 *     summary: Update job benefit
 *     description: Update an existing job benefit by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Job benefit updated successfully
 *       404:
 *         description: Job benefit not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-job-benifits/{id}:
 *   delete:
 *     tags:
 *       - Master Job Benefits
 *     summary: Delete job benefit
 *     description: Delete a job benefit by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job benefit deleted successfully
 *       404:
 *         description: Job benefit not found
 *       500:
 *         description: Internal server error
 */
