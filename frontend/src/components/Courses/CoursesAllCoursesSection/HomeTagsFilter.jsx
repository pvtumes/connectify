import React from "react";
import { motion } from "framer-motion";

const HomeTagsFilter = ({ selectedTags, toggleTag, allTags, setPage }) => {
  // Show only the first 8 most popular tags
  const popularTags = allTags.slice(0, 8);

  return (
    <motion.div
      className="courses-tags-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="courses-tags-label">Popular Tags:</span>
      <div className="courses-tags-list">
        {popularTags.map((tag) => (
          <motion.button
            key={tag}
            className={`courses-tag-button ${
              selectedTags.includes(tag) ? "courses-tag-selected" : ""
            }`}
            onClick={() => {
              toggleTag(tag);
              setPage(1);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeTagsFilter;
