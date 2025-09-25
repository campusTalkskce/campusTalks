import React, { Children, useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [status,setStatus]=useState("")

  useEffect(()=>{},[status])

  const saveimage = async (e) => {
    e.preventDefault();

    const save = new FormData();
    save.append("image", image);
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
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div>
        <Navigation />
      </div>
      <div>
        upload image :
        <input
          type="file"
          placeholder="Upload image"
          onChange={(e) => setImage(e.target.files[0])}
        /><br /><br />
        Description :{" "}
        <input
          type="text"
          placeholder="Enter Description of the event"
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />
        Link :{" "}
        <input
          type="text"
          placeholder="Enter Link to regester for the event"
          onChange={(e) => setLink(e.target.value)}
        /><br /><br />
        <button onClick={saveimage}>POST</button><br /><br />
      </div>
    </div>
  );
}
