const express=require('express');
const app=express();
const port=8000;

app.listen(port,()=>{
    console.log("the server has started listening");
});
app.get('/users',(req,res)=>{
return res.send("you landed at the correct place");
});

