import fs from "fs";
import path from "path";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";
import { generateOtp, profileCompletion } from "../../Helpers/utils";
import { User } from "../../Entities/user";
import { Login } from "../../Entities/login";
import { sendFormEmailUserVerificationSendOtp } from "../../Helpers/email";
export const SeekerRegistrationMobileController = async (req: any, res: any) => {
    try {
        const { mobile } = req.body;
        if (!mobile) {
            return createResponse(res, 400, "Mobile number required", [], false, true);
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        let user = await User.findOne({ where: { mobile } });
        if (!user) {
            user = await User.save(User.create({ fullName: null, email: null, mobile, RoleId: 5, isVerified: 0, status: 1 }));
            await Login.save(Login.create({ userId: user.id, loginMethod: "MOBILE_OTP", otpCode, otpExpiry, status: 1 }));

            return createResponse(res, 200, "Registration successful, OTP sent", { mobile, Otp: otpCode, newUser: true }, true, false);
        } else {
            return createResponse(res, 200, "Already mobile register", { mobile, Otp: otpCode, newUser: true }, true, false);
        }
    } catch (error) {
        console.log("ERROR:", error);

        return createResponse(res, 500, "Internal server error", [], false, true);
    }
};
export const SeekerOTPVerifyController = async (req: any, res: any) => {
    try {
        const { mobile, otp } = req.body;
        if (!mobile || !otp) {
            return createResponse(res, 400, "Mobile & OTP required", [], false, true);
        }
        const user = await User.findOne({ where: { mobile } });
        if (!user) {
            return createResponse(res, 404, "User not found", [], false, true);
        }
        const login = await Login.findOne({ where: { userId: user.id } });
        if (!login) {
            return createResponse(res, 404, "Login record not found", [], false, true);
        }
        if (login.otpCode !== otp) {
            return createResponse(res, 400, "Invalid OTP", [], false, true);
        }
        if (login.otpExpiry < new Date()) {
            return createResponse(res, 400, "OTP expired", [], false, true);
        }
        const loginToken = Math.random().toString(36).substring(2) + Date.now();
        await User.update({ id: user.id }, { isMobileVerified: 1 as any });
        await Login.update({ id: login.id }, { lastLogin: new Date(), loginToken: loginToken as any, otpCode: null as any });

        return createResponse(res, 200, "OTP verified successfully", { userId: user.id, loginToken }, true, false);
    } catch (error) {
        console.log("ERROR:", error);

        return createResponse(res, 500, "Internal server error", [], false, true);
    }
};
export const RecruiterRegistrationMobileController = async (req: any, res: any) => {
    try {
        const { mobile } = req.body;
        if (!mobile) {
            return createResponse(res, 400, "Mobile number required", [], false, true);
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        let user = await User.findOne({ where: { mobile } });
        if (!user) {
            user = await User.save(User.create({ fullName: null, email: null, mobile, RoleId: 6, isVerified: 0, status: 1 }));
            await Login.save(Login.create({ userId: user.id, loginMethod: "MOBILE_OTP", otpCode, otpExpiry, status: 1 }));

            return createResponse(res, 200, "Recruiter registration successful, OTP sent", { mobile, Otp: otpCode, newUser: true }, true, false);
        } else {
            return createResponse(res, 200, "Recruiter already registered", { mobile, Otp: otpCode, newUser: false }, true, false);
        }
    } catch (error) {
        console.log("ERROR:", error);

        return createResponse(res, 500, "Internal server error", [], false, true);
    }
};
export const RecruiterOTPVerifyController = async (req: any, res: any) => {
    try {
        const { mobile, otp } = req.body;
        if (!mobile || !otp) {
            return createResponse(res, 400, "Mobile & OTP required", [], false, true);
        }
        const user = await User.findOne({ where: { mobile, RoleId: 6 } });
        if (!user) {
            return createResponse(res, 404, "Recruiter not found", [], false, true);
        }
        const login = await Login.findOne({ where: { userId: user.id } });
        if (!login) {
            return createResponse(res, 404, "Login record not found", [], false, true);
        }
        if (login.otpCode !== otp) {
            return createResponse(res, 400, "Invalid OTP", [], false, true);
        }
        if (login.otpExpiry < new Date()) {
            return createResponse(res, 400, "OTP expired", [], false, true);
        }
        const loginToken = Math.random().toString(36).substring(2) + Date.now();
        await User.update({ id: user.id }, { isMobileVerified: 1 as any });
        await Login.update({ id: login.id }, { lastLogin: new Date(), loginToken: loginToken as any, otpCode: null as any });

        return createResponse(res, 200, "Recruiter OTP verified successfully", { userId: user.id, loginToken }, true, false);
    } catch (error) {
        console.log("ERROR:", error);

        return createResponse(res, 500, "Internal server error", [], false, true);
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
};
export const UserEmailVerificationSendOtp = async (req: any, res: any) => {
    const { email } = req.body;

    try {
        // Fetch user data using the email from the `Login` table
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            // Generate a new token for the password reset
            const token: any = await generateOtp();

            // Update the user's record with the new token and update timestamp
            await Login.update({ userId: user.id }, { loginToken: token, updatedAt: new Date() });

            // Send a reset password email with the token as a URL parameter
            await sendFormEmailUserVerificationSendOtp(email, "Email Verification Otp", "", token);

            //  Send a success response for the reset link
            return createResponse(res, 200, MESSAGES?.EMAIL_VERIFICATION_OTP_SENT);
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
export const verifyUserEmail = async (req: any, res: any) => {
    const { email, token } = req.body;
    try {
        if (!email || !token) {
            return createResponse(res, 400, "Email and token are required.", [], false, true);
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }
        const loginRecord = await Login.findOne({ where: { userId: user.id, loginToken: token } });

        if (!loginRecord) {
            return createResponse(res, 404, MESSAGES?.INVALID_OTP, [], false, true);
        }
        const tokenIssuedAt = new Date(loginRecord.updatedAt).getTime();
        const currentTime = Date.now();
        const TOKEN_EXPIRY_MS = 5 * 60 * 1000;
        if (currentTime - tokenIssuedAt > TOKEN_EXPIRY_MS) {
            await Login.update({ id: loginRecord.id }, { loginToken: "" as any });
            return createResponse(res, 401, MESSAGES?.OTP_EXPIRED, [], false, true);
        }
        await User.update({ id: user.id }, { isEmailVerified: 1 as any });
        await Login.update({ id: loginRecord.id }, { loginToken: "" as any });

        return createResponse(res, 200, MESSAGES?.EMAIL_VERIFIED_SUCCESS);
    } catch (err) {
        console.error("VERIFY EMAIL ERROR:", err);
        return createResponse(res, 500, MESSAGES?.RESET_ERROR, [], false, true);
    }
};
export const UserMobileVerificationSendOtp = async (req: any, res: any) => {
    const { mobile } = req.body;
    try {
        if (!mobile) {
            return createResponse(res, 400, "Mobile number required.", [], false, true);
        }
        const user = await User.findOne({ where: { mobile } });

        if (!user) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }
        const otpCode: any = generateOtp(); // 6 digit
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await Login.update({ userId: user.id }, { otpCode, otpExpiry, updatedAt: new Date() });
        return createResponse(res, 200, MESSAGES?.MOBILE_VERIFICATION_OTP_SENT);
    } catch (err) {
        console.log("OTP SEND ERROR:", err);
        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
export const verifyUserMobile = async (req: any, res: any) => {
    const { mobile, otp } = req.body;
    try {
        if (!mobile || !otp) {
            return createResponse(res, 400, "Mobile and OTP are required.", [], false, true);
        }
        const user = await User.findOne({ where: { mobile } });

        if (!user) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

        const loginRecord = await Login.findOne({
            where: { userId: user.id, otpCode: otp }
        });

        if (!loginRecord) {
            return createResponse(res, 404, MESSAGES?.INVALID_OTP, [], false, true);
        }

        // Check if OTP expired
        const currentTime = Date.now();
        const otpExpiryTime = new Date(loginRecord.otpExpiry).getTime();

        if (currentTime > otpExpiryTime) {
            await Login.update({ id: loginRecord.id }, { otpCode: "" as any });
            return createResponse(res, 401, MESSAGES?.OTP_EXPIRED, [], false, true);
        }

        // Mark mobile verified
        await User.update({ id: user.id }, { isMobileVerified: 1 as any });

        // Remove OTP
        await Login.update({ id: loginRecord.id }, { otpCode: "" as any });

        return createResponse(res, 200, MESSAGES?.MOBILE_VERIFIED_SUCCESS);

    } catch (err) {
        console.log("VERIFY MOBILE ERROR:", err);
        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};


