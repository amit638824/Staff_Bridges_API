/**
 * @swagger
 * tags:
 *   name: Master Country
 *   description: Country master management
 */

/**
 * @swagger
 * /api/api/master-country:
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
 * /api/api/master-country:
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
 * /api/api/master-country/{id}:
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
 * /api/api/master-country/{id}:
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
 * /api/api/master-country/{id}:
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

/**
 * @swagger
 * /api/master-state:
 *   post:
 *     tags:
 *       - Master State
 *     summary: Create a new state
 *     description: Create a new state under a specific country. Duplicate name or code is not allowed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - countyId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Uttar Pradesh
 *               code:
 *                 type: string
 *                 example: UP
 *               countyId:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: State created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: State already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/master-state:
 *   get:
 *     tags:
 *       - Master State
 *     summary: Get all states by country
 *     description: Returns all states for a specific country. If countryId is not provided, default = 1.
 *     parameters:
 *       - in: query
 *         name: countryId
 *         required: false
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: States fetched successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/master-state/{id}:
 *   get:
 *     tags:
 *       - Master State
 *     summary: Get state by ID
 *     description: Returns a single state with country details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *     responses:
 *       200:
 *         description: State fetched successfully
 *       404:
 *         description: State not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/master-state/{id}:
 *   put:
 *     tags:
 *       - Master State
 *     summary: Update an existing state
 *     description: Update state name, code, country, or status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rajasthan
 *               code:
 *                 type: string
 *                 example: RJ
 *               countyId:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: State updated successfully
 *       404:
 *         description: State not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/master-state/{id}:
 *   delete:
 *     tags:
 *       - Master State
 *     summary: Delete a state
 *     description: Remove a state by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 3
 *     responses:
 *       200:
 *         description: State deleted successfully
 *       404:
 *         description: State not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/master-city:
 *   post:
 *     tags:
 *       - Master City
 *     summary: Create a new city
 *     description: Add a new city under a specific state.
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
 *               stateId:
 *                 type: number
 *               status:
 *                 type: number
 *             required:
 *               - name
 *               - code
 *               - stateId
 *     responses:
 *       201:
 *         description: City created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: City already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-city:
 *   get:
 *     tags:
 *       - Master City
 *     summary: Get all cities
 *     description: Fetch all cities optionally filtered by stateId.
 *     parameters:
 *       - in: query
 *         name: stateId
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter cities by stateId (default = 1)
 *     responses:
 *       200:
 *         description: Cities fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-city/{id}:
 *   get:
 *     tags:
 *       - Master City
 *     summary: Get city by ID
 *     description: Retrieve a single city by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: City fetched successfully
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-city/{id}:
 *   put:
 *     tags:
 *       - Master City
 *     summary: Update city
 *     description: Update an existing city by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
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
 *               stateId:
 *                 type: number
 *               status:
 *                 type: number
 *     responses:
 *       200:
 *         description: City updated successfully
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-city/{id}:
 *   delete:
 *     tags:
 *       - Master City
 *     summary: Delete a city
 *     description: Delete city from database using ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */


