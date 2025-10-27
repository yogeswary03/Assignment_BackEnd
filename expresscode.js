const express=require('express');
//const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());

app.get('/user',(req,res)=>{
    res.json({message:"hello this is the response message"});

});

app.listen(8080, () => console.log("server listening on port 8080"));

