/**
 * @swagger
 * tags:
 *   - name: Master Questions
 *     description: APIs for managing Master Questions (category-wise questions)
 */

/* -------------------------------------------------------------------------- */
/*                          CREATE MASTER QUESTION                            */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-questions:
 *   post:
 *     summary: Create a new Question
 *     description: Adds a new question inside MasterQuestions table.
 *     tags: [Master Questions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - description
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *               description:
 *                 type: string
 *                 example: Do You have bike.
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Question created successfully.
 *       400:
 *         description: Required fields missing.
 *       500:
 *         description: Internal server error.
 */
/* -------------------------------------------------------------------------- */
/*                      GET ALL QUESTIONS (FILTERS + PAGINATION)              */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-questions:
 *   get:
 *     summary: Get all questions with filters and pagination
 *     description: Retrieves paginated questions with optional filtering.
 *     tags: [Master Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: categoryId
 *         in: query
 *         description: Filter questions by categoryId
 *         schema:
 *           type: integer
 *           example: 2 
 *     responses:
 *       200:
 *         description: Questions list fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalRecords:
 *                   type: integer
 *                   example: 50
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       categoryId:
 *                         type: integer
 *                         example: 2
 *                       description:
 *                         type: string
 *                         example: "Do you have a bike?"
 *                       status:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-10T08:30:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-10T08:30:00Z"
 *       500:
 *         description: Internal server error.
 */

/* -------------------------------------------------------------------------- */
/*                        UPDATE MASTER QUESTION                              */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-questions/{id}:
 *   put:
 *     summary: Update a Question
 *     description: Updates an existing question by ID.
 *     tags: [Master Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Question ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *               description:
 *                 type: string
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Question updated successfully.
 *       404:
 *         description: Question not found.
 *       500:
 *         description: Internal server error.
 */

/* -------------------------------------------------------------------------- */
/*                         DELETE QUESTION                                    */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     description: Deletes a question from database using its ID.
 *     tags: [Master Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Question ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question deleted successfully.
 *       404:
 *         description: Question not found.
 *       500:
 *         description: Internal server error.
 */
/* -------------------------------------------------------------------------- */
/*                CREATE MASTER QUESTION OPTION — SWAGGER DOC                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-options:
 *   post:
 *     summary: Create a new Question Option
 *     description: Adds an option for a specific question.
 *     tags: [Master Options]
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
 *               - optionText
 *             properties:
 *               questionId:
 *                 type: integer
 *                 example: 1
 *               optionText:
 *                 type: string
 *                 example: Yes
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Option created successfully.
 *       400:
 *         description: Required field missing.
 *       409:
 *         description: Duplicate option exists.
 *       500:
 *         description: Internal server error.
 */

/* -------------------------------------------------------------------------- */
/*                GET ALL QUESTION OPTIONS (FILTER + PAGINATION)             */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-options:
 *   get:
 *     summary: Get all Question Options
 *     description: Retrieves all options with pagination and filters.
 *     tags: [Master Options]
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
 *       - name: questionId
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1 
 *     responses:
 *       200:
 *         description: Options fetched successfully.
 *       500:
 *         description: Internal server error.
 */

/* -------------------------------------------------------------------------- */
/*                        UPDATE MASTER QUESTION OPTION                       */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-options/{id}:
 *   put:
 *     summary: Update a Question Option
 *     description: Updates an option inside MasterQuestionOptions table.
 *     tags: [Master Options]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: integer
 *               optionText:
 *                 type: string
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Option updated successfully.
 *       404:
 *         description: Option not found.
 *       409:
 *         description: Duplicate option exists.
 *       500:
 *         description: Internal server error.
 */

/* -------------------------------------------------------------------------- */
/*                        DELETE MASTER QUESTION OPTION                       */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/master-options/{id}:
 *   delete:
 *     summary: Delete a Question Option
 *     description: Deletes an option from MasterQuestionOptions.
 *     tags: [Master Options]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Option deleted successfully.
 *       404:
 *         description: Option not found.
 *       500:
 *         description: Internal server error.
 */
