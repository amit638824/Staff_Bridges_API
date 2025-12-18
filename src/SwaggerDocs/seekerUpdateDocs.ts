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
 *       **Education options:** Any, highschool, intermediate, diploma, graduate, postgraduate
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
 *                 example: Female
 *               experinced:
 *                 type: integer
 *                 enum: [0, 1]
 *                 example: 1
 *               salary:
 *                 type: number
 *                 example: 45000
 *               education:
 *                 type: string
 *                 enum:
 *                   - Any
 *                   - highschool
 *                   - intermediate
 *                   - diploma
 *                   - graduate
 *                   - postgraduate
 *                 example: graduate
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Invalid input or missing required fields.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /auth/user-profile-update-aditional:
 *   put:
 *     tags:
 *       - Profile Update
 *     summary: Update additional profile details of user
 *     description: |
 *       This API updates **only the following optional fields**:
 *       - Salary
 *       - Email
 *       - Age
 *       - Alternate Mobile Number
 *       - Gender
 *       - Education
 *
 *       👉 Only the fields provided in request will be updated.  
 *       👉 Other user fields will remain unchanged.
 *
 *       **Gender options:** Male, Female, Other  
 *       **Education options:** Any, highschool, intermediate, diploma, graduate, postgraduate
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
 *               salary:
 *                 type: string
 *                 example: "45000"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "sheetal.sharma@gmail.com"
 *               age:
 *                 type: integer
 *                 example: 28
 *               alternateMobile:
 *                 type: string
 *                 example: "9876543211"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: Female
 *               education:
 *                 type: string
 *                 enum:
 *                   - Any
 *                   - highschool
 *                   - intermediate
 *                   - diploma
 *                   - graduate
 *                   - postgraduate
 *                 example: postgraduate
 *     responses:
 *       200:
 *         description: Additional profile details updated successfully.
 *       400:
 *         description: User ID is required or invalid input value.
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
/**
 * @swagger
 * /auth/user-info:
 *   get:
 *     tags:
 *       - User Profile
 *     summary: Get user profile information
 *     description: |
 *       This API fetches **complete user profile details** along with role information.
 *
 *       👉 User ID query parameter me dena mandatory hai  
 *       👉 User table ka **poora data + role id & roleName** return hota hai
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile fetched successfully
 *                 data: 
 *                       type: object
 *                       description: User table raw data with role details
 *                       example:
 *                         id: 1
 *                         name: Amit Chauhan
 *                         email: amit@gmail.com
 *                         mobile: 9876543210
 *                         RoleId: 2
 *                         roletbl_id: 2
 *                         roletbl_roleName: Admin
 *       400:
 *         description: User id is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
