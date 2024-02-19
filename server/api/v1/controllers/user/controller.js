import Joi from "joi";
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage"; ''
import apiError from "../../../../helper/apiError";
import { userServices } from "../../services/user";
import { cartServices } from "../../services/cart";
import status from "../../../../enums/status";
import { createHash, compareHash, getToken } from "../../../../helper/utils";
const { createUser, findUser } = userServices;
const { findCart } = cartServices;

export class userController {
    async registerUser(req, res, next) {
        const validSchema = Joi.object({
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string().required(),
            mobile: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            const userRes = await findUser({ email: value.email, status: { $ne: status.DELETE } });
            if (userRes) {
                throw apiError.alreadyExist(responseMessage.EMAIL_EXIST);
            }
            const hashedPassword = await createHash(value.password);
            value.password = hashedPassword;
            const result = await createUser(value);
            if (!result) {
                throw apiError.internal(responseMessage.INTERNAL_SERVER_ERROR);
            }
            return res.json(new response(result, responseMessage.DATA_SAVED));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const validSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = await validSchema.validate(req.body);

            const userRes = await findUser({ email: value.email, status: { $ne: status.DELETE } });

            if (userRes) {
                const result = await compareHash(userRes.password ? userRes.password : "", value.password);
                if (result) {
                    const jwtToken = await getToken({ _id: userRes._id, email: userRes.email });
                    return res.json(new response({ jwtToken }, responseMessage.LOGIN_SUCCESS));
                }
                else {
                    throw apiError.invalid(responseMessage.INVALID_PASSWORD);
                }
            }
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async validuser(req, res, next) {
        try {
            const userRes = await findUser({ _id: req.userId, status: { $ne: status.DELETE } });

            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const cartRes = await findCart({ userId: userRes._id, status: { $ne: status.DELETE } });
            let total = cartRes.length;
            const result = {
                total: total,
                user: userRes
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new userController();