const jwt=require('jsonwebtoken')

const getdata =(user)=>
{
    const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'30m'});
    return token
    
}
module.exports=getdata