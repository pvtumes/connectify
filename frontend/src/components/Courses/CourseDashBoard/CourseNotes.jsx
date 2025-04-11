import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, X, Check } from "lucide-react";
import "./CourseNotes.css";

const CourseNotes = ({ courseId, courseTitle, onClose, onSave }) => {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading saved notes from API
    const loadNotes = async () => {
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockNotes = [
          {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            content: "Learned about React hooks and their use cases",
          },
          {
            id: 2,
            date: "2025-03-28",
            content: "Practiced creating custom hooks",
          },
        ];

        setSavedNotes(courseId === "course1" ? mockNotes : []);
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [courseId]);

  const handleSave = () => {
    if (!notes.trim()) return;

    const newNote = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      content: notes,
    };

    setSavedNotes([newNote, ...savedNotes]);
    onSave(newNote);
    setNotes("");
  };

  const handleDelete = (id) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id));
  };

  return (
    <motion.div
      className="notes-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="notes-modal"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: -20 }}
      >
        <div className="notes-header">
          <div className="notes-title">
            <h2>Course Notes</h2>
            <p className="course-title">{courseTitle}</p>
          </div>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        <div className="notes-editor">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            className="notes-textarea"
            rows={4}
          />
          <div className="notes-actions">
            <button
              onClick={handleSave}
              disabled={!notes.trim()}
              className={`save-button ${!notes.trim() ? "disabled" : ""}`}
            >
              <Check size={16} />
              Save Note
            </button>
          </div>
        </div>

        <div className="notes-list-container">
          <h3 className="notes-list-title">Your Notes</h3>

          {loading ? (
            <div className="notes-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : savedNotes.length > 0 ? (
            <div className="notes-list">
              {savedNotes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-header">
                    <span className="note-date">{note.date}</span>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="delete-button"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="note-content">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="notes-empty">
              <BookOpen size={48} className="empty-icon" />
              <h4>No notes yet</h4>
              <p>Add your first note above</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseNotes;
