import Joi from "joi";
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage"; ''
import apiError from "../../../../helper/apiError";
import { cartServices } from "../../services/cart";
import { userServices } from "../../services/user";
import status from "../../../../enums/status";
const { findUser } = userServices;
const { createCart, findCart, deleteItem } = cartServices;

export class cartController {
    async createCart(req, res, next) {
        const validSchema = Joi.object({
            _id: Joi.string().required(),
        });
        try {
            const { value } = validSchema.validate(req.params);
            const userRes = await findUser(req.userId);
            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const result = await createCart({ productId: value._id, userId: userRes._id });
            return res.json(new response(result, responseMessage.CART_ADDED));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getCart(req, res, next) {
        try {
            const userRes = await findUser({ _id: req.userId });
            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const dataRes = await findCart({ userId: userRes._id, status: { $ne: status.DELETE } });
            if (!dataRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(dataRes, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async removeItem(req, res, next) {
        const validSchema = Joi.object({
            _id: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.params);
            const cartRes = await findCart({ _id: value._id, status: { $ne: status.DELETE } });
            if (cartRes.length === 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            console.log(cartRes[0]._id);
            const result = await deleteItem({ _id: cartRes[0]._id });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new cartController();