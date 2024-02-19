
import cartModel from "../../../models/cart";

const cartServices = {
    createCart: async (insertObj) => {
        return await cartModel.create(insertObj);
    },
    findCart: async (query) => {
        return await cartModel.find(query).populate([{ path: "productId" }])
    },
    deleteItem: async (query) => {
        return await cartModel.deleteOne(query);
    }
}

module.exports = { cartServices };