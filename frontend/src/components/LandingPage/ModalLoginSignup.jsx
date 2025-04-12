import React from "react";
import { FaTimes } from "react-icons/fa";
import "./ModalLoginSignup.css";
import LoginSignup from "./LoginSignup";

const ModalLoginSignup = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
  
      <div className="modal-overlay">
        <button className="modal-close-icon" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-content">
          <LoginSignup />
        </div>
      </div>
    </>
  );
};

export default ModalLoginSignup;
