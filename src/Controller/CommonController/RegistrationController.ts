
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";
import {
    generateOtp,
    // profileCompletion 
} from "../../Helpers/utils";
import { User } from "../../Entities/user";
import { Login } from "../../Entities/login";
import { sendFormEmailUserVerificationSendOtp } from "../../Helpers/email";
import { uploadToS3 } from "../../Helpers/s3";

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
        // tslint:disable-next-line:no-console
        console.log("Error fetching user data:", error);

        // Send a 500 response with the error message
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const userBasicProfileUpdate = async (req: any, res: any) => {
  try {
    const {
      userId,
      fullName,
      gender,
      salary,
      education,
      experinced,
      email,
      companyName,
      companyAddress,
      differentInterviewAddress,
    } = req.body;

    if (!userId) {
      return createResponse(res, 400, "User ID is required", [], false, true);
    }

    /* ================= ENUM VALIDATION ================= */

    const VALID_EDUCATION = [
      "Any",
      "highschool",
      "intermediate",
      "diploma",
      "graduate",
      "postgraduate",
    ];

    const VALID_GENDER = ["Male", "Female", "Other"];

    if (education && !VALID_EDUCATION.includes(education)) {
      return createResponse(
        res,
        400,
        "Invalid education value",
        { allowedValues: VALID_EDUCATION },
        false,
        true
      );
    }

    if (gender && !VALID_GENDER.includes(gender)) {
      return createResponse(
        res,
        400,
        "Invalid gender value",
        { allowedValues: VALID_GENDER },
        false,
        true
      );
    }

    if (
      experinced !== undefined &&
      (!Number.isInteger(Number(experinced)) || Number(experinced) < 0)
    ) {
      return createResponse(
        res,
        400,
        "Invalid experinced value",
        "experinced must be a non-negative integer",
        false,
        true
      );
    }

    /* ================= FILE UPLOAD ================= */
    let companyLogoUrl;
    if (req.files?.companyLogo) {
      const uploadRes = await uploadToS3(
        req.files.companyLogo,
        "company-logo"
      );
      companyLogoUrl = uploadRes.url;
    }

    /* ================= UPDATE DATA ================= */

    const updateData: any = {
      fullName,
      email,
      gender,
      salary,
      experinced,
      education,
      companyName,
      companyAddress,
      differentInterviewAddress,
      companyLogo: companyLogoUrl,
      updatedBy: userId,
      updatedAt: new Date(),
    };

    // 🔥 undefined fields remove
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    // sirf updatedAt & updatedBy bacha ho
    if (Object.keys(updateData).length === 2) {
      return createResponse(
        res,
        400,
        "No valid fields to update",
        [],
        false,
        true
      );
    }

    const result = await User.createQueryBuilder()
      .update(User)
      .set(updateData)
      .where("id = :userId", { userId })
      .returning([
        "id",
        "fullName",
        "email",
        "gender",
        "salary",
        "experinced",
        "education",
        "companyName",
        "companyAddress",
        "differentInterviewAddress",
        "companyLogo",
        "updatedAt",
      ])
      .execute();

    if (result.affected === 0) {
      return createResponse(res, 404, MESSAGES.USER_NOT_FOUND, [], false, true);
    }

    return createResponse(
      res,
      200,
      MESSAGES.PROFILE_UPDATED,
      result.raw[0],
      true,
      false
    );
  } catch (err) {
    console.log(MESSAGES.RESET_ERROR, err);
    return createResponse(
      res,
      500,
      MESSAGES.INTERNAL_SERVER_ERROR,
      [],
      false,
      true
    );
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
        // tslint:disable-next-line:no-console 
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
        // tslint:disable-next-line:no-console 
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
        // tslint:disable-next-line:no-console 
        console.log("VERIFY MOBILE ERROR:", err);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
