const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")



// User Schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String
  })
  
  
  
  // User Model
  const userModel = new mongoose.model("user",userSchema)

  



// SignUp Route
Router.post("/signup", async (req, res) => {

// Create new user instance
const user = new userModel({
  email: req.body.email,
  password: req.body.password
})
  
  try {
      // Check validation
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("Invalid request");
      } else if (typeof req.body.email !== "string") {
        return res.status(400).send("Email should be of type string");
      } else if (!req.body.email.includes("@gmail") || !req.body.email.includes(".com")) {
        return res.status(400).send("Invalid email format");
      } 


  
      



    // Check if user already exists
    const userExist = await userModel.findOne({ email: req.body.email })
    if (userExist) {
      return res.status(409).send("User Already Exists")
    }

    
    // Save user to database
    const output = await user.save()
    res.status(200).json({msg:"Sign Up successful",output})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error })
  }
})



//Signin Route
Router.post("/signin",async(req,res)=>{


try{

 // Check validation
if (!req.body.email || !req.body.password) {
  return res.status(400).send("Invalid request");
} else if (typeof req.body.email !== "string") {
  return res.status(400).send("Email should be of type string");
} else if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
  return res.status(400).send("Invalid email format");
}



 // Check user exist 
 const userExist = await userModel.findOne({email:req.body.email})
 

 if(!userExist){
   return res.status(400).send("Sorry User Not Found")
 }
 
  //Check User Password
  if(userExist.password !== req.body.password){
     res.status(409).send("Password Incorrect")
  }
 
  res.status(200).json({msg:"Login Succesfully",userExist })

}catch(error){
  
  res.status(500).json({msg:"Internal Server Error",error})
}

})


module.exports = Router

