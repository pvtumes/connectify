import React from "react";
import { motion } from "framer-motion";

const HomeSavedCoursesSummary = ({
  savedCourses,
  toggleSaveCourse,
  mockCourses,
}) => {
  return (
    <motion.div
      className="courses-saved-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Your Saved Courses ({savedCourses.length})</h3>
      <ul className="courses-saved-list">
        {savedCourses.map((id) => {
          const course = mockCourses.find((c) => c.id === id);
          return (
            <motion.li
              key={`saved-${id}`}
              className="courses-saved-item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>{course.title}</span>
              <motion.button
                className="courses-remove-saved"
                onClick={() => toggleSaveCourse(id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Remove
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default HomeSavedCoursesSummary;
