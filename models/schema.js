const mongoose=require('../connections/dbconnection.js');
const schema=mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
   
});
const item=mongoose.model("users",schema);

module.exports=item;