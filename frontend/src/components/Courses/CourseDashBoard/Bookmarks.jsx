import React from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkPlus, ExternalLink, X } from "lucide-react";
import "./Bookmarks.css";

const Bookmarks = ({ bookmarks, onRemove, onClose, onOpen }) => {
  return (
    <motion.div
      className="bookmarks-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bookmarks-modal"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: -20 }}
      >
        <div className="bookmarks-header">
          <h2>Your Bookmarks</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        {bookmarks.length > 0 ? (
          <div className="bookmarks-list">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-item">
                <div className="bookmark-info">
                  <h3 className="bookmark-title">{bookmark.title}</h3>
                  <p className="bookmark-meta">
                    {bookmark.type === "lesson" ? "Lesson" : "Section"} •{" "}
                    {bookmark.courseName}
                  </p>
                </div>
                <div className="bookmark-actions">
                  <button
                    onClick={() => onOpen(bookmark)}
                    className="action-button open-button"
                    title="Open bookmark"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => onRemove(bookmark.id)}
                    className="action-button remove-button"
                    title="Remove bookmark"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bookmarks-empty">
            <Bookmark size={48} className="empty-icon" />
            <h3>No bookmarks yet</h3>
            <p>Bookmark important lessons and sections for quick access</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Bookmarks;
