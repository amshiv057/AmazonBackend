import productModel from "../../../models/products";

const productServices = {
    findProduct: async (query) => {
        return await productModel.findOne(query);
    },
    findProductsList: async () => {
        return await productModel.find();
    }
}

module.exports = { productServices };