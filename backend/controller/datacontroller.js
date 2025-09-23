const signups=require('../model/signup')

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
        if(pass!==s.pass)return res.js({msg:"invalid"})
        res.json({msg:"success"})
    } catch (error) {
        res.json({err:err.message})
        
    }
}
module.exports={signup,login}
