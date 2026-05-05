import React, { Children, useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import './Home.css';

export default function Home() {
  const [image, setImage] = useState("");
  const [email,setEmail] =useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [status,setStatus]=useState("")

  useEffect(()=>{},[status])

  const saveimage = async (e) => {
    e.preventDefault();

    const save = new FormData();
    save.append("image", image);
    save.append("email",email);
    save.append("description", description);
    save.append("link", link);
    const result=await axios.post("http://localhost:5008/campustalk/savedata",save)
    console.log(result.data)
    if(result.data.msg==="success")
    {
      setStatus("image saved successfully")
      alert("image added")

    }
    else
    {
      setStatus("something error")
    }
  };
  return (
   <div className="home-container">
  <Navigation />

  <div className="home-content">
    <div className="form-box">
      <h2>Upload Event</h2>

      <div className="form-group">
        <label>Upload Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Link</label>
        <input
          type="text"
          placeholder="Enter event link"
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <button className="submit-btn" onClick={saveimage}>
        POST
      </button>

      {status && <p className="status-text">{status}</p>}
    </div>
  </div>
</div>
  );
}
