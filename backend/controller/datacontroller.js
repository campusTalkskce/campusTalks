const signups=require('../model/signup')
const post=require('../model/postupload')
const Token=require("../utility/token")

const signup=async(req,res)=>{

    try{
        const {uname,email,pass}=req.body
        const u=await signups.findOne({email})
        if(u)return res.json({msg:"user already exists"})
        const add=await signups.create(req.body)
        res.json({msg:"success"})
    }
    catch(err)
    {
        res.json({err:err.message})
    }
}

const login=async(req,res)=>
{
    try {
        const {email,pass}=req.body
        const s=await signups.findOne({email})
        if(!s)return res.json({msg:"user not found"})
        if(pass!==s.pass)return res.json({msg:"invalid"})
        const token=Token(s)
        res.json({msg:"success",token})
    } catch (error) {
        res.json({msg:error.message})
        
    }
}

const savepost =async(req,res)=>
{
    try{
        const {image,description,link}=req.body
        const imageurl=`/uploads/${req.file.filename}`
        const result=await post.create({imageurl,description,link})
        res.json({msg:"success",post:result})
    }
    catch(err)
    {
        res.json({err:err.message})
    }
}
const getpost =async(req,res)=>
{
    const result=await post.find()
    res.json({msg:"success",post:result})
}
module.exports={signup,login,savepost,getpost}
