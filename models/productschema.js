const mongoose=require('../connections/dbconnection.js');
const productschema=mongoose.Schema({
   // _id:{type:mongoose.Types.ObjectId},
    name:{type:String},
    product1:{type:String},
    product2:{type:String},
    product3:{type:String},
    product4:{type:String},
    discount:{type:String},
    price:{type:String},
    sale:{type:String},
    category:{type:String},
    email:{type:String}

});
const items=mongoose.model("products",productschema);
module.exports=items;