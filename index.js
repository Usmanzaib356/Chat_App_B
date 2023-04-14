const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config() 


// Midle Wears
app.use(cors())
app.use(express.json())



//Database connection
mongoose.connect(process.env.conection_url)

const db = mongoose.connection

db.on('error',(error)=>{
    console.log(error);
})

db.once('connected',()=>{
    console.log("DB connected");
})


//index Route
app.get("/",(req,res)=>{
    res.send("Server Started")
})



// Auth Route 
const Auth = require("./Authentication/Auth")
app.use(Auth)




// Messages Route
const msg = require("./Messages/usermessages")
app.use(msg)



app.listen(3000,()=>{
    console.log("Server has been started on port 3000");
})
