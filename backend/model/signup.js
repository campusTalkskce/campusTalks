const mongoose=require('mongoose')

const signupschema=mongoose.Schema({

        uname:String,
        email:String,
        pass:String
})

const signup=mongoose.model("signup",signupschema)

module.exports=signup