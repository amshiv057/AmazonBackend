const JWT = require("jsonwebtoken");
const USER= require("../Models/userSchema");
const secretkey =process.env.KEY;


const athenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;
        console.log(token);
        const verifyToken = JWT.verify(token,secretkey);
        console.log(verifyToken);
        const rootUser =await USER.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser);

        if(!rootUser){
            throw new Error("user not found");
        }
        req.token = token;
        req.rootUser =rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send("unautherized:No token provide");
        console.log(error);
    }
}

module.exports =athenticate;