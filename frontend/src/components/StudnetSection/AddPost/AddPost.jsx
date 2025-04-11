import React, { useState } from "react";
import "./AddPost.css";
import StartAPost from "./StartAPost";
import { Image, Calendar, PenSquare } from "lucide-react";

const AddPost = () => {
  const [showPostModal, setShowPostModal] = useState(false);

  const openModal = () => {
    setShowPostModal(true);
  };

  const closeModal = () => {
    setShowPostModal(false);
  };

  return (
    <div className="add-post-card">
      {showPostModal && (
        <div className="post-modal-backdrop" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <StartAPost onClose={closeModal} />
          </div>
        </div>
      )}

      <div className="post-header">
        <img className="post-avatar" src="./profile.png" alt="Profile" />
        <button className="add-post-trigger" onClick={openModal}>
          <span>Start a post</span>
        </button>
      </div>

      <div className="post-options">
        <button className="post-option" onClick={openModal}>
          <Image size={20} color="#378fe9" />
          <span>Media</span>
        </button>
        <button className="post-option" onClick={openModal}>
          <Calendar size={20} color="#c37d16" />
          <span>Event</span>
        </button>
        <button className="post-option" onClick={openModal}>
          <PenSquare size={20} color="#e06847" />
          <span>Write article</span>
        </button>
      </div>
    </div>
  );
};

export default AddPost;
