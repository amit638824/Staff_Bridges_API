/**
 * @swagger
 * tags:
 *   - name: Master Assets Required
 *     description: APIs for managing master assets required
 */

/**
 * @swagger
 * /api/master-assets-required:
 *   post:
 *     tags: [Master Assets Required]
 *     summary: Create master asset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop
 *               description:
 *                 type: string
 *                 example: Company provided laptop
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201: { description: Asset created }
 *       409: { description: Asset already exists }
 */

/**
 * @swagger
 * /api/master-assets-required:
 *   get:
 *     tags: [Master Assets Required]
 *     summary: Get all master assets
 *     responses:
 *       200: { description: Assets fetched }
 */

/**
 * @swagger
 * /api/master-assets-required/{id}:
 *   put:
 *     tags: [Master Assets Required]
 *     summary: Update master asset
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Asset updated }
 *       404: { description: Asset not found }
 */

/**
 * @swagger
 * /api/master-assets-required/{id}:
 *   delete:
 *     tags: [Master Assets Required]
 *     summary: Delete master asset
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Asset deleted }
 */
