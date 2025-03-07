const mongoose=require('../connections/dbconnection.js');
const schema=mongoose.Schema({
    Seller_id:{type:String},
    subscritpion_id:{type:String},
    Start_date:{type:Date},
    Expiry_date:{type:Date},
    Plan_name:{type:String},
    Subs_value:{type:String},
},{collection:'subscription'});
const item=mongoose.model("subscription",schema);
module.exports=item;