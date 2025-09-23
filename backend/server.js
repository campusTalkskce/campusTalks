const mongoose =require('mongoose')
const express=require('express')
const parser=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const route=require('./routes/dataroute')
const app=express();
dotenv.config();
const port=process.env.port
app.use(parser.json())
app.use("/campustalk",route)

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))

app.listen(port,()=>console.log("server start at port :"+port))

