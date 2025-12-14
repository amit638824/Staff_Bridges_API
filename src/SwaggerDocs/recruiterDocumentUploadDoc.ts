 /**
 * @swagger
 * tags:
 *   name: Recruiter Documents
 *   description: Recruiter Document Upload & Verification Management
 */

/**
 * @swagger
 * /api/recruiter-document-upload:
 *   post:
 *     summary: Upload a recruiter document (User + Document Mapping)
 *     tags: [Recruiter Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - documentId
 *               - userId
 *             properties:
 *               documentId:
 *                 type: number
 *                 example: 1
 *               userId:
 *                 type: number
 *                 example: 1
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Recruiter document file (PDF/JPG/PNG)
 *               createdBy:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Recruiter document uploaded successfully
 *       400:
 *         description: Required fields missing
 *       409:
 *         description: Document already uploaded for this user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-document-upload:
 *   get:
 *     summary: Get recruiter documents with filters & pagination
 *     tags: [Recruiter Documents]
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
 *         example: 1
 *       - in: query
 *         name: documentId
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         example: 1  
 *     responses:
 *       200:
 *         description: Recruiter documents fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-document-upload/{id}:
 *   put:
 *     summary: Update recruiter document details or verification status
 *     tags: [Recruiter Documents]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: number
 *                 example: 1
 *               userId:
 *                 type: number
 *                 example: 1
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Upload new document (optional)
 *               isVerified:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               updatedBy:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Recruiter document updated successfully
 *       404:
 *         description: Recruiter document not found
 *       409:
 *         description: Duplicate document mapping found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-document-upload/{id}:
 *   delete:
 *     summary: Delete recruiter document
 *     tags: [Recruiter Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 12
 *     responses:
 *       200:
 *         description: Recruiter document deleted successfully
 *       404:
 *         description: Recruiter document not found
 *       500:
 *         description: Internal server error
 */
