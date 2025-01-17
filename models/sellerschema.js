const mongoose=require('../connections/dbconnection.js');
const sellerschema=mongoose.Schema(
    {
        first:{type:String},
        second:{type:String},
        last:{type:String},
        country:{type:String},
        bussiness:{type:String},
        website:{type:String},
        email:{type:String},
        number:{type:String},
        city:{type:String},
        product:{type:String},
        pincode:{type:String},
        state:{type:String},
        country_code:{type:String},
        password:{type:String}
    }
);
const item=mongoose.model("sellers",sellerschema);
module.exports=item;