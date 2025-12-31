import { User } from "../../Entities/user";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";


export const createRecruiterApplyJob = async (req: any, res: any) => {
    try {
        const { id } = req.query;
        const user = await User.findOneBy({ id});
        return createResponse(res, 201, MESSAGES?.DATA_FETCH_SUCCESS, user);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, []);
    }
};


