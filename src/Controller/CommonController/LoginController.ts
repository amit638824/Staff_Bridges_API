import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { Role } from "../../Entities/Role";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";
import { sendEmail } from "../../Helpers/email";
import { generateToken, profileCompletion } from "../../Helpers/utils"; 
import { User } from "../../Entities/user";
import { Login } from "../../Entities/login";

export const UserRegisterController = async (req: any, res: any) => {
    try {
        // const {
        //     fullName,
        //     roleId,
        //     languagePreference,
        //     city,
        //     locality,
        //     gender = "Male",
        //     email,
        //     phone,
        //     password = "Test@12345",
        //     userRole = "JOB_SEEKER",
        // } = req.body; 

        // const uploadDir = path.join(__dirname, "../../uploads");
        // const uploadedFiles = await handleFileUploads(req, uploadDir); 

        // const newUser: any = User.create({
        //     fullName,
        //     roleId,
        //     languagePreference: languagePreference || "English",
        //     city,
        //     locality,
        //     gender,
        //     profile: uploadedFiles.length > 0 ? uploadedFiles : undefined,  
        // });

        // await newUser.save();

        // // ✅ Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // // ✅ Create Login entry
        // const newLogin = Login.create({
        //     userId: newUser.id,
        //     email,
        //     phone,
        //     password: hashedPassword,
        //     userRole,
        // });

        // await newLogin.save();

    } catch (error: any) {
        console.error("Error in UserRegisterController:", error);

        return createResponse(res, 500, "Internal Server Error", [], false, true);
    }
};
export const SocialLoginController = async (req: any, res: any) => {
    try {
        const { email, fullName, socialId, provider } = req.body;

        if (!email) {
            return createResponse(res, 400, "Email is required", [], false, true);
        }

        // Step 1: Check if user exists
        let user = await User.findOne({ where: { email } });

        // Step 2: If not found → create new user
        if (!user) {
            user = await User.create({
                fullName: fullName || "Social User",
                email,
                password: null,
                mobile: null,
                RoleId: 2,
            }).save();

            // ✅ Create login record also (SOCIAL)
            await Login.create({
                userId: user.id,
                loginMethod: "SOCIAL",
                socialProvider: provider || "UNKNOWN",
                socialId: socialId || null,
                lastLogin: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }).save();
        } else {
            // ✅ Update lastLogin for existing user’s login row
            await Login.createQueryBuilder()
                .update(Login)
                .set({
                    lastLogin: new Date(),
                    socialProvider: provider || "UNKNOWN",
                    socialId: socialId || null,
                    updatedAt: new Date(),
                })
                .where("userId = :userId AND loginMethod = :method", {
                    userId: user.id,
                    method: "SOCIAL",
                })
                .execute();
        }

        // Step 3: Generate JWT token
        const JWT_SECRET: any = process.env.JWT_SECRET || "yourSecretKey";
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Step 4: Fetch joined user + role data
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
            .where("user.email = :email", { email });

        const data = await queryBuilder.getRawOne();

        // Step 5: Send success response
        return createResponse(
            res,
            200,
            MESSAGES?.LOGIN_SUCCESS || "Social login successful",
            { token, user: data },
            true,
            false
        );
    } catch (error) {
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const EmailLoginController = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // Step 1: Fetch user by email
        const login = await User.findOne({
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
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const SendOtpMobileController = async (req: any, res: any) => {
    try {
        const { mobile } = req.body;
        if (!mobile) {
            return createResponse(res, 400, "Mobile number required", [], false, true);
        }
        const user = await User.findOne({ where: { mobile } });
        if (!user) {
            return createResponse(res, 404, "User not found", [], false, true);
        }
        const otpCode: any = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min validity

        // Step 4: update query
        await Login.createQueryBuilder()
            .update(Login)
            .set({ otpCode, otpExpiry, updatedAt: new Date(), loginMethod: "MOBILE_OTP" as any })
            .where("userId = :userId", { userId: user.id })
            .execute();

        return createResponse(res, 200, MESSAGES?.OTP_SENT_SUCCESS, { mobile, Otp: otpCode }, true, false);
    } catch (error) {
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
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
            .andWhere("login.loginMethod = :method", { method: "MOBILE_OTP" })
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
        console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const ForgetPassword = async (req: any, res: any, next: any) => {
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
            await sendEmail(email, "Reset Password", "", `${process.env.UI_BASE_URL}/resetpassword/${token}`);

            //  Send a success response for the reset link
            return createResponse(res, 200, MESSAGES?.RESET_LINK_SENT);
        } else {
            // If user not found, send a user not found response
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

    } catch (err) {
        // Log the error to the console for debugging purposes
        // tslint:disable-next-line:no-console
        console.log(MESSAGES?.RESET_LINK_ERROR, err);
        return createResponse(res, 500, MESSAGES?.RESET_LINK_ERROR, [], false, true);
    }
};
export const ResetPassword = async (req: any, res: any, next: any) => {
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
        console.error(MESSAGES?.RESET_ERROR, err);
        return createResponse(res, 500, MESSAGES?.RESET_ERROR, [], false, true);
    }
};
export const ResetTockenCheck = async (req: any, res: any, next: any) => {
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
        // Log the error to the console for debugging purposes
        // tslint:disable-next-line:no-console
        console.log(MESSAGES?.RESET_ERROR, err);

        // Send a 500 response for internal server error
        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const ProfileUpdate = async (req: any, res: any) => {
    // const { email } = req.params;

    try {
        // Fetch user data from the `User` table using the provided email
        // This retrieves selected fields only
        // const userData = await User.findOne({
        //     where: { emailId: email },
        //     select: ["userId", "userType", "firstName", "profile", "lastName", "emailId",
        //         "phoneNumber", "address", "status", "secondaryEmailId", "companyId", "title", "updatedAt", "createdAt"],
        // });

        // // Calculate profile completion percentage based on the user data
        // const profileComplete = await profileCompletion(userData);

        // // Fetch login data from the `Login` table using the provided email
        // // Only fetches the `password` field
        // const loginData = await Login.findOne({
        //     where: { emailId: email },
        //     select: ["password"],
        // });

        // // Check if user data was found; if not, send a 404 response
        // if (!userData) {
        //     return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], true, false);
        // }

        // // Combine user data and login data into a single response object
        // const responseData = {
        //     userId: userData?.userId,
        //     userType: userData?.userType,
        //     firstName: userData?.firstName,
        //     lastName: userData?.lastName,
        //     emailId: userData?.emailId,
        //     phoneNumber: userData?.phoneNumber,
        //     address: userData?.address,
        //     secondaryEmailId: userData?.secondaryEmailId,
        //     profile: userData?.profile,
        //     companyId: userData?.companyId,
        //     title: userData?.title,
        //     // Include the password from the login data, or null if not available
        //     password: loginData?.password || null,
        //     updatedAt: userData?.updatedAt,
        //     last_record_updated: userData?.createdAt,
        //     profileComplete
        // };

        // // Send a successful response with the combined data
        // return createResponse(res, 200, MESSAGES?.DATA_FETCH_SUCCESS, responseData, true, false);

    } catch (error: any) {
        // Log the error to the console for debugging purposes
        // tslint:disable-next-line:no-console
        console.log("Error fetching user data:", error);

        // Send a 500 response with the error message
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const userProfileUpdate = async (req: any, res: any) => {
    try {

        let profileFilename = null;

        // Handle file upload using multer
        if (req.files && req.files.profile) {
            const file = req.files.profile;
            const uploadDir = path.join(__dirname, "../uploads");
            // Ensure the directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const uploadPath = path.join(uploadDir, fileName);
            await file.mv(uploadPath);
            profileFilename = fileName;
        }

        const {
            userId,
            firstName,
            lastName,
            companyId,
            title,
            secondaryEmailId,
            address,
            phoneNumber,
            // password
        } = req.body;

        // Validate required fields
        if (!userId) {
            return createResponse(res, 400, "User ID is required", [], false, true);
        }

        // Prepare update data for User table
        const updateData: Record<string, any> = {
            firstName,
            lastName,
            companyId,
            title,
            secondaryEmailId,
            address,
            phoneNumber,
            updatedBy: userId,
            updatedAt: new Date()
        };

        // Include profile picture if uploaded
        if (profileFilename) {
            updateData.profile = profileFilename;
        }

        // Update user record in User table
        const result = await User.createQueryBuilder()
            .update(User)
            .set(updateData)
            .where("userId = :userId", { userId })
            .returning(["userId", "firstName", "lastName", "companyId", "title", "secondaryEmailId", "address", "phoneNumber", "profile", "updatedAt"])
            .execute();

        if (result.affected === 0) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

        const profileComplete = await profileCompletion(result.raw[0]);

        // Update password in Login table, if provided
        // if (password) {
        //     await Login.createQueryBuilder()
        //         .update(Login)
        //         .set({ password, updatedAt: new Date(), updatedBy: userId })
        //         .where("userId = :userId", { userId })
        //         .execute();
        // }

        const updatedUserData = result.raw[0];

        return createResponse(res, 200, MESSAGES?.PROFILE_UPDATED,
            { ...updatedUserData, profileComplete },
            true, false);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(MESSAGES?.RESET_ERROR, err);

        // Respond with error message
        return createResponse(res, 200, MESSAGES?.INTERNAL_SERVER_ERROR, true, false);
    }
};//
