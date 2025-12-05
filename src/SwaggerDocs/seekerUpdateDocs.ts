/**
 * @swagger
 * tags:
 *   name: Registration & OTP
 *   description: APIs for Seeker and Recruiter mobile-based registration and OTP verification
 */
/**
 * @swagger
 * /auth/user-profile-update-basicinfo:
 *   put:
 *     tags:
 *       - Profile Update
 *     summary: Update basic profile information of user (Seeker/Recruiter)
 *     description: |
 *       Update full name, gender, salary, and education of a user.
 *
 *       **Gender options:** Male, Female, Other
 *
 *       You must choose one of the allowed gender values.
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
 *                 type: integer
 *                 example: 45
 *               fullName:
 *                 type: string
 *                 example: "Sheetal Sharma"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: Male
 *               salary:
 *                 type: number
 *                 example: 45000
 *               education:
 *                 type: string
 *                 example: "B.Tech"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Missing required fields.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */



 
