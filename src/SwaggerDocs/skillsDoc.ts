/**
 * @swagger
 * tags:
 *   name: Recruiter Skills
 *   description: Recruiter Skill Management (Job-wise / User-wise)
 */

/**
 * @swagger
 * /api/recruiter-skills:
 *   post:
 *     summary: Add recruiter skill
 *     tags: [Recruiter Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documentId
 *               - userId
 *             properties:
 *               documentId:
 *                 type: number
 *                 example: 1
 *                 description: Master Skill ID
 *               userId:
 *                 type: number
 *                 example: 1
 *               jobId:
 *                 type: number
 *                 example: 1 
 *     responses:
 *       201:
 *         description: Skill added successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Skill already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-skills:
 *   get:
 *     summary: Get recruiter skills list with filters & pagination
 *     tags: [Recruiter Skills]
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
 *         name: userId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: documentId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query 
 *       - in: query
 *         name: skillName
 *         schema:
 *           type: string
 *         example: React
 *     responses:
 *       200:
 *         description: Skills list fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-skills/{id}:
 *   put:
 *     summary: Update recruiter skill or verification status
 *     tags: [Recruiter Skills]
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
 *               documentId:
 *                 type: number
 *                 example: 4
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
 *                 example: 2
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       404:
 *         description: Skill not found
 *       409:
 *         description: Duplicate skill mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-skills/{id}:
 *   delete:
 *     summary: Delete recruiter skill
 *     tags: [Recruiter Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       404:
 *         description: Skill not found
 *       500:
 *         description: Internal server error
 */
