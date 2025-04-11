import React from "react";
import { motion } from "framer-motion";

const HomeSearchAndFilters = ({
  searchQuery,
  handleSearchChange,
  searchSuggestions,
  selectSuggestion,
  selectedDomain,
  setSelectedDomain,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  allDomains,
  difficultyLevels,
  setPage,
}) => {
  return (
    <div className="courses-search-filter-container">
      {/* Search with autocomplete */}
      <div className="courses-search-container">
        <input
          type="text"
          className="courses-search-input"
          placeholder="Search courses or topics..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchSuggestions.length > 0 && (
          <motion.ul
            className="courses-search-suggestions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {searchSuggestions.map((suggestion, index) => (
              <li
                key={`suggestion-${index}`}
                onClick={() => {
                  selectSuggestion(suggestion);
                  setPage(1);
                }}
                className="courses-search-suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Domain filter */}
      <div className="courses-filter-group">
        <select
          className="courses-select-filter"
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Domains</option>
          {allDomains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty filter */}
      <div className="courses-filter-group">
        <select
          className="courses-select-filter"
          value={selectedDifficulty}
          onChange={(e) => {
            setSelectedDifficulty(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Levels</option>
          {difficultyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Sort options */}
      <div className="courses-filter-group">
        <select
          className="courses-select-filter"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default HomeSearchAndFilters;
