require("dotenv").config();
const express = require("express");
const app =express();
const mongoose=require('mongoose');
const cookieParser= require("cookie-parser");

require("./db/conn");

const Products =require("./Models/ProductsShecma");;
const DefaultData= require("./default");
const cors= require("cors");
const router =require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);
const port = process.env.PORT || 4000;

//for deployment 

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
}

app.listen(port,()=>{
    console.log(`Server is running on port Number ${port}`);
})

DefaultData();
