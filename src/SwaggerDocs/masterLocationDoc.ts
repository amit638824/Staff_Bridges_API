/**
 * @swagger
 * tags:
 *   name: Master Country
 *   description: Country master management
 */

/**
 * @swagger
 * /api/master-country:
 *   post:
 *     tags: [Master Country]
 *     summary: Create a new country
 *     description: Add a new country with name, code and status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               status:
 *                 type: integer
 *           example:
 *             name: India
 *             code: IN
 *             status: 1
 *     responses:
 *       201:
 *         description: Country created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Country already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-country:
 *   get:
 *     tags: [Master Country]
 *     summary: Get all countries
 *     description: Fetch list of all countries from master table.
 *     responses:
 *       200:
 *         description: List of countries fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-country/{id}:
 *   get:
 *     tags: [Master Country]
 *     summary: Get country by ID
 *     description: Fetch a single country using ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country fetched successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-country/{id}:
 *   put:
 *     tags: [Master Country]
 *     summary: Update country
 *     description: Update a country fields (name, code, status).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               status:
 *                 type: integer
 *           example:
 *             name: Bharat
 *             code: IN
 *             status: 1
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-country/{id}:
 *   delete:
 *     tags: [Master Country]
 *     summary: Delete a country
 *     description: Remove a country record from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
