import React, { useEffect, useState } from "react";
import "./Event.css"; // import CSS file
import Navigation from "./Navigation";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(()=>{getevents();},[])

  function resetForm() {
    setTitle("");
    setDescription("");
    setUrl("");
    setStart("");
    setEnd("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() && !description.trim()) {
      return alert("Please add a title or description");
    }

    // Mock event object (since no backend)
    const newEvent = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date(),
      start,
      end,
      url,
    };

    // prepend new event
    setEvents((prev) => [newEvent, ...prev]);
    resetForm();
    setModalOpen(false);
  }
  //post events
  const postEvents = async (e) => {
    e.preventDefault();

      const save = {
    Title: title,
    Description: description,
    Url: url,
    Start: start,
    End: end,
  };
     const result = await axios.post(
    "http://localhost:5008/campustalk/postevent",
    save
  );

  if (result.data.msg === "success") {
    alert("Event added");
    console.log("Event added")
    await getevents();
    resetForm();
    setModalOpen(false);
  } else {
    console.log("Something went wrong");
  }
};

//get events
const getevents=async()=>{
  try{
    const  result = await axios.get("http://localhost:5008/campustalk/getevent")
    setEvents(result.data);
  }
   catch (err) {
      console.log("Error fetching events:", err);
    }
}

  return (
    <div
      className="events-container"
      style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <div>
        <Navigation />
      </div>

      <div className="events-header">
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary add-btn-fixed"
        >
          + Add Event
        </button>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit} className="event-form">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (optional)"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
              />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <p>Start Date</p>
                <p>End Date</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary" onClick={postEvents}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="events-grid">
  {events.map((ev) => (
    <div key={ev._id} className="event-card">
      <h3>{ev.Title || "Untitled"}</h3>
      <div className="description-wrapper">
        <p className="description">{ev.Description}</p>
      </div>
      {ev.Start && ev.End && (
  <p className="event-date">
    From: {new Date(ev.Start).toLocaleDateString()} → To: {new Date(ev.End).toLocaleDateString()}
  </p>
)}

      {ev.Url && (
        <a href={ev.Url} target="_blank" rel="noopener noreferrer">Link</a>
      )}
    </div>
  ))}
</div>


    </div>
  );
}
