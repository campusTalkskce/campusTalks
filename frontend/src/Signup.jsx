import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

export default function Signup() {

    const [uname,setUname]=useState("")
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [status,setStatus]=useState("")
    const navigate=useNavigate()

    useEffect(() => {}, [status]);

    const saveData=async(e)=>{
        e.preventDefault()
       if(uname==="")alert("uname is empty")
        else if(email==="")alert("email is empty")
        else if(pass==="")alert("pass is empty")
        else
    {
        const customer={uname:uname,email:email,pass:pass}
    try {
        const a=await axios.post("http://localhost:5008/campustalk/signup",customer)
         console.log(a.data.msg)
         
        if(a.data.msg==="user already exists")setStatus("user name already exists")
        else if(a.data.msg==="success")
    {
        setStatus("registration success")
        navigate("/")
    }
        }
        catch (error) {
        console.log(error)
        }
    }
}

  return (
    <div>
      


      <form>

        user Name :<input type="text" onChange={(e)=>setUname(e.target.value)}/><br /><br />
        email : <input type="email" onChange={(e)=>setEmail(e.target.value)} /><br /><br />
      password : <input type="password" onChange={(e)=>setPass(e.target.value)}/><br /><br />
      <button onClick={saveData}>Signup</button><br /><br />
      <h2>{status} Already have an acount, Please LOGIN</h2><br /><br />
      already have an account<Link to='/'> Login</Link>
      </form>
        
    </div>
  )
}
