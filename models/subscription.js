const mongoose=require('../connections/dbconnection.js');
const schema=mongoose.Schema({
    Seller_id:{type:String},
    subscription_id:{type:String},
    Start_date:{type:String},
    Expiry_date:{type:String},
    Plan_name:{type:String},
    subs_value:{type:String},
},{collection:'subscription'});
const item=mongoose.model("subscription",schema);
module.exports=item;