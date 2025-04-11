import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for awesome courses..."
          className="search-input"
        />
        <button
          type="submit"
          className="search-submit-button"
          disabled={!query.trim()}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
