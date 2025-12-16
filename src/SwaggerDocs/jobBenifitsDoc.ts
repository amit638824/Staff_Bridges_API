/**
 * @swagger
 * tags:
 *   name: Recruiter Job Benefit
 *   description: Recruiter Job-wise Benefit Management
 */

/**
 * @swagger
 * /api/recruiter-job-benifit:
 *   post:
 *     summary: Add recruiter job benefit
 *     tags: [Recruiter Job Benefit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - benifitId
 *               - userId
 *             properties:
 *               benifitId:
 *                 type: number
 *                 example: 1
 *                 description: Master Job Benefit ID
 *               userId:
 *                 type: number
 *                 example: 1
 *               jobId:
 *                 type: number
 *                 example: 1 
 *     responses:
 *       201:
 *         description: Job benefit added successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Job benefit already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-job-benifit:
 *   get:
 *     summary: Get recruiter job benefits list
 *     tags: [Recruiter Job Benefit]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: benifitId
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: number
 *           example: 1 
 *       - in: query
 *         name: benifitName
 *         schema:
 *           type: string
 *           example: Free Lunch
 *     responses:
 *       200:
 *         description: Job benefits fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-job-benifit/{id}:
 *   put:
 *     summary: Update recruiter job benefit or verification status
 *     tags: [Recruiter Job Benefit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               benifitId:
 *                 type: number
 *                 example: 4
 *               userId:
 *                 type: number
 *                 example: 10
 *               jobId:
 *                 type: number
 *                 example: 100
 *               isVerified:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Job benefit updated successfully
 *       404:
 *         description: Job benefit not found
 *       409:
 *         description: Duplicate job benefit mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-job-benifit/{id}:
 *   delete:
 *     summary: Delete recruiter job benefit
 *     tags: [Recruiter Job Benefit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 5
 *     responses:
 *       200:
 *         description: Job benefit deleted successfully
 *       404:
 *         description: Job benefit not found
 *       500:
 *         description: Internal server error
 */
