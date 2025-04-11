import React from "react";
import { motion } from "framer-motion";

const HomeHeader = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="courses-header">
      <motion.h1
        className="courses-main-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Courses
      </motion.h1>

      <motion.button
        className="courses-dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? (
          <span role="img" aria-label="Sun icon">
            ☀️
          </span>
        ) : (
          <span role="img" aria-label="Moon icon">
            🌙
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default HomeHeader;
