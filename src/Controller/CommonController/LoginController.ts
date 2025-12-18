import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../Entities/Role";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";
import { sendEmail } from "../../Helpers/email";
import { generateToken } from "../../Helpers/utils";
import { User } from "../../Entities/user";
import { Login } from "../../Entities/login";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleSocialLoginController = async (req: any, res: any) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return createResponse(res, 400, "idToken is required", [], false, true);
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload: any = ticket.getPayload();
        if (!payload || !payload.email) {
            return createResponse(res, 400, "Invalid Google Token", [], false, true);
        }

        const email = payload.email;
        const fullName = payload.name;
        const socialId = payload.sub;
        const profilePic = payload.picture; // profilePic from Google
        const provider = "GOOGLE";

        let user = await User.findOne({ where: { email } });

        if (!user) {
            // Hash default password
            const defaultPassword = "Test@12345";
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);

            user = await User.create({
                fullName,
                email,
                password: hashedPassword, // store hashed password
                mobile: null,
                RoleId: 6,
                profilePic, // store Google profile pic
            }).save();

            await Login.create({
                userId: user.id,
                loginMethod: "SOCIAL",
                socialProvider: provider,
                socialId,
                lastLogin: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }).save();
        } else {
            // Update last login & social info
            await Login.createQueryBuilder()
                .update(Login)
                .set({
                    lastLogin: new Date(),
                    socialProvider: provider as any,
                    socialId,
                    updatedAt: new Date(),
                })
                .where("userId = :userId AND loginMethod = :method", {
                    userId: user.id,
                    method: "SOCIAL",
                })
                .execute();

            // Update profile picture if missing or changed
            if (!user.profilePic || user.profilePic !== profilePic) {
                user.profilePic = profilePic;
                await user.save();
            }
        }

        const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

        const data = await User.createQueryBuilder("user")
            .select([
                "user.id",
                "user.fullName",
                "user.email",
                "user.mobile",
                "user.RoleId",
                "user.profilePic",
                "roletbl.id",
                "roletbl.roleName",
            ])
            .leftJoin(Role, "roletbl", "user.RoleId = roletbl.id")
            .where("user.email = :email", { email })
            .getRawOne();

        return createResponse(
            res,
            200,
            "Social login successful",
            { token, user: data },
            true,
            false
        );
    } catch (error) {
        // tslint:disable-next-line:no-console 
        console.log("Internal server error:", error);

        return createResponse(res, 500, "Internal server error", [], false, true);
    }
};

