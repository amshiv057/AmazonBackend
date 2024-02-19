import Joi from "joi";
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage"; ''
import apiError from "../../../../helper/apiError";
import { productServices } from "../../services/product";
const { findProduct, findProductsList } = productServices;


export class productController {
    async getProduct(req, res, next) {
        const validSchema = Joi.object({
            _id: Joi.string().required(),
        });
        try {
            const { value } = validSchema.validate(req.params);
            const productres = await findProduct({ _id: value._id });
            if (!productres) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(productres, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    async getProductList(req, res, next) {
        try {
            const productList = await findProductsList();
            console.log("products");
            if (!productList) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(productList, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new productController();