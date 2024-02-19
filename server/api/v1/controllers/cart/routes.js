import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
export default Express.Router()
    .use(auth.verifyToken)
    .post('/addToCart/:_id', controller.createCart)
    .get("/getCart", controller.getCart)
    .delete("/deleteItem/:_id", controller.removeItem)