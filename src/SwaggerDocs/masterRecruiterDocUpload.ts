/**
 * @swagger
 * tags:
 *   - name: Master Recruiter Document
 *     description: APIs for managing recruiter documents
 */
/**
 * @swagger
 * /api/master-recruiter-document:
 *   post:
 *     tags:
 *       - Master Recruiter Document
 *     summary: Create recruiter document
 *     description: Upload recruiter document with optional image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: PAN Card
 *               description:
 *                 type: string
 *                 example: Recruiter PAN document
 *               status:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 101
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Recruiter document created successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Document already exists
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/master-recruiter-document:
 *   get:
 *     tags:
 *       - Master Recruiter Document
 *     summary: Get recruiter documents
 *     description: Fetch recruiter documents with filters and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: integer
 *         description: Filter documents by Job ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter documents by User ID
 *       - in: query
 *         name: documentName
 *         schema:
 *           type: string
 *         description: Search by document name
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Verification status
 *     responses:
 *       200:
 *         description: Recruiter documents fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/master-recruiter-document/{id}:
 *   put:
 *     tags:
 *       - Master Recruiter Document
 *     summary: Update recruiter document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recruiter document updated successfully
 *       404:
 *         description: Document not found
 */
/**
 * @swagger
 * /api/master-recruiter-document/{id}:
 *   delete:
 *     tags:
 *       - Master Recruiter Document
 *     summary: Delete recruiter document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recruiter document deleted successfully
 *       404:
 *         description: Document not found
 */
