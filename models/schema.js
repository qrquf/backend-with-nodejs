const { Collection } = require('mongoose');
const mongoose=require('../connections/dbconnection.js');
const schema=mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},

},
{Collection:'user'}
);
const item=mongoose.model("user",schema);

module.exports=item;