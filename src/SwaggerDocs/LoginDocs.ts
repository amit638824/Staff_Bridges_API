/**
 * @swagger
 * tags:
 *   - name: Login & Authentication
 *     description: User login, OTP, password reset and social login APIs
 */

/* ----------------------- SEND OTP (MOBILE) ----------------------- */
/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP for mobile login
 *     tags: [Login & Authentication]
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
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "OTP sent successfully"
 *               data:
 *                 mobile: "9876543210"
 *                 otp: "123456"
 *       400:
 *         description: Mobile number required
 */

/* ----------------------- MOBILE LOGIN (OTP VERIFY) ----------------------- */
/**
 * @swagger
 * /auth/mobile-login:
 *   post:
 *     summary: Login using mobile number and OTP
 *     tags: [Login & Authentication]
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
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Login Successful"
 *               data:
 *                 token: "jwt_token_here"
 *                 user:
 *                   id: 1
 *                   fullName: "Amit Kumar"
 *                   email: "amit.chauhan@techwagger.com"
 *                   mobile: "9876543210"
 *                   roleId: 2
 *       400:
 *         description: Invalid mobile or OTP
 */

/* ----------------------- SOCIAL LOGIN ----------------------- */
/**
 * @swagger
 * /auth/social-login:
 *   post:
 *     summary: Login through Google, Facebook, or Apple
 *     tags: [Login & Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, socialId, provider]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "social@gmail.com"
 *               fullName:
 *                 type: string
 *                 example: "Social User"
 *               socialId:
 *                 type: string
 *                 example: "GOOGLE_12345XYZ"
 *               provider:
 *                 type: string
 *                 enum: [GOOGLE, FACEBOOK, APPLE]
 *                 example: "GOOGLE"
 *     responses:
 *       200:
 *         description: Social login successful
 */

/* ----------------------- EMAIL LOGIN ------------------------ */
/**
 * @swagger
 * /auth/email-login:
 *   post:
 *     summary: Login using email & password
 *     tags: [Login & Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "amit.chauhan@techwagger.com"
 *               password:
 *                 type: string
 *                 example: "AMit@6388"
 *     responses:
 *       200:
 *         description: Login success
 *       401:
 *         description: Invalid credentials
 */

/* ----------------------- FORGOT PASSWORD ------------------------ */
/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Send reset password link to email
 *     tags: [Login & Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "amit.chauhan@techwagger.com"
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 */

/* ----------------------- RESET PASSWORD ------------------------ */
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using email token
 *     tags: [Login & Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, token]
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NewPass@123"
 *               token:
 *                 type: string
 *                 example: "RESETTOKEN123"
 *     responses:
 *       200:
 *         description: Password reset successful
 */

/* ----------------------- RESET TOKEN VALIDATION ------------------------ */
/**
 * @swagger
 * /auth/reset-token-check:
 *   post:
 *     summary: Verify password reset token
 *     tags: [Login & Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *                 example: "RESETTOKEN123"
 *     responses:
 *       200:
 *         description: Token valid
 *       400:
 *         description: Token invalid or expired
 */
