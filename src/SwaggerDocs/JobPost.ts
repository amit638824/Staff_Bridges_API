/**
 * @swagger
 * tags:
 *   - name: Recruiter Job Post
 *     description: Manage recruiter job postings (create, update, list, delete)
 *   - name: Recruiter Assets Required
 *     description: Manage recruiter required assets for jobs
 */

/**
 * @swagger
 * /api/recruiter-jobpost-create:
 *   post:
 *     summary: Create a recruiter job post
 *     tags: [Recruiter Job Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterId:
 *                 type: number
 *                 example: 1
 *               titleId:
 *                 type: number
 *                 example: 10
 *               categoryId:
 *                 type: number
 *                 example: 5
 *               jobType:
 *                 type: string
 *                 enum: ["Full-time","Part-time","Contract"]
 *               workLocation:
 *                 type: string
 *                 enum: ["Office","Field","WorkFromHome"]
 *               cityId:
 *                 type: number
 *                 example: 1
 *               localityId:
 *                 type: number
 *                 example: 2
 *               salaryMin:
 *                 type: number
 *                 example: 10000
 *               salaryMax:
 *                 type: number
 *                 example: 20000
 *               jobSkillsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               assetsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               documetnsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               jobBenitsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Recruiter job created successfully
 *       409:
 *         description: Duplicate job already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-jobpost-list:
 *   get:
 *     summary: Get list of recruiter job posts
 *     tags: [Recruiter Job Post]
 *     responses:
 *       200:
 *         description: List of recruiter jobs
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-jobpost-detail/{id}:
 *   get:
 *     summary: Get recruiter job post detail
 *     tags: [Recruiter Job Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Recruiter job details
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-jobpost-update/{id}:
 *   put:
 *     summary: Update recruiter job post
 *     tags: [Recruiter Job Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleId:
 *                 type: number
 *                 example: 10
 *               categoryId:
 *                 type: number
 *                 example: 5
 *               salaryMin:
 *                 type: number
 *                 example: 12000
 *               salaryMax:
 *                 type: number
 *                 example: 22000
 *     responses:
 *       200:
 *         description: Recruiter job updated successfully
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-jobpost-delete/{id}:
 *   delete:
 *     summary: Delete recruiter job post
 *     tags: [Recruiter Job Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Recruiter job deleted successfully
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */