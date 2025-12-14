/**
 * @swagger
 * tags:
 *   - name: Master Skills
 *     description: APIs for managing master skills
 */

/**
 * @swagger
 * /api/master-skills:
 *   post:
 *     tags:
 *       - Master Skills
 *     summary: Create a new master skill
 *     description: Creates a new master skill if it does not already exist.
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
 *                 example: JavaScript
 *               description:
 *                 type: string
 *                 example: Programming language for web development
 *               status:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Master skill created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Master skill already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-skills:
 *   get:
 *     tags:
 *       - Master Skills
 *     summary: Get all master skills
 *     description: Returns paginated list of master skills with optional filters.
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
 *         description: Number of records per page
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by skill ID (exact match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by skill name (partial, case-insensitive)
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filter by description (partial, case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filter by status (0 = inactive, 1 = active)
 *     responses:
 *       200:
 *         description: Master skills fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalRecords:
 *                   type: integer
 *                   example: 25
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: JavaScript
 *                       description:
 *                         type: string
 *                         example: Web programming language
 *                       status:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-skills/{id}:
 *   put:
 *     tags:
 *       - Master Skills
 *     summary: Update a master skill
 *     description: Updates master skill details by ID.
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
 *                 example: Advanced JavaScript
 *               description:
 *                 type: string
 *                 example: Updated description
 *               status:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Master skill updated successfully
 *       404:
 *         description: Master skill not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-skills/{id}:
 *   delete:
 *     tags:
 *       - Master Skills
 *     summary: Delete a master skill
 *     description: Deletes a master skill by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 4
 *     responses:
 *       200:
 *         description: Master skill deleted successfully
 *       404:
 *         description: Master skill not found
 *       500:
 *         description: Internal server error
 */
