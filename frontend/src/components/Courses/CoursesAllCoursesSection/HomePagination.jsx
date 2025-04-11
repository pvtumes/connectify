import React from "react";
import { motion } from "framer-motion";

const HomePagination = ({ page, totalPages, changePage }) => {
  return (
    <motion.div
      className="courses-pagination"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="courses-pagination-button"
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Previous
      </motion.button>

      <div className="courses-pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={`page-${i + 1}`}
            className={`courses-pagination-number ${
              page === i + 1 ? "courses-pagination-active" : ""
            }`}
            onClick={() => changePage(i + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      <motion.button
        className="courses-pagination-button"
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
    </motion.div>
  );
};

export default HomePagination;
