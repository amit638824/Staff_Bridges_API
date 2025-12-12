import { User } from "../../Entities/user";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response"; 
import { uploadToS3 } from "../../Helpers/s3";

export const userProfilePicContactUpdate = async (req: any, res: any) => {
    try {
        const { userId, fullName, mobile, locality } = req.body;

        if (!userId) {
            return createResponse(res, 400, "User ID is required", [], false, true);
        }

        const updateData: any = {
            fullName,
            mobile,
            locality,
            updatedBy: userId,
            updatedAt: new Date(),
        };

        // ---------- ⬇️ File Upload for Profile Pic ----------
        if (req.files && req.files.profilePic) {
            const uploadedPic = await uploadToS3(req.files.profilePic, "profile-pics");
            updateData.profilePic = uploadedPic.url;  // Save URL
        }

        // ---------- ⬇️ File Upload for Resume ----------
        if (req.files && req.files.resume) {
            const uploadedResume = await uploadToS3(req.files.resume, "resumes");
            updateData.resume = uploadedResume.url; // Save URL
        }

        // Remove undefined fields  
        Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key]
        );

        const result = await User.createQueryBuilder()
            .update(User)
            .set(updateData)
            .where("id = :userId", { userId })
            .returning([
                "id",
                "fullName",
                "mobile",
                "locality",
                "profilePic",
                "resume",
                "updatedAt",
            ])
            .execute();

        if (result.affected === 0) {
            return createResponse(res, 404, MESSAGES?.USER_NOT_FOUND, [], false, true);
        }

        return createResponse(
            res,
            200,
            MESSAGES?.PROFILE_UPDATED,
            result.raw[0],
            true,
            false
        );

    } catch (err) {
        console.log(MESSAGES?.RESET_ERROR, err);

        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
    }
};
