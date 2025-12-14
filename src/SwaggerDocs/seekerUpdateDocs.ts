 /**
 * @swagger
 * /auth/user-profile-update-basicinfo:
 *   put:
 *     tags:
 *       - Profile Update 
 *     summary: Update basic profile information of user (Seeker/Recruiter)
 *     description: |
 *       Update full name, gender, salary, experience status, and education of a user.
 *
 *       **Gender options:** Male, Female, Other  
 *       **Experinced options:** 1 (Yes), 0 (No)
 *
 *       You must choose one of the allowed values.
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
 *                 example: 1
 *               fullName:
 *                 type: string
 *                 example: "Sheetal Sharma"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: Male
 *               experinced:
 *                 type: integer
 *                 enum: [0, 1]
 *                 example: 1
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
/**
 * @swagger
 * /auth/user-profile-update-pic-mobile:
 *   put:
 *     tags:
 *       - Profile Update
 *     summary: Update user profile picture, resume, and contact details
 *     description: |
 *       This API allows users to update:
 *       - Full Name
 *       - Mobile Number
 *       - Locality
 *       - Profile Picture (Image file)
 *       - Resume (PDF/DOC file)
 *
 *       The request must be sent as **multipart/form-data**.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2 
 *               fullName:
 *                 type: string
 *                 example: "Sheetal Sharma"
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               locality:
 *                 type: string
 *                 example: "Noida Sector 62"
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile picture (jpg, png)
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Upload resume (pdf, doc, docx)
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: PROFILE_UPDATED
 *               data:
 *                 id: 45
 *                 fullName: "Sheetal Sharma"
 *                 mobile: "9876543210"
 *                 locality: "Noida Sector 62"
 *                 profilePic: "https://s3.amazonaws.com/profile-pics/user45.jpg"
 *                 resume: "https://s3.amazonaws.com/resumes/user45.pdf"
 *                 updatedAt: "2025-12-14T10:30:00.000Z"
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /auth/user-profile-update-location:
 *   put:
 *     tags:
 *       - Profile Update
 *     summary: Update user location details
 *     description: |
 *       This API updates user's location information:
 *       - Country
 *       - State
 *       - City
 *       - Locality
 *       - Latitude & Longitude
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
 *                 example: 2
 *               countryId:
 *                 type: integer
 *                 example: 1
 *               stateId:
 *                 type: integer
 *                 example: 10
 *               city:
 *                 type: string
 *                 example: "Noida"
 *               locality:
 *                 type: string
 *                 example: "Sector 62"
 *               latitude:
 *                 type: number
 *                 example: 28.6139
 *               longitude:
 *                 type: number
 *                 example: 77.2090
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Location updated successfully"
 *               data:
 *                 id: 2
 *                 countryId: 1
 *                 stateId: 10
 *                 city: "Noida"
 *                 locality: "Sector 62"
 *                 latitude: 28.6139
 *                 longitude: 77.2090
 *                 updatedAt: "2025-12-14T10:30:00.000Z"
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
