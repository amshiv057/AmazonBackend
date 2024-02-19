import Express from "express";
import controller from "./controller";
import { validateEmail } from "../../../../helper/middleware";
import auth from "../../../../helper/auth";
export default Express.Router()
    .post('/createUser', validateEmail, controller.registerUser)
    .post('/loginUser', validateEmail, controller.loginUser)
    .use(auth.verifyToken)
    .get('/validUser', controller.validuser)