/**
 * @swagger
 * tags:
 *   name: Registration & OTP
 *   description: APIs for Seeker and Recruiter mobile-based registration and OTP verification
 */


/* ============================= SEEKER REGISTRATION ============================= */
/**
 * @swagger
 * /auth/seeker-register-mobile:
 *   post:
 *     summary: Register Seeker using mobile number (OTP generated)
 *     tags: [Registration & OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile]
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: Valid mobile number
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Seeker registered or already exists, OTP sent
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Registration successful, OTP sent"
 *               data:
 *                 mobile: "9876543210"
 *                 Otp: "123456"
 *                 newUser: true
 *       400:
 *         description: Mobile not provided
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/seeker-register-otp-verify:
 *   post:
 *     summary: Verify OTP for Seeker registration
 *     tags: [Registration & OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile, otp]
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "OTP verified successfully"
 *               data:
 *                 userId: 24
 *                 loginToken: "randomStringTokenHere"
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: User or login record not found
 *       500:
 *         description: Internal server error
 */



/* ============================= RECRUITER REGISTRATION ============================= */
/**
 * @swagger
 * /auth/recruiter-register-mobile:
 *   post:
 *     summary: Register Recruiter using mobile number (OTP generated)
 *     tags: [Registration & OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile]
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: Recruiter mobile number
 *                 example: "9876543211"
 *     responses:
 *       200:
 *         description: Recruiter registered or already exists, OTP sent
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Recruiter registration successful, OTP sent"
 *               data:
 *                 mobile: "9876543211"
 *                 Otp: "123456"
 *                 newUser: true
 *       400:
 *         description: Mobile number not given
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/recruiter-register-otp-verify:
 *   post:
 *     summary: Verify OTP for Recruiter registration
 *     tags: [Registration & OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile, otp]
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543211"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Recruiter OTP verified successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Recruiter OTP verified successfully"
 *               data:
 *                 userId: 32
 *                 loginToken: "randomStringTokenHere"
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: Recruiter or login record not found
 *       500:
 *         description: Internal server error
 */
