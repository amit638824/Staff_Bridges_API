/**
 * @swagger
 * tags:
 *   - name: Master Category
 *     description: APIs for managing master categories
 */

/**
 * @swagger
 * /api/master-category:
 *   post:
 *     tags:
 *       - Master Category
 *     summary: Create a new master category
 *     description: Adds a new category to the system.
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
 *                 example: Information Technology
 *               description:
 *                 type: string
 *                 example: All IT related fields
 *               status:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Required fields missing
 *       500:
 *         description: Internal server error
 */ 
/**
 * @swagger
 * /api/master-category:
 *   get:
 *     tags:
 *       - Master Category
 *     summary: Get all categories
 *     description: Returns list of all master categories.
 *     responses:
 *       200:
 *         description: Successfully fetched categories
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-category/{id}:
 *   get:
 *     tags:
 *       - Master Category
 *     summary: Get category details by ID
 *     description: Fetch a single master category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-category/{id}:
 *   put:
 *     tags:
 *       - Master Category
 *     summary: Update an existing category
 *     description: Updates category fields by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *               status:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-category/{id}:
 *   delete:
 *     tags:
 *       - Master Category
 *     summary: Delete a category
 *     description: Removes a master category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
