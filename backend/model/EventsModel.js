const mongoose=require('mongoose')

const Eventschema=new mongoose.Schema({
    Title:String,
    Description:{ type: String, required: true },
    Url:String,
    Start:{type:Date},
    End:{type:Date},
})

const Event =mongoose.model("Events",Eventschema)
module.exports=Event

