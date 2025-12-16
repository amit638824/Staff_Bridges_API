/**
 * @swagger
 * tags:
 *   name: Recruiter Assets Required
 *   description: Recruiter Asset Requirement Management (Job-wise)
 */

/**
 * @swagger
 * /api/recruiter-assets-required:
 *   post:
 *     summary: Add required asset for recruiter job
 *     tags: [Recruiter Assets Required]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assetId
 *               - userId
 *               - jobId
 *             properties:
 *               assetId:
 *                 type: number
 *                 example: 1
 *               userId:
 *                 type: number
 *                 example: 1
 *               jobId:
 *                 type: number
 *                 example: 1 
 *     responses:
 *       201:
 *         description: Asset requirement added successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Asset already added for this job
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-assets-required:
 *   get:
 *     summary: Get recruiter required assets list with filters & pagination
 *     tags: [Recruiter Assets Required]
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
 *         example: 1
 *       - in: query
 *         name: assetId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: number
 *         example: 1  
 *       - in: query
 *         name: assetName
 *         schema:
 *           type: string
 *         example: Laptop
 *     responses:
 *       200:
 *         description: Assets list fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-assets-required/{id}:
 *   put:
 *     summary: Update recruiter required asset or verification status
 *     tags: [Recruiter Assets Required]
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
 *               assetId:
 *                 type: number
 *                 example: 3
 *               userId:
 *                 type: number
 *                 example: 10
 *               jobId:
 *                 type: number
 *                 example: 101
 *               isVerified:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Asset requirement updated successfully
 *       404:
 *         description: Asset requirement not found
 *       409:
 *         description: Duplicate asset mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-assets-required/{id}:
 *   delete:
 *     summary: Delete recruiter required asset
 *     tags: [Recruiter Assets Required]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *     responses:
 *       200:
 *         description: Asset requirement deleted successfully
 *       404:
 *         description: Asset requirement not found
 *       500:
 *         description: Internal server error
 */
