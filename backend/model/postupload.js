const mongoose=require('mongoose')

const uploadSchma=mongoose.Schema({

    image:String,
    description :String,
     link:String
})

const upload=mongoose.model("post",uploadSchma)

module.exports=upload