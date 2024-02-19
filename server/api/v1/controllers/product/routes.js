import Express from "express";
import controller from "./controller";

export default Express.Router()
    .get('/getProductsList', controller.getProductList)
    .get('/getproduct/:_id', controller.getProduct)