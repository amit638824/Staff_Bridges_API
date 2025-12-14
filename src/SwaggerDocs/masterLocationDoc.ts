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
 * /api/master-country:
 *   get:
 *     tags:
 *       - Master Country
 *     summary: Get all countries with filters and pagination
 *     description: Returns list of countries with optional filters and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by country ID (exact match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by country name (partial, case-insensitive)
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Filter by country code (partial, case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0,1]
 *         description: Filter by status (0 = inactive, 1 = active)
 *     responses:
 *       200:
 *         description: List of countries fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalRecords:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       status:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
 *     summary: Get all states with filters and pagination
 *     description: Returns list of states with optional filters and pagination. Default countryId = 1 if not provided.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Filter states by country ID
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by state ID (exact match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by state name (partial, case-insensitive)
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Filter by state code (partial, case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0,1]
 *         description: Filter by status (0 = inactive, 1 = active)
 *     responses:
 *       200:
 *         description: States fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalRecords:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       countyId:
 *                         type: integer
 *                       status:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
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
 *     summary: Get all cities with filters and pagination
 *     description: Returns list of cities with optional filters and pagination. Default stateId = 1 if not provided.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: stateId
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Filter cities by state ID
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by city ID (exact match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by city name (partial, case-insensitive)
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Filter by city code (partial, case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0,1]
 *         description: Filter by status (0 = inactive, 1 = active)
 *     responses:
 *       200:
 *         description: Cities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalRecords:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       stateId:
 *                         type: integer
 *                       status:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
/**
 * @swagger
 * /api/master-locality:
 *   post:
 *     tags: [Master Locality]
 *     summary: Create a new locality
 *     description: Add a new locality under a specific city.
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
 *               cityId:
 *                 type: number
 *               status:
 *                 type: number
 *             required:
 *               - name
 *               - code
 *               - cityId
 *     responses:
 *       201:
 *         description: Locality created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Locality already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-locality:
 *   get:
 *     tags: [Master Locality]
 *     summary: Get all localities with filters and pagination
 *     description: Returns list of localities filtered by cityId, name, code, status, etc.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Records per page
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: integer
 *         description: Filter by city ID
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by locality ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name (partial match)
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Filter by locality code (partial match)
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: Localities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalRecords:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       cityId:
 *                         type: integer
 *                       status:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-locality/{id}:
 *   put:
 *     tags: [Master Locality]
 *     summary: Update locality
 *     description: Update an existing locality by ID.
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
 *               cityId:
 *                 type: number
 *               status:
 *                 type: number
 *     responses:
 *       200:
 *         description: Locality updated successfully
 *       404:
 *         description: Locality not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-locality/{id}:
 *   delete:
 *     tags: [Master Locality]
 *     summary: Delete locality
 *     description: Remove locality from database using ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Locality deleted successfully
 *       404:
 *         description: Locality not found
 *       500:
 *         description: Internal server error
 */
