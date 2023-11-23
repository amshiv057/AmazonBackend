const mongoose=require("mongoose");
// const products = require("../constent/Productsdata");

const productsSchema= new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
})

const products= new mongoose.model("products",productsSchema);

module.exports=products;