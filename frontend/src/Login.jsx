import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";           // ← add this

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, [status]);

  const login = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email is empty");
    if (!pass) return alert("Password is empty");

    try {
      const { data } = await axios.post(
        "http://localhost:5008/campustalk/login",
        { email, pass }
      );

      if (data.msg === "user not found") setStatus("user not found");
      else if (data.msg === "invalid") setStatus("invalid password");
      else {
        setStatus("Login success");
        localStorage.setItem("tokenkey", data.token);
        localStorage.setItem("email",email)
        alert("login success");
        navigate("/element");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>

      <div className="login-form">
        <h2>Login</h2>
        <label>Email :</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <label>Password :</label>
        <input
          type="password"
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={login}>Login</button>
        {status && <p className="status">{status}</p>}
        <p>
          No account? <Link to="/Signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
