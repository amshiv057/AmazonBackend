const Productsdata=require("./constent/Productsdata");
const Products =require("./Models/ProductsShecma");

const DefaultData = async()=>{
    try{
 
        await Products.deleteMany({});
        
        const storeData = await Products.insertMany(Productsdata);
        console.log(storeData);
    }catch (error){
            console.log("error"+error.message);
    }
}

module.exports=DefaultData;