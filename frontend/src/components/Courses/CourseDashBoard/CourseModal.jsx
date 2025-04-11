import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronRight,
  ChevronDown,
  X,
  BookOpen,
  Award,
  Repeat,
  BookmarkPlus,
  Check,
  ExternalLink,
} from "lucide-react";
import "./CourseModal.css";

const CourseModal = ({
  course,
  onClose,
  onRateSubmit,
  onAddNote,
  onAddBookmark,
  onToggleFavorite,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [showLessonsList, setShowLessonsList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(course.isFavorite || false);
  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRateSubmit(course.id, rating, feedback);
    handleClose();
  };

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onToggleFavorite(course.id, newFavoriteStatus);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  // Mock lessons data
  const lessons = [
    {
      id: 1,
      title: "Introduction to the course",
      completed: true,
      duration: "15 mins",
    },
    {
      id: 2,
      title: "Setting up your environment",
      completed: true,
      duration: "25 mins",
    },
    {
      id: 3,
      title: "Basic concepts and syntax",
      completed: true,
      duration: "30 mins",
    },
    {
      id: 4,
      title: "Working with components",
      completed: course.progress >= 30,
      duration: "35 mins",
    },
    {
      id: 5,
      title: "State management basics",
      completed: course.progress >= 40,
      duration: "40 mins",
    },
  ];

  const nextLesson = lessons.find((lesson) => !lesson.completed);

  return (
    <motion.div
      className="course-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="course-modal-content"
        initial={{ y: 20 }}
        animate={{ y: isClosing ? -20 : 0 }}
        exit={{ y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="course-modal-header">
          <div className="course-title-wrapper">
            <h2>{course.title}</h2>
            <button
              onClick={handleToggleFavorite}
              className={`favorite-button ${isFavorite ? "active" : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="course-meta">
            <span className="course-category">{course.category}</span>
            <span className="course-stats">
              {course.totalLessons} lessons • {course.totalLessons * 30} mins
            </span>
          </div>
          <button
            onClick={handleClose}
            className="close-button"
            disabled={isClosing}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="course-tabs">
          <button
            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-button ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button
            className={`tab-button ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
        </div>

        <div className="course-tab-content">
          {activeTab === "details" && (
            <div className="details-content">
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
              </div>

              <div className="course-info">
                <h3>Course Description</h3>
                <p>{course.description}</p>

                <div className="progress-section">
                  <h3>Your Progress</h3>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p>
                    {course.progress}% complete • {course.completedLessons} of{" "}
                    {course.totalLessons} lessons
                  </p>
                </div>

                <div className="last-lesson">
                  <h3>Last Lesson</h3>
                  <div className="lesson-card">
                    <div>
                      <h4>
                        {course.lastLesson?.title ||
                          "Introduction to the course"}
                      </h4>
                      <p>
                        {course.lastLesson?.completedDate || "Started recently"}
                      </p>
                    </div>
                    <button className="review-button">
                      <Repeat size={14} />
                      Review
                    </button>
                  </div>
                </div>

                <div className="next-lesson">
                  <h3>Next Up</h3>
                  <div className="next-lesson-card">
                    <div>
                      <h4>
                        {nextLesson ? nextLesson.title : "Course completed!"}
                      </h4>
                      <p>
                        {nextLesson
                          ? `${nextLesson.duration} • Lesson ${nextLesson.id}`
                          : "Congratulations!"}
                      </p>
                    </div>
                    <button className="continue-button">
                      <ChevronRight size={14} />
                      {nextLesson ? "Continue" : "Review Course"}
                    </button>
                  </div>
                </div>

                <div className="rating-section">
                  <h3>Rate this course</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`star ${star <= rating ? "filled" : ""}`}
                          aria-label={`Rate ${star} star`}
                        >
                          {star <= rating ? "★" : "☆"}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about this course..."
                      rows={3}
                      aria-label="Course feedback"
                    />
                    <button type="submit" className="submit-rating">
                      <Award size={16} />
                      Submit Rating
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="content-tab">
              <div className="content-header">
                <h3>Course Content</h3>
                <button
                  onClick={() => setShowLessonsList(!showLessonsList)}
                  className="toggle-lessons-button"
                >
                  {showLessonsList ? "Collapse All" : "Expand All"}
                  <ChevronDown
                    className={`chevron ${showLessonsList ? "open" : ""}`}
                  />
                </button>
              </div>

              <div className="lesson-sections">
                {[1, 2, 3].map((section) => (
                  <div key={section} className="lesson-section">
                    <div className="section-header">
                      <h4>Section {section}</h4>
                      <button
                        onClick={() =>
                          onAddBookmark({
                            id: `section-${section}`,
                            title: `Section ${section}`,
                            type: "section",
                            courseName: course.title,
                          })
                        }
                        className="bookmark-section-button"
                      >
                        <BookmarkPlus size={16} />
                      </button>
                    </div>

                    {showLessonsList && (
                      <div className="lessons-list">
                        {lessons
                          .filter((l) => Math.floor(l.id / 3) === section - 1)
                          .map((lesson) => (
                            <div key={lesson.id} className="lesson-item">
                              <div className="lesson-info">
                                {lesson.completed ? (
                                  <Check size={16} className="completed-icon" />
                                ) : (
                                  <div className="incomplete-icon" />
                                )}
                                <span>{lesson.title}</span>
                                <span className="lesson-duration">
                                  {lesson.duration}
                                </span>
                              </div>
                              <div className="lesson-actions">
                                <button
                                  onClick={() =>
                                    onAddBookmark({
                                      id: `lesson-${lesson.id}`,
                                      title: lesson.title,
                                      type: "lesson",
                                      courseName: course.title,
                                    })
                                  }
                                  className="bookmark-lesson-button"
                                >
                                  <BookmarkPlus size={16} />
                                </button>
                                <button className="view-lesson-button">
                                  <ChevronRight size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="notes-tab">
              <button
                onClick={() => onAddNote(course.id, course.title)}
                className="add-notes-button"
              >
                <BookOpen size={16} />
                Add Notes
              </button>

              {course.notes?.length > 0 ? (
                <div className="notes-list">
                  {course.notes.map((note) => (
                    <div key={note.id} className="note-item">
                      <div className="note-header">
                        <span className="note-date">{note.date}</span>
                      </div>
                      <p className="note-content">{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-notes">
                  <BookOpen size={48} />
                  <h4>No notes yet</h4>
                  <p>Keep track of important concepts or questions</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseModal;
