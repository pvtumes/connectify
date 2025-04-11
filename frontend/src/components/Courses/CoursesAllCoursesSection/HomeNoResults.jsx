import React from "react";
import { motion } from "framer-motion";

const HomeNoResults = ({ resetFilters }) => {
  return (
    <motion.div
      className="courses-no-results"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h3
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        No courses match your search criteria
      </motion.h3>

      <motion.p
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Try adjusting your filters or search query
      </motion.p>

      <motion.button
        className="courses-reset-search"
        onClick={resetFilters}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Reset All Filters
      </motion.button>
    </motion.div>
  );
};

export default HomeNoResults;
