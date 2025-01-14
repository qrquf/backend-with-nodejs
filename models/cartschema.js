const mongoose=require('../connections/dbconnection.js');
const cartschema=mongoose.Schema(
    {
        p_id:{type:mongoose.Schema.Types.ObjectId},
        u_id:{type:String}
    }
);
const cart=mongoose.model("carts",cartschema);
module.exports=cart;