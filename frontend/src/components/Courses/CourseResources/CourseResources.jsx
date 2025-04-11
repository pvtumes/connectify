import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CourseResources.css";

const CourseResources = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setResources([
        {
          id: 1,
          title: "ReactJS Notes – Chapter 3",
          course: "Full Stack Web Dev",
          type: "PDF",
          tags: ["Revision", "Reference"],
          dateAdded: "2025-03-28",
          views: 128,
          isBookmarked: false,
          isReviewed: false,
          estimatedTime: 30,
        },
        {
          id: 2,
          title: "Database Design Fundamentals",
          course: "Database Systems",
          type: "Video",
          tags: ["Tutorial", "Practice"],
          dateAdded: "2025-04-01",
          views: 84,
          isBookmarked: true,
          isReviewed: true,
          estimatedTime: 45,
        },
        {
          id: 3,
          title: "Python Data Structures",
          course: "Algorithms and Data Structures",
          type: "Code",
          tags: ["Reference", "Practice"],
          dateAdded: "2025-04-03",
          views: 67,
          isBookmarked: false,
          isReviewed: false,
          estimatedTime: 60,
        },
        {
          id: 4,
          title: "UI/UX Design Principles",
          course: "Web Design",
          type: "Slides",
          tags: ["Notes", "Exam"],
          dateAdded: "2025-03-25",
          views: 203,
          isBookmarked: true,
          isReviewed: false,
          estimatedTime: 25,
        },
        {
          id: 5,
          title: "JavaScript ES6 Features",
          course: "Full Stack Web Dev",
          type: "PDF",
          tags: ["Reference", "Exam"],
          dateAdded: "2025-04-02",
          views: 91,
          isBookmarked: false,
          isReviewed: true,
          estimatedTime: 40,
        },
        {
          id: 6,
          title: "Machine Learning Basics",
          course: "AI Fundamentals",
          type: "Assignment",
          tags: ["Practice", "Tutorial"],
          dateAdded: "2025-03-30",
          views: 156,
          isBookmarked: true,
          isReviewed: false,
          estimatedTime: 90,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter resources based on search query and filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    const matchesCourse =
      selectedCourse === "all" || resource.course === selectedCourse;
    const matchesTag =
      selectedTag === "all" || resource.tags.includes(selectedTag);

    return matchesSearch && matchesType && matchesCourse && matchesTag;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "views":
        return b.views - a.views;
      case "alpha":
        return a.title.localeCompare(b.title);
      case "reverse-alpha":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Get unique courses for filter dropdown
  const courses = [...new Set(resources.map((resource) => resource.course))];

  // Get unique types for filter dropdown
  const types = [...new Set(resources.map((resource) => resource.type))];

  // Get unique tags for filter dropdown
  const tags = [...new Set(resources.flatMap((resource) => resource.tags))];

  // Calculate total unreviewed resources estimated time
  const totalEstimatedTime = resources
    .filter((resource) => !resource.isReviewed)
    .reduce((total, resource) => total + resource.estimatedTime, 0);

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
      )
    );
  };

  // Toggle reviewed status
  const toggleReviewed = (id) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, isReviewed: !resource.isReviewed }
          : resource
      )
    );
  };

  // Get appropriate icon for resource type
  const getTypeIcon = (type) => {
    switch (type) {
      case "PDF":
        return "📄";
      case "Video":
        return "🎥";
      case "Code":
        return "💻";
      case "Slides":
        return "📊";
      case "Assignment":
        return "📝";
      default:
        return "📁";
    }
  };

  // Get color for resource type
  const getTypeColor = (type) => {
    switch (type) {
      case "PDF":
        return "resourceType_pdf";
      case "Video":
        return "resourceType_video";
      case "Code":
        return "resourceType_code";
      case "Slides":
        return "resourceType_slides";
      case "Assignment":
        return "resourceType_assignment";
      default:
        return "resourceType_default";
    }
  };

  return (
    <div className="resourcesLibrary_container">
      {/* Top Navigation Bar */}
      <motion.div
        className="resourcesLibrary_topbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="resourcesLibrary_searchContainer">
          <input
            type="text"
            className="resourcesLibrary_searchInput"
            placeholder="🔍 Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="resourcesLibrary_controls">
          <motion.button
            className="resourcesLibrary_filterButton"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterVisible(!filterVisible)}
          >
            🔘 Filter/Sort
          </motion.button>

          <motion.button
            className="resourcesLibrary_uploadButton"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUploadModalOpen(true)}
          >
            📥 Upload
          </motion.button>

          <div className="resourcesLibrary_viewToggle">
            <motion.button
              className={`resourcesLibrary_viewButton ${
                viewMode === "grid" ? "active" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
            >
              🔲
            </motion.button>
            <motion.button
              className={`resourcesLibrary_viewButton ${
                viewMode === "list" ? "active" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
            >
              📄
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {filterVisible && (
          <motion.div
            className="resourcesLibrary_filterDropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="resourcesLibrary_filterSection">
              <h3>Filter By</h3>
              <div className="resourcesLibrary_filterControls">
                <div className="resourcesLibrary_filterGroup">
                  <label>Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="resourcesLibrary_select"
                  >
                    <option value="all">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="resourcesLibrary_filterGroup">
                  <label>Course:</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="resourcesLibrary_select"
                  >
                    <option value="all">All Courses</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="resourcesLibrary_filterGroup">
                  <label>Tag:</label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="resourcesLibrary_select"
                  >
                    <option value="all">All Tags</option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="resourcesLibrary_filterGroup">
                  <label>Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="resourcesLibrary_select"
                  >
                    <option value="date">Date Added</option>
                    <option value="views">Most Viewed</option>
                    <option value="alpha">A-Z</option>
                    <option value="reverse-alpha">Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="resourcesLibrary_tagChips">
              {tags.map((tag) => (
                <motion.button
                  key={tag}
                  className={`resourcesLibrary_tagChip ${
                    selectedTag === tag ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? "all" : tag)
                  }
                >
                  🏷️ {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Type filter chips */}
      <div className="resourcesLibrary_typeChips">
        {types.map((type) => (
          <motion.button
            key={type}
            className={`resourcesLibrary_typeChip ${
              selectedType === type ? "active" : ""
            } ${getTypeColor(type)}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedType(selectedType === type ? "all" : type)
            }
          >
            {getTypeIcon(type)} {type}
          </motion.button>
        ))}
      </div>

      {/* Main Resource Display Area */}
      <div
        className={`resourcesLibrary_resourcesContainer ${
          viewMode === "grid" ? "grid" : "list"
        }`}
      >
        {isLoading ? (
          <div className="resourcesLibrary_loading">
            <div className="resourcesLibrary_spinner"></div>
            <p>Loading resources...</p>
          </div>
        ) : sortedResources.length === 0 ? (
          <div className="resourcesLibrary_noResults">
            <h3>No resources found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          sortedResources.map((resource) => (
            <motion.div
              key={resource.id}
              className={`resourcesLibrary_resourceCard ${
                viewMode === "grid" ? "grid" : "list"
              }`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className={`resourcesLibrary_resourceIcon ${getTypeColor(
                  resource.type
                )}`}
              >
                {getTypeIcon(resource.type)}
              </div>

              <div className="resourcesLibrary_resourceInfo">
                <h3 className="resourcesLibrary_resourceTitle">
                  {resource.title}
                </h3>
                <p className="resourcesLibrary_resourceCourse">
                  📚 {resource.course}
                </p>

                <div className="resourcesLibrary_resourceTags">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="resourcesLibrary_tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="resourcesLibrary_resourceMeta">
                  <span className="resourcesLibrary_resourceDate">
                    📅 {new Date(resource.dateAdded).toLocaleDateString()}
                  </span>
                  <span className="resourcesLibrary_resourceViews">
                    👁️ {resource.views}
                  </span>
                  <span className="resourcesLibrary_resourceTime">
                    ⏱️ {resource.estimatedTime} mins
                  </span>
                </div>
              </div>

              <div className="resourcesLibrary_resourceActions">
                <motion.button
                  className="resourcesLibrary_actionButton resourcesLibrary_viewButton"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="View resource"
                >
                  ⬇️
                </motion.button>

                <motion.button
                  className={`resourcesLibrary_actionButton resourcesLibrary_bookmarkButton ${
                    resource.isBookmarked ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleBookmark(resource.id)}
                  aria-label={
                    resource.isBookmarked ? "Remove bookmark" : "Add bookmark"
                  }
                >
                  {resource.isBookmarked ? "❤️" : "🤍"}
                </motion.button>

                <motion.button
                  className={`resourcesLibrary_actionButton resourcesLibrary_reviewedButton ${
                    resource.isReviewed ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleReviewed(resource.id)}
                  aria-label={
                    resource.isReviewed
                      ? "Mark as unreviewed"
                      : "Mark as reviewed"
                  }
                >
                  {resource.isReviewed ? "✅" : "⬜"}
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <motion.div
        className="resourcesLibrary_footer"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="resourcesLibrary_statsContainer">
          <div className="resourcesLibrary_stat">
            <span className="resourcesLibrary_statLabel">Total Resources:</span>
            <span className="resourcesLibrary_statValue">
              {resources.length}
            </span>
          </div>
          <div className="resourcesLibrary_stat">
            <span className="resourcesLibrary_statLabel">
              Estimated Study Time:
            </span>
            <span className="resourcesLibrary_statValue">
              {totalEstimatedTime} mins
            </span>
          </div>
          <div className="resourcesLibrary_stat">
            <span className="resourcesLibrary_statLabel">Bookmarked:</span>
            <span className="resourcesLibrary_statValue">
              {resources.filter((resource) => resource.isBookmarked).length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            className="resourcesLibrary_modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUploadModalOpen(false)}
          >
            <motion.div
              className="resourcesLibrary_uploadModal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Upload Resource</h2>
              <form className="resourcesLibrary_uploadForm">
                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-title">Title:</label>
                  <input
                    type="text"
                    id="resource-title"
                    className="resourcesLibrary_input"
                    placeholder="Enter resource title"
                  />
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-course">Course:</label>
                  <select
                    id="resource-course"
                    className="resourcesLibrary_select"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-type">Type:</label>
                  <select
                    id="resource-type"
                    className="resourcesLibrary_select"
                  >
                    <option value="">Select resource type</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label>Tags:</label>
                  <div className="resourcesLibrary_tagSelector">
                    {tags.map((tag) => (
                      <label key={tag} className="resourcesLibrary_tagCheckbox">
                        <input type="checkbox" name="tags" value={tag} />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-file">Upload File:</label>
                  <div className="resourcesLibrary_fileUpload">
                    <input type="file" id="resource-file" />
                  </div>
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-link">Or Resource Link:</label>
                  <input
                    type="text"
                    id="resource-link"
                    className="resourcesLibrary_input"
                    placeholder="https://"
                  />
                </div>

                <div className="resourcesLibrary_formGroup">
                  <label htmlFor="resource-description">Description:</label>
                  <textarea
                    id="resource-description"
                    className="resourcesLibrary_textarea"
                    placeholder="Enter resource description"
                    rows="3"
                  ></textarea>
                </div>

                <div className="resourcesLibrary_formActions">
                  <motion.button
                    type="button"
                    className="resourcesLibrary_cancelButton"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="resourcesLibrary_submitButton"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upload Resource
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseResources;
