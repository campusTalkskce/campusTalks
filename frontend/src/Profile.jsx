import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const getemail = localStorage.getItem("email");

  // dummy data (replace with backend later)
  const user = {
    name: "Your Name",
    bio: "This is a default profile. Update later.",
    avatar: "https://via.placeholder.com/120",
    posts: 12,
    followers: 200,
    following: 180,
  };

  const dummyPosts = Array(6).fill(
    "https://via.placeholder.com/300"
  );

  return (
    <div className="profile-container">
      <Navigation />

      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <img src={user.avatar} alt="avatar" className="profile-avatar" />

          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="profile-email">{getemail}</p>
            <p className="profile-bio">{user.bio}</p>

            <div className="profile-stats">
              <span><b>{user.posts}</b> Posts</span>
              <span><b>{user.followers}</b> Followers</span>
              <span><b>{user.following}</b> Following</span>
            </div>

            <Link to="/home">
              <button className="add-post-btn">+ Add Post</button>
            </Link>
          </div>
        </div>

        {/* Posts */}
        <div className="posts-grid">
          {dummyPosts.map((img, i) => (
            <div key={i} className="post-card">
              <img src={img} alt="post" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}