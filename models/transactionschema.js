const mongoose=require('../connections/dbconnection.js');
const transactionschema=mongoose.Schema({
    subscription_id:{type:String},
    transaction_id:{type:String},
    amount:{type:String},
    payment_date:{type:String},
    bank_id:{type:String},
},
{collection:'transaction'});
const item=mongoose.model("transaction",transactionschema);
module.exports=item;