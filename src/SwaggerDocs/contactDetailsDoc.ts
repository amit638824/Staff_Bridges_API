/**
 * @swagger
 * tags:
 *   - name: Contact Us
 *     description: APIs related to Contact Us module
 */


/* ----------------------- CREATE CONTACT-US ----------------------- */
/**
 * @swagger
 * /auth/contact-us:
 *   post:
 *     summary: Create a new Contact Us record
 *     description: Inserts a new Contact Us form submission into the database.
 *     tags: [Contact Us]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: "9998313322"
 *               message:
 *                 type: string
 *                 example: I have a question about your services.
 *               subject:
 *                 type: string
 *                 example: Inquiry
 *     responses:
 *       201:
 *         description: Contact Us record created successfully.
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *       500:
 *         description: Internal server error.
 */


/* ----------------------- UPDATE CONTACT-US ----------------------- */
/**
 * @swagger
 * /auth/contact-us/{id}:
 *   put:
 *     summary: Update a Contact Us record
 *     description: Updates a Contact Us record by its unique ID.
 *     tags: [Contact Us]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Contact Us record ID for update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact Us record updated successfully.
 *       400:
 *         description: Bad request or invalid input.
 *       404:
 *         description: Record not found.
 *       500:
 *         description: Internal server error.
 */


/* ----------------------- GET CONTACT-US LIST ----------------------- */
/**
 * @swagger
 * /auth/contact-us:
 *   get:
 *     summary: Get list of Contact Us records (with filters & pagination)
 *     description: Retrieves paginated Contact Us records from the database.
 *     tags: [Contact Us]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - name: email
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by email address
 *       - name: message
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by message keyword
 *     responses:
 *       200:
 *         description: List of Contact Us records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       message:
 *                         type: string
 *                       subject:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */


/* ----------------------- DELETE CONTACT-US ----------------------- */
/**
 * @swagger
 * /auth/contact-us/{id}:
 *   delete:
 *     summary: Delete a Contact Us record
 *     description: Deletes a Contact Us record using its ID.
 *     tags: [Contact Us]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Contact Us record ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted successfully.
 *       404:
 *         description: Record not found.
 *       500:
 *         description: Internal server error.
 */
