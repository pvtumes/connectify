import React, { useState, useEffect } from "react";
import "./HomeSecionEvents.css";
import { motion, AnimatePresence } from "framer-motion";

const HomeSecionEvents = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for demo purposes
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - would come from API in real implementation
const featuredEvents = [
  {
    id: "fe1",
    title: "AI Innovators Hackathon",
    category: "hackathon",
    endTime: new Date(Date.now() + 172800000), // 48 hours from now
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    participants: 342,
  },
  {
    id: "fe2",
    title: "React Masters Challenge",
    category: "contest",
    endTime: new Date(Date.now() + 86400000), // 24 hours from now
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    participants: 156,
  },
  {
    id: "fe3",
    title: "Data Science Workshop",
    category: "workshop",
    endTime: new Date(Date.now() + 43200000), // 12 hours from now
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    participants: 89,
  },
];

const upcomingEvents = [
  {
    id: "ue1",
    title: "Blockchain Development Bootcamp",
    description: "Learn to build dApps and smart contracts.",
    category: "workshop",
    date: new Date(Date.now() + 345600000), // 4 days from now
    image:
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    difficulty: "intermediate",
    isFree: false,
  },
  {
    id: "ue2",
    title: "Code Golf Championship",
    description: "Solve challenges with the least characters possible.",
    category: "contest",
    date: new Date(Date.now() + 432000000), // 5 days from now
    image:
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    difficulty: "advanced",
    isFree: true,
  },
  {
    id: "ue3",
    title: "Python Basics Quiz",
    description: "Test your Python fundamentals.",
    category: "quiz",
    date: new Date(Date.now() + 259200000), // 3 days from now
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    difficulty: "beginner",
    isFree: true,
  },
  {
    id: "ue4",
    title: "DevOps CI/CD Battle",
    description: "Compete to build the best deployment pipeline.",
    category: "battle",
    date: new Date(Date.now() + 518400000), // 6 days from now
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    difficulty: "advanced",
    isFree: false,
  },
  {
    id: "ue5",
    title: "Mobile App Hackathon",
    description: "Build a mobile app in 48 hours.",
    category: "hackathon",
    date: new Date(Date.now() + 604800000), // 7 days from now
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    difficulty: "intermediate",
    isFree: true,
  },
];

