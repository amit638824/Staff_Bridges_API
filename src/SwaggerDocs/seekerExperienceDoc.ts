/**
 * @swagger
 * tags:
 *   name: Seeker Experience
 *   description: User Experience Management (User + Category Mapping)
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
 *                 type: number
 *                 example: 3
 *               userId:
 *                 type: number
 *                 example: 15
 *               experience:
 *                 type: string
 *                 example: "5 years in UI/UX"
 *               status:
 *                 type: number
 *                 default: 1
 *                 example: 1
 *               createdBy:
 *                 type: number
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: experience
 *         schema:
 *           type: string
 *         example: "UI"
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *         example: "Design"
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         example: "Amit"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: Experiences fetched successfully.
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
 *                 example: 4
 *               userId:
 *                 type: number
 *                 example: 15
 *               experience:
 *                 type: string
 *                 example: "7 years in web development"
 *               status:
 *                 type: number
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Experience updated successfully.
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
 *           type: number
 *         example: 12
 *     responses:
 *       200:
 *         description: Experience deleted successfully.
 *       404:
 *         description: Experience not found.
 *       500:
 *         description: Internal server error.
 */
