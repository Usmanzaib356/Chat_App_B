const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")



// Messages Schema
const msgSchema = new mongoose.Schema({
    msg:String
})


// Message Model 
const msgModel = new mongoose.model("messages",msgSchema)




// Messages Route
Router.post("/msg",async(req,res)=>{
   
    const msg = new msgModel({
        msg:req.body.msg
    })

  
   // check Validaton
   if(!req.body.msg){
    return res.status(400).send("Invalid Request")
   }
   
   try{
    
    // Message Save
    await msg.save()
    res.status(200).send("Message Save")

   }catch(error){
     console.log(error); 
     res.status(500).json({msg:"internal Server Error"},error)
   }

})



// All data Send Route 
Router.get("/messages",async(req,res)=>{

  
 // Send All messages
 try{
    const output = await msgModel.find()
    res.status(200).send(output)
 }catch(error){
    console.log(error);
    res.status(500).json({msg:"Internal Server Error",error})
 }
  

})




module.exports = Router