const { Collection, version } = require('mongoose');
const mongoose=require('../connections/dbconnection.js');
const schema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
},
{
    versionKey:false,
    collection:'user'

}

);
const item=mongoose.model("user",schema);

module.exports=item;