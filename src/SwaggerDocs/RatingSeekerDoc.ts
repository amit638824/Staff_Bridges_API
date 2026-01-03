
/**
 * @swagger
 * tags:
 *   name: RateUs
 *   description: User rating & feedback management
 */
/**
 * @swagger
 * /auth/rate-us:
 *   post:
 *     summary: Submit a rating and feedback
 *     tags: [RateUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - rating
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 12
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4.5
 *               description:
 *                 type: string
 *                 example: "Very good experience"
 *               status:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               createdBy:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: Rating submitted successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/rate-us:
 *   get:
 *     summary: Get all ratings with filters and pagination
 *     tags: [RateUs]
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
 *         name: userId
 *         schema:
 *           type: number
 *         example: 12
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         example: 5
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *           enum: [0, 1]
 *         example: 1
 *     responses:
 *       200:
 *         description: Ratings fetched successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/rate-us/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [RateUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: "Updated feedback"
 *               status:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/rate-us/{id}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [RateUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Internal server error
 */