const recentWinners = [
  {
    id: "rw1",
    name: "Alex Johnson",
    event: "Web3 Hackathon",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "rw2",
    name: "Maria Garcia",
    event: "Algorithm Battle",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "rw3",
    name: "Jamal Williams",
    event: "Frontend Quiz",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
];

  // Filtered events based on search and category
  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  // Function to format countdown time
  const formatCountdown = (endTime) => {
    const diff = endTime - new Date();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Function to format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("eo_dark-mode");
  };

  // Toggle admin mode (for demo)
  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`eo_container ${darkMode ? "eo_dark-mode" : ""}`}>
      {/* Header Section */}
      <motion.header
        className="eo_header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="eo_header-content">
          <h1 className="eo_title">Hack the Future</h1>
          <p className="eo_subtitle">
            Participate in hackathons, coding battles, quizzes & more!
          </p>
        </div>
        <div className="eo_header-actions">
          <div className="eo_search-container">
            <input
              type="text"
              className="eo_search-input"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="eo_search-button">
              <i className="eo_search-icon">🔍</i>
            </button>
          </div>

          <button className="eo_theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button className="eo_admin-toggle" onClick={toggleAdminMode}>
            {isAdmin ? "User Mode" : "Admin Mode"}
          </button>

          {isAdmin ? (
            <button
              className="eo_create-event-btn"
              onClick={() => setShowModal(true)}
            >
              + Create Event
            </button>
          ) : (
            <button className="eo_explore-btn">Explore Events</button>
          )}
        </div>
      </motion.header>

      {/* Featured Events Carousel */}
      <section className="eo_featured-events">
        <h2 className="eo_section-title">Ongoing Events</h2>
        <div className="eo_carousel-container">
          <button
            className="eo_carousel-nav eo_prev"
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + featuredEvents.length) % featuredEvents.length
              )
            }
          >
            ❮
          </button>

          <div className="eo_carousel-track">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="eo_carousel-slide"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="eo_featured-event-card"
                  style={{
                    backgroundImage: `url(${featuredEvents[currentSlide].image})`,
                  }}
                >
                  <div className="eo_featured-event-content">
                    <span
                      className={`eo_category-tag eo_tag-${featuredEvents[currentSlide].category}`}
                    >
                      {featuredEvents[currentSlide].category}
                    </span>
                    <h3 className="eo_featured-event-title">
                      {featuredEvents[currentSlide].title}
                    </h3>
                    <div className="eo_featured-event-info">
                      <span className="eo_timer">
                        ⏱️{" "}
                        {formatCountdown(featuredEvents[currentSlide].endTime)}{" "}
                        remaining
                      </span>
                      <span className="eo_participants">
                        👥 {featuredEvents[currentSlide].participants}{" "}
                        participants
                      </span>
                    </div>
                    <button className="eo_join-now-btn">Join Now</button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="eo_carousel-nav eo_next"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % featuredEvents.length)
            }
          >
            ❯
          </button>

          <div className="eo_carousel-indicators">
            {featuredEvents.map((_, index) => (
              <button
                key={`indicator-${index}`}
                className={`eo_indicator ${
                  index === currentSlide ? "eo_active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="eo_category-filters">
        <button
          className={`eo_filter-btn ${
            activeCategory === "all" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        <button
          className={`eo_filter-btn ${
            activeCategory === "hackathon" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("hackathon")}
        >
          Hackathons
        </button>
        <button
          className={`eo_filter-btn ${
            activeCategory === "quiz" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("quiz")}
        >
          Quizzes
        </button>
        <button
          className={`eo_filter-btn ${
            activeCategory === "contest" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("contest")}
        >
          Contests
        </button>
        <button
          className={`eo_filter-btn ${
            activeCategory === "workshop" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("workshop")}
        >
          Workshops
        </button>
        <button
          className={`eo_filter-btn ${
            activeCategory === "battle" ? "eo_active" : ""
          }`}
          onClick={() => setActiveCategory("battle")}
        >
          Battles
        </button>
      </section>

      {/* Upcoming Events Grid */}
      <section className="eo_upcoming-events">
        <h2 className="eo_section-title">Upcoming Events</h2>

        {filteredEvents.length === 0 ? (
          <div className="eo_no-events">
            <p>No events found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="eo_events-grid">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="eo_event-card"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="eo_event-image"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <span className={`eo_category-tag eo_tag-${event.category}`}>
                    {event.category}
                  </span>
                </div>
                <div className="eo_event-details">
                  <h3 className="eo_event-title">{event.title}</h3>
                  <p className="eo_event-description">{event.description}</p>
                  <div className="eo_event-meta">
                    <span className="eo_event-date">
                      🗓️ {formatDate(event.date)}
                    </span>
                    <div className="eo_event-badges">
                      <span
                        className={`eo_difficulty-badge eo_difficulty-${event.difficulty}`}
                      >
                        {event.difficulty}
                      </span>
                      <span
                        className={`eo_price-badge ${
                          event.isFree ? "eo_free" : "eo_paid"
                        }`}
                      >
                        {event.isFree ? "Free" : "Paid"}
                      </span>
                    </div>
                  </div>
                  <button className="eo_register-btn">Register Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Leaderboard / Recent Winners */}
      <section className="eo_winners-section">
        <h2 className="eo_section-title">Recent Winners</h2>
        <div className="eo_winners-grid">
          {recentWinners.map((winner) => (
            <motion.div
              key={winner.id}
              className="eo_winner-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={winner.avatar}
                alt={winner.name}
                className="eo_winner-avatar"
              />
              <div className="eo_winner-info">
                <h3 className="eo_winner-name">{winner.name}</h3>
                <p className="eo_winner-event">{winner.event}</p>
              </div>
              <div className="eo_winner-badge">🏆</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Create Your Own Event CTA */}
      <section className="eo_create-event-section">
        <div className="eo_create-event-container">
          <div className="eo_create-event-content">
            <h2 className="eo_create-title">Have an Event Idea?</h2>
            <p className="eo_create-description">
              Share your knowledge or challenge the community with your own
              event!
            </p>
            <button className="eo_host-btn" onClick={() => setShowModal(true)}>
              Host Event
            </button>
          </div>
          <div className="eo_create-event-decoration">
            <div className="eo_decoration-circle eo_circle-1"></div>
            <div className="eo_decoration-circle eo_circle-2"></div>
            <div className="eo_decoration-circle eo_circle-3"></div>
          </div>
        </div>
      </section>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="eo_modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="eo_modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="eo_close-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2 className="eo_modal-title">Create New Event</h2>

              <form className="eo_event-form">
                <div className="eo_form-group">
                  <label className="eo_form-label">Event Title</label>
                  <input
                    type="text"
                    className="eo_form-input"
                    placeholder="Enter event title"
                  />
                </div>

                <div className="eo_form-group">
                  <label className="eo_form-label">Event Type</label>
                  <select className="eo_form-select">
                    <option value="hackathon">Hackathon</option>
                    <option value="quiz">Quiz</option>
                    <option value="contest">Contest</option>
                    <option value="workshop">Workshop</option>
                    <option value="battle">Battle</option>
                  </select>
                </div>

                <div className="eo_form-group">
                  <label className="eo_form-label">Description</label>
                  <textarea
                    className="eo_form-textarea"
                    placeholder="Describe your event"
                  ></textarea>
                </div>

                <div className="eo_form-row">
                  <div className="eo_form-group eo_half">
                    <label className="eo_form-label">Start Date</label>
                    <input type="date" className="eo_form-input" />
                  </div>

                  <div className="eo_form-group eo_half">
                    <label className="eo_form-label">Start Time</label>
                    <input type="time" className="eo_form-input" />
                  </div>
                </div>

                <div className="eo_form-row">
                  <div className="eo_form-group eo_half">
                    <label className="eo_form-label">Difficulty</label>
                    <select className="eo_form-select">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="eo_form-group eo_half">
                    <label className="eo_form-label">Entry Fee</label>
                    <select className="eo_form-select">
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div className="eo_form-group">
                  <label className="eo_form-label">Upload Event Image</label>
                  <div className="eo_file-upload">
                    <input
                      type="file"
                      id="eo_event-image"
                      className="eo_file-input"
                    />
                    <label htmlFor="eo_event-image" className="eo_file-label">
                      Choose file
                    </label>
                  </div>
                </div>

                <div className="eo_form-actions">
                  <button
                    type="button"
                    className="eo_cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="eo_submit-btn">
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="eo_footer">
        <p>© 2025 Hack the Future. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeSecionEvents;
