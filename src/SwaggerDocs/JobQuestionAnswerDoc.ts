/* CREATE JOB QUESTION ANSWER */
 /**
 * @swagger
 * /api/job-question-answer:
 *   post:
 *     summary: Create a new Job Question Answer
 *     description: Adds an answer for a specific job question by a user. Duplicate answers for same user + question + category + option are not allowed.
 *     tags: [Job Question Answer]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionId
 *               - userId
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *               questionId:
 *                 type: integer
 *                 example: 2
 *               userId:
 *                 type: integer
 *                 example: 1
 *               optionId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Answer created successfully.
 *       400:
 *         description: Required fields missing.
 *       409:
 *         description: Duplicate answer exists.
 *       500:
 *         description: Internal server error.
 */

/* GET ALL JOB QUESTION ANSWERS */
 /**
 * @swagger
 * /api/job-question-answer:
 *   get:
 *     summary: Get all Job Question Answers
 *     description: Retrieves all answers with optional pagination and filters.
 *     tags: [Job Question Answer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 20
 *       - name: userId
 *         in: query
 *         schema:
 *           type: integer
 *           example: 11
 *       - name: questionId
 *         in: query
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: categoryId
 *         in: query
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: optionId
 *         in: query
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Answers fetched successfully.
 *       500:
 *         description: Internal server error.
 */

/* UPDATE JOB QUESTION ANSWER */
 /**
 * @swagger
 * /api/job-question-answer/{id}:
 *   put:
 *     summary: Update a Job Question Answer
 *     description: Updates an existing answer. Duplicate check prevents multiple answers for same user + question + category + option.
 *     tags: [Job Question Answer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 15
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               questionId:
 *                 type: integer
 *                 example: 5
 *               userId:
 *                 type: integer
 *                 example: 10
 *               optionId:
 *                 type: integer
 *                 example: 3
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Answer updated successfully.
 *       404:
 *         description: Answer not found.
 *       409:
 *         description: Duplicate answer exists.
 *       500:
 *         description: Internal server error.
 */

/* DELETE JOB QUESTION ANSWER */
 /**
 * @swagger
 * /api/job-question-answer/{id}:
 *   delete:
 *     summary: Delete a Job Question Answer
 *     description: Deletes an answer from the system.
 *     tags: [Job Question Answer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 15
 *     responses:
 *       200:
 *         description: Answer deleted successfully.
 *       404:
 *         description: Answer not found.
 *       500:
 *         description: Internal server error.
 */
