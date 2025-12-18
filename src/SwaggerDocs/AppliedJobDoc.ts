/**
 * @swagger
 * tags:
 *   name: Recruiter Apply Job
 *   description: Recruiter job application management
 */
/**
 * @swagger
 * /api/recruiter-apply-job:
 *   post:
 *     summary: Apply for a job by recruiter/user
 *     tags: [Recruiter Apply Job]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *               - userId
 *               - reqruiterId
 *             properties:
 *               jobId:
 *                 type: number
 *                 example: 101
 *               userId:
 *                 type: number
 *                 example: 12
 *               reqruiterId:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Job applied successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Already applied for this job
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/recruiter-apply-job:
 *   get:
 *     summary: Get applied job list with filters & pagination
 *     tags: [Recruiter Apply Job]
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
 *         name: jobId
 *         schema:
 *           type: number
 *         example: 101
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         example: 12
 *       - in: query
 *         name: reqruiterId
 *         schema:
 *           type: number
 *         example: 5
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *           enum: [0, 1, 2]
 *         example: 0
 *     responses:
 *       200:
 *         description: Applied jobs fetched successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/recruiter-apply-job/{id}:
 *   put:
 *     summary: Update applied job status
 *     tags: [Recruiter Apply Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: number
 *                 enum: [0, 1, 2]
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Applied job updated successfully
 *       404:
 *         description: Applied job not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/recruiter-apply-job/{id}:
 *   delete:
 *     summary: Delete applied job
 *     tags: [Recruiter Apply Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Applied job deleted successfully
 *       404:
 *         description: Applied job not found
 *       500:
 *         description: Internal server error
 */
