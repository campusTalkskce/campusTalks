import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import "./Homeelement.css";

export default function Homeelement() {
  const [email, setEmail] = useState("");
  const [uname, setuname] = useState("");
  const [post, setPost] = useState([]);

  useEffect(()=>
{
    const getemail=localStorage.getItem("email")
   if(getemail) setEmail(getemail)
},[])
  useEffect(() => {
    if(email)
    {
         checking();
       fetch();
    }
   
   
  }, [email]);
  const checking = async () => {
    try {
      const check = await axios.get(
        `http://localhost:5008/campustalk/check/${email}`
      );
      console.log(check.data);
      if (check.data.msg === "success") {
        setuname(check.data.uname);
        console.log(uname)
      } else if (check.data.msg === "not found") {
        setuname("user not found");
        console.log(uname);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetch = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5008/campustalk/getpost"
      );
      if (result.data.msg == "success") {
        setPost(result.data.post);
        console.log(result.data.post);
      }
    } catch (err) {}
  };
  return (
    <div className="home-container">
      <div className="left">
        <Navigation />
      </div>

      <div className="right">
        <h5>{}</h5>

        {post.length > 0 &&
          post.map((p, index) => (
            <div className="post" key={index}>
              <img src={`http://localhost:5008${p.image}`} alt="" />
              <h4>{p.description}</h4>
              <h4>
                Registration Link <a href={p.link}>click here</a>
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}