export const EmailLoginController = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // Step 1: Fetch user by email
        const login: any = await User.findOne({
            where: { email: email },
        });

        // Step 2: Check if user exists
        if (!login) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

        // Step 3: Compare hashed password using bcrypt
        const isMatch = await bcrypt.compare(password, login.password);

        if (!isMatch) {
            return createResponse(res, 401, MESSAGES?.INVALID_CREDENTIALS, [], false, true);
        }

        // Step 4: Generate JWT token (use user id + email)
        const JWT_SECRET: any = process.env.JWT_SECRET || "yourSecretKey";
        const token = jwt.sign(
            { id: login.id, email: login.email },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        const queryBuilder = User.createQueryBuilder("user")
            .select([
                "user.id",
                "user.fullName",
                "user.email",
                "user.mobile",
                "user.RoleId",
                "roletbl.id",
                "roletbl.roleName"
            ])
            .leftJoin(Role, "roletbl", "user.RoleId = roletbl.id")
            .where("user.email = :email", { email });

        const data = await queryBuilder.getRawOne();

        // Step 5: Send success response
        return createResponse(
            res,
            200,
            MESSAGES?.LOGIN_SUCCESS || "Login Successful",
            { user: data, token },
            true,
            false
        );

    } catch (error) {
        // tslint:disable-next-line:no-console 
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const SendOtpMobileController = async (req: any, res: any) => {
    try {
        const { mobile, userType } = req.body;

        if (!mobile) return createResponse(res, 400, MESSAGES.MOBILE_REQUIRED, [], false, true);
        if (!userType || !["recruiter", "seeker"].includes(userType)) return createResponse(res, 400, MESSAGES.INVALID_USER_TYPE, [], false, true);

        const roleId = userType === "recruiter" ? 6 : 5;
        const otpCode: any = 123456;
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        let user = await User.findOne({ where: { mobile } });

        if (!user) {
            user = await User.save(User.create({ fullName: null, email: null, mobile, RoleId: roleId, isVerified: 0, status: 1 }));
            await Login.save(Login.create({ userId: user.id, loginMethod: "MOBILE_OTP", otpCode, otpExpiry, status: 1 }));

            return createResponse(res, 200, MESSAGES.USER_REGISTERED, { mobile, otp: otpCode, newUser: true, roleId }, true, false);
        }

        await Login.createQueryBuilder().update(Login).set({ otpCode, otpExpiry, updatedAt: new Date(), loginMethod: "MOBILE_OTP" as any }).where("userId = :userId", { userId: user.id }).execute();

        return createResponse(res, 200, MESSAGES.OTP_SENT, { mobile, otp: otpCode, newUser: false, roleId: user.RoleId }, true, false);

    } catch (error) {
        // tslint:disable-next-line:no-console 
        console.log("INTERNAL_SERVER_ERROR", error);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const MobileLoginController = async (req: any, res: any) => {
    try {
        const { mobile, otp } = req.body;
        // Step 1: Find user by mobile
        const user = await User.findOne({ where: { mobile } });

        if (!user) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }
        // Step 2: Check OTP from Login table
        const loginRecord = await Login.createQueryBuilder("login")
            .where("login.userId = :userId", { userId: user.id })
            .getOne();

        if (!loginRecord) {
            return createResponse(res, 400, "OTP not found or expired", [], false, true);
        }
        const currentTime = new Date();
        if (loginRecord.otpCode !== otp) {
            return createResponse(res, 401, "Invalid OTP", [], false, true);
        }
        if (loginRecord.otpExpiry < currentTime) {
            return createResponse(res, 401, "OTP Expired", [], false, true);
        }

        // Step 4: Generate JWT token
        const JWT_SECRET: any = process.env.JWT_SECRET || "yourSecretKey";
        const token = jwt.sign({ id: user.id, mobile: user.mobile }, JWT_SECRET, {
            expiresIn: "24h",
        });

        // Step 5: Fetch joined data (Role + User)
        const queryBuilder = User.createQueryBuilder("user")
            .select([
                "user.id",
                "user.fullName",
                "user.email",
                "user.mobile",
                "user.RoleId",
                "roletbl.id",
                "roletbl.roleName",
            ])
            .leftJoin(Role, "roletbl", "user.RoleId = roletbl.id")
            .where("user.id = :id", { id: user.id });

        const data = await queryBuilder.getRawOne();

        // Step 6: Success response
        return createResponse(
            res,
            200,
            MESSAGES?.LOGIN_SUCCESS || "Login Successful",
            { token, user: data },
            true,
            false
        );
    } catch (error) {
        // tslint:disable-next-line:no-console 
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const ForgetPassword = async (req: any, res: any) => {
    const { email } = req.body;

    try {
        // Fetch user data using the email from the `Login` table
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            // Generate a new token for the password reset
            const token: any = await generateToken();

            // Update the user's record with the new token and update timestamp
            await Login.update({ userId: user.id }, { loginToken: token, updatedAt: new Date() });

            // Send a reset password email with the token as a URL parameter
            await sendEmail(email, "Reset Password", "", `${process.env.UI_BASE_URL}/reset-password?token=${token}`);

            //  Send a success response for the reset link
            return createResponse(res, 200, MESSAGES?.RESET_LINK_SENT);
        } else {
            // If user not found, send a user not found response
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(MESSAGES?.RESET_LINK_ERROR, err);

        return createResponse(res, 500, MESSAGES?.RESET_LINK_ERROR, [], false, true);
    }
};
export const ResetPassword = async (req: any, res: any) => {
    const { password, token } = req.body;

    try {

        if (!password || !token) {
            return createResponse(res, 400, "Password and token are required.", [], false, true);
        }

        // Fetch user data using the token from the `Login` table
        const loginToken = await Login.findOne({ where: { loginToken: token } });

        if (!loginToken) {
            return createResponse(res, 404, MESSAGES?.INVALID_TOKEN, [], false, true);
        }

        // Check token validity (5 minutes)
        const tokenIssuedAt = new Date(loginToken.updatedAt).getTime();
        const currentTime = Date.now();
        const TOKEN_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

        if (currentTime - tokenIssuedAt > TOKEN_EXPIRY_MS) {
            // Expired → clear token
            await Login.update({ loginToken: token }, { loginToken: "" as any });

            return createResponse(res, 401, MESSAGES?.TOKEN_EXPIRED, [], false, true);
        }

        // ✅ Hash the password before saving
        const hashedPassword: any = await bcrypt.hash(password.toString(), 10);

        // Update user password and clear login token
        await User.update({ id: loginToken.userId }, { password: hashedPassword });
        await Login.update({ loginToken: token }, { loginToken: "" as any });

        return createResponse(res, 200, MESSAGES?.PASSWORD_UPDATED);
    } catch (err) {
        // tslint:disable-next-line:no-console 
        console.error(MESSAGES?.RESET_ERROR, err);

        return createResponse(res, 500, MESSAGES?.RESET_ERROR, [], false, true);
    }
};
export const ResetTockenCheck = async (req: any, res: any) => {
    const { token } = req.body;

    try {
        // Check if the token is provided in the request body
        if (!token) {
            return createResponse(res, 404, "Please provide token", [], false, true);
        }

        // Fetch user data using the token from the `Login` table
        const user = await Login.findOne({ where: { loginToken: token } });

        if (user) {
            // Extract the token issued time from the `updatedAt` field
            const tokenIssuedAt = new Date(user?.updatedAt).getTime();
            const currentTime = Date.now();
            const tokenExpiryTime = 300000; // Token expiry time in milliseconds (5 minutes)

            // Check if token has expired based on the expiry time
            if (currentTime - tokenIssuedAt > tokenExpiryTime) {
                return createResponse(res, 401, MESSAGES?.TOKEN_EXPIRED, [], false, true);
            }

            // Token is valid, send a success response
            return createResponse(res, 200, MESSAGES?.TOKEN_FOUND_VALID, [], true, false);
        }

        // Token not found in the database, send an invalid token response
        return createResponse(res, 401, MESSAGES?.INVALID_TOKEN, [], false, true);

    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(MESSAGES?.RESET_ERROR, err);

        // Send a 500 response for internal server error
        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const RecruiterRegisterController = async (req: any, res: any) => {
    try {
        const { email, password = "Test@12345" } = req.body;

        if (!email) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], false, true);
        }

        //  Duplicacy check (only recruiter)
        const isRecruiterExist = await User.findOne({
            where: { email, RoleId: 5 },
        });

        if (isRecruiterExist) {
            return createResponse(res, 409, MESSAGES.EMAIL_EXISTS, isRecruiterExist, false, true);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            RoleId: 5,
        }).save();

        await Login.create({
            userId: user.id,
            loginMethod: "EMAIL_PASSWORD",
            lastLogin: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }).save();

        return createResponse(res, 201, MESSAGES.REGISTER_SUCCESS, user, true, false);

    } catch (err) {
        console.error("RecruiterRegisterController Error:", err);

        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], false, true);
    }
};

export const userProfileInfoController = async (req: any, res: any) => {
    try {
        const { id } = req.query;

        if (!id) {
            return createResponse(res, 400, "User id is required", [], false, true);
        }

        const data = await User.createQueryBuilder("user")
            .leftJoin(Role, "roletbl", "user.RoleId = roletbl.id")
            .addSelect([
                "roletbl.id",
                "roletbl.roleName"
            ])
            .where("user.id = :id", { id })
            .getRawOne();

        // Not Found
        if (!data) {
            return createResponse(res, 404, "User not found", [], false, true);
        }

        return createResponse(res, 200, "User profile fetched successfully", data, true, false);

    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Internal Server Error", [], false, true);
    }
};

export const LogoutController = async (req: any, res: any) => {
    try {
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return createResponse(
                res,
                400,
                "User ID is required",
                [],
                false,
                true
            );
        }

        // (Optional) Token/session invalidate logic yahan ayega
        // e.g. remove refresh token, update isLoggedIn = false, etc.

        return createResponse(
            res,
            200,
            "Logout successful",
            [],
            true,
            false
        );

    } catch (error) {
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(
            res,
            500,
            MESSAGES?.INTERNAL_SERVER_ERROR,
            [],
            false,
            true
        );
    }
};
