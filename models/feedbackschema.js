const mongoose=require('../connections/dbconnection.js');
const productschema=mongoose.Schema({
Likes:{type:String},
Comment:{type:String},
Rating:{type:String},
p_id:{type:String},
u_id:{type:String}
},
{Collection:'feedbacks'}
);
const item=mongoose.model("feedbacks",productschema);
module.exports=item;