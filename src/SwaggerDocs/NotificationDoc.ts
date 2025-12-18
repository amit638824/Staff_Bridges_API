/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification Management (User-wise / Job-wise)
 */

/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *                 description: ID of the user to whom the notification belongs
 *               jobId:
 *                 type: number
 *                 example: 10
 *                 description: Optional job ID associated with the notification
 *               createdBy:
 *                 type: number
 *                 example: 2
 *                 description: Optional ID of the creator
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Required fields missing
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notification:
 *   get:
 *     summary: Get notification list
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         required: false
 *         example: 1
 *         description: Optional. User ID to fetch notifications for. If not provided, all notifications are returned.
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *         description: Number of notifications per page
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: number
 *           enum: [0, 1]
 *         example: 0
 *         description: Filter by read/unread notifications
 *     responses:
 *       200:
 *         description: Notifications list fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notification/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *         description: Notification ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedBy:
 *                 type: number
 *                 example: 2
 *                 description: ID of the user marking as read
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notification/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 5
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
