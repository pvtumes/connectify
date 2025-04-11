import React, { useRef, useEffect } from "react";
import "./PostFeed.css";
import "./DropDown.css"
import {
  Save,
  Link2 as LinkIcon,
  Code,
  X,
  UserMinus,
  Flag,
  Loader,
} from "lucide-react";

const Dropdown = ({ show, loading, onClose }) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div
      className={`options-dropdown ${
        show ? "show-dropdown smooth-dropdown" : ""
      }`}
      ref={dropdownRef}
    >
      {loading ? (
        <div className="options-loading">
          <Loader size={16} className="spin" />
        </div>
      ) : (
        <>
          <button className="option-item">
            <Save size={18} className="option-icon" />
            <span>Save</span>
          </button>
          <button className="option-item">
            <LinkIcon size={18} className="option-icon" />
            <span>Copy link to post</span>
          </button>
          <button className="option-item">
            <Code size={18} className="option-icon" />
            <span>Embed this post</span>
          </button>
          <button className="option-item">
            <X size={18} className="option-icon" />
            <span>Not interested</span>
          </button>
          <button className="option-item">
            <UserMinus size={18} className="option-icon" />
            <span>Unfollow</span>
          </button>
          <button className="option-item report">
            <Flag size={18} className="option-icon" />
            <span>Report post</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Dropdown;
