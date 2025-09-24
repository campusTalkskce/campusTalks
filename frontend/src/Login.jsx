import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const navigate=useNavigate()

  useEffect(() => {}, [status]);
  const login = async (e) => {
    e.preventDefault();
    if (email === "") alert("uname is empty");
    else if (pass === "") alert("password is empty");
    else {
      const customer = { email: email, pass: pass };
      try {
        const a = await axios.post(
          "http://localhost:5008/campustalk/login",
          customer
        );
        console.log(a.data.msg);
        if (a.data.msg === "user not found") setStatus("user not found");
        else if (a.data.msg === "invalid") setStatus("invalid password");
        else {
          setStatus("Login success");

          console.log(a.data.token);
          localStorage.setItem("tokenkey", a.data.token);
          alert("login success")
          navigate('/technews')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
     Email :
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      password :{" "}
      <input type="password" onChange={(e) => setPass(e.target.value)} />
      <br />
      <br />
      <button onClick={login}>Login</button>
      <br />
      <br />
      <Link to="/Signup"> Signup</Link>
    </div>
  );
};

export default Login;
