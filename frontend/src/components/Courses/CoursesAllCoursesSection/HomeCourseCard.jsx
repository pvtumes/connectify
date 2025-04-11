import React from "react";
import { motion } from "framer-motion";

const HomeCourseCard = ({
  course,
  savedCourses,
  toggleSaveCourse,
  courseProgress,
  updateProgress,
  shareCourse,
}) => {
  return (
    <motion.div
      className="courses-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
    >
      <div className="courses-card-header">
        <img
          className="courses-card-image"
          src={course.image}
          alt={course.title}
          loading="lazy"
        />
        <button
          className="courses-bookmark-button"
          onClick={() => toggleSaveCourse(course.id)}
          aria-label={
            savedCourses.includes(course.id)
              ? "Remove from saved courses"
              : "Save course"
          }
        >
          {savedCourses.includes(course.id) ? "★" : "☆"}
        </button>
      </div>

      <div className="courses-card-content">
        <div className="courses-card-badges">
          <span className="courses-domain-badge">{course.domain}</span>
          <span
            className={`courses-difficulty-badge courses-difficulty-${course.difficulty.toLowerCase()}`}
          >
            {course.difficulty}
          </span>
        </div>

        <h3 className="courses-card-title">{course.title}</h3>
        <p className="courses-card-instructor">By {course.instructor}</p>
        <p className="courses-card-description">{course.description}</p>

        <div className="courses-card-tags">
          {course.tags.map((tag, index) => (
            <span
              key={`${course.id}-tag-${index}`}
              className="courses-card-tag"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="courses-card-meta">
          <div className="courses-rating">
            <span className="courses-rating-stars">
              {"★".repeat(Math.floor(course.rating))}
              {course.rating % 1 >= 0.5 ? "★" : "☆"}
            </span>
            <span className="courses-rating-value">{course.rating}</span>
            <span className="courses-reviews-count">
              ({course.reviews} reviews)
            </span>
          </div>

          <div className="courses-time-info">
            <span className="courses-duration">{course.duration}</span>
            <span className="courses-commitment">{course.timeCommitment}</span>
          </div>
        </div>

        <div className="courses-card-actions">
          <div className="courses-progress-dropdown">
            <select
              className="courses-progress-select"
              value={courseProgress[course.id] || "not-started"}
              onChange={(e) => updateProgress(course.id, e.target.value)}
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            className="courses-share-button"
            onClick={() => shareCourse(course.id)}
            aria-label="Share course"
          >
            Share
          </button>
        </div>

        <button className="courses-enroll-button">Enroll Now</button>
      </div>
    </motion.div>
  );
};

export default HomeCourseCard;
