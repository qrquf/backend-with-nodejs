const mongoose=require('mongoose');
const mongouri='mongodb://127.0.0.1:27017/handicraft?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.6';
mongoose.connect(mongouri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("connected successfully")).catch((error)=>console.log(error));
module.exports=mongoose;