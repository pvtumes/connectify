import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CourseLearningCalendar.css";

const CourseLearningCalendar = () => {
  // State for calendar data
  const [view, setView] = useState("week"); // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [learningHours, setLearningHours] = useState(12);
  const [streak, setStreak] = useState(5);
  const [courses, setCourses] = useState(3);
  const [progress, setProgress] = useState(65); // percentage

  // Sample learning sessions data
  const [learningSessions, setLearningSessions] = useState([
    {
      id: 1,
      course: "React Masterclass",
      topic: "React Hooks",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        9,
        0
      ),
      duration: 90, // minutes
      completed: true,
      color: "#4285F4",
      notes: "Focus on useEffect and custom hooks",
      resources: ["https://reactjs.org/docs/hooks-intro.html"],
      reminder: true,
    },
    {
      id: 2,
      course: "Advanced CSS",
      topic: "CSS Grid Layout",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        13,
        30
      ),
      duration: 60,
      completed: false,
      color: "#0F9D58",
      notes: "Practice with grid-template-areas",
      resources: [],
      reminder: false,
    },
    {
      id: 3,
      course: "TypeScript Fundamentals",
      topic: "Interfaces vs Types",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
        11,
        0
      ),
      duration: 120,
      completed: false,
      color: "#DB4437",
      notes: "Compare with advanced types",
      resources: [
        "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      ],
      reminder: true,
    },
    {
      id: 4,
      course: "Node.js Backend",
      topic: "Express Middleware",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 2,
        15,
        0
      ),
      duration: 90,
      completed: false,
      color: "#F4B400",
      notes: "Build custom error handling middleware",
      resources: [],
      reminder: true,
    },
  ]);

  // Form state for adding new sessions
  const [newSession, setNewSession] = useState({
    course: "",
    topic: "",
    date: new Date(),
    time: "09:00",
    duration: 60,
    notes: "",
    repeat: false,
    reminder: false,
    color: "#4285F4",
  });

  // Handle view changes
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Navigate to previous period
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Handle session completion toggle
  const toggleCompletion = (id) => {
    setLearningSessions(
      learningSessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSession({
      ...newSession,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle new session submission
  const handleSessionSubmit = (e) => {
    e.preventDefault();

    // Create date object from date and time inputs
    const dateTime = new Date(newSession.date);
    const [hours, minutes] = newSession.time.split(":").map(Number);
    dateTime.setHours(hours, minutes);

    const newSessionData = {
      id: Date.now(),
      course: newSession.course,
      topic: newSession.topic,
      date: dateTime,
      duration: parseInt(newSession.duration),
      completed: false,
      color: newSession.color,
      notes: newSession.notes,
      resources: [],
      reminder: newSession.reminder,
    };

    setLearningSessions([...learningSessions, newSessionData]);
    setShowModal(false);

    // Reset form
    setNewSession({
      course: "",
      topic: "",
      date: new Date(),
      time: "09:00",
      duration: 60,
      notes: "",
      repeat: false,
      reminder: false,
      color: "#4285F4",
    });
  };

  // Get sessions for the current view
  const getSessionsForView = () => {
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);

    let endDate;
    if (view === "day") {
      endDate = new Date(startOfDay);
      endDate.setDate(endDate.getDate() + 1);
    } else if (view === "week") {
      // Get the start of the week (Sunday)
      const dayOfWeek = startOfDay.getDay();
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

      endDate = new Date(startOfWeek);
      endDate.setDate(endDate.getDate() + 7);

      return {
        startDate: startOfWeek,
        endDate,
        sessions: learningSessions.filter(
          (session) => session.date >= startOfWeek && session.date < endDate
        ),
      };
    } else {
      // month view
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      return {
        startDate: startOfMonth,
        endDate: new Date(endOfMonth.getTime() + 86400000),
        sessions: learningSessions.filter(
          (session) =>
            session.date >= startOfMonth && session.date <= endOfMonth
        ),
      };
    }

    return {
      startDate: startOfDay,
      endDate,
      sessions: learningSessions.filter(
        (session) => session.date >= startOfDay && session.date < endDate
      ),
    };
  };

  // Generate view based on current selection
  const renderCalendarView = () => {
    const viewData = getSessionsForView();

    if (view === "day") {
      return renderDayView(viewData);
    } else if (view === "week") {
      return renderWeekView(viewData);
    } else {
      return renderMonthView(viewData);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format times for display
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // Render day view
  const renderDayView = ({ sessions }) => {
    // Create time slots from 6am to 10pm
    const timeSlots = [];
    for (let i = 6; i <= 22; i++) {
      timeSlots.push(i);
    }

    return (
      
      <div className="lc-day-view">
        <h3 className="lc-view-date">{formatDate(currentDate)}</h3>
        <div className="lc-time-slots">
          {timeSlots.map((hour) => {
            const sessionsAtTime = sessions.filter(
              (session) => session.date.getHours() === hour
            );
            return (
              <div key={hour} className="lc-time-slot">
                <div className="lc-time-marker">
                  {hour % 12 === 0 ? "12" : hour % 12}:00{" "}
                  {hour >= 12 ? "PM" : "AM"}
                </div>
                <div className="lc-sessions-container">
                  {sessionsAtTime.map((session) => renderSessionCard(session))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = ({ startDate, sessions }) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      days.push(day);
    }

    return (
      <div className="lc-week-view">
        <div className="lc-week-header">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`lc-day-column-header ${
                day.getDate() === new Date().getDate() ? "lc-current-day" : ""
              }`}
            >
              <span className="lc-day-name">
                {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
                  day
                )}
              </span>
              <span className="lc-day-number">{day.getDate()}</span>
            </div>
          ))}
        </div>
        <div className="lc-week-grid">
          {days.map((day) => {
            const dayStart = new Date(day);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(day);
            dayEnd.setHours(23, 59, 59, 999);

            const daySessions = sessions.filter(
              (session) => session.date >= dayStart && session.date <= dayEnd
            );

            return (
              <div
                key={day.toISOString()}
                className={`lc-day-column ${
                  day.getDate() === new Date().getDate() ? "lc-current-day" : ""
                }`}
              >
                {daySessions.map((session) => renderSessionCard(session))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render month view
  const renderMonthView = ({ startDate, sessions }) => {
    const startOfMonth = new Date(startDate);
    const firstDay = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get the last day of the month
    const lastDay = new Date(
      startOfMonth.getFullYear(),
      startOfMonth.getMonth() + 1,
      0
    ).getDate();

    // Create calendar grid with previous and next month days
    const days = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(
      startOfMonth.getFullYear(),
      startOfMonth.getMonth(),
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push({
        date: new Date(
          startOfMonth.getFullYear(),
          startOfMonth.getMonth() - 1,
          prevMonthLastDay - firstDay + i + 1
        ),
        currentMonth: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i),
        currentMonth: true,
      });
    }

    // Add days for next month to fill the grid (6 rows of 7 days = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(
          startOfMonth.getFullYear(),
          startOfMonth.getMonth() + 1,
          i
        ),
        currentMonth: false,
      });
    }

    return (
      <div className="lc-month-view">
        <div className="lc-month-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="lc-day-header">
              {day}
            </div>
          ))}
        </div>
        <div className="lc-month-grid">
          {days.map(({ date, currentMonth }) => {
            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);

            const daySessions = sessions.filter(
              (session) => session.date >= dayStart && session.date <= dayEnd
            );

            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={date.toISOString()}
                className={`lc-month-day ${
                  !currentMonth ? "lc-other-month" : ""
                } ${isToday ? "lc-today" : ""}`}
              >
                <div className="lc-month-day-header">
                  <span className="lc-month-day-number">{date.getDate()}</span>
                  {daySessions.length > 0 && (
                    <span
                      className={`lc-session-dot ${
                        daySessions.length > 2 ? "lc-multiple-sessions" : ""
                      }`}
                    >
                      {daySessions.length}
                    </span>
                  )}
                </div>
                <div className="lc-month-day-sessions">
                  {daySessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className="lc-month-session"
                      style={{ backgroundColor: session.color }}
                    >
                      <span>{session.course}</span>
                    </div>
                  ))}
                  {daySessions.length > 3 && (
                    <div className="lc-more-sessions">
                      +{daySessions.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render a session card
  const renderSessionCard = (session) => {
    return (
      <motion.div
        key={session.id}
        className={`lc-session-card ${session.completed ? "lc-completed" : ""}`}
        style={{
          backgroundColor: `${session.color}20`,
          borderLeft: `4px solid ${session.color}`,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        layout
        whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
      >
        <div className="lc-session-header">
          <h4 className="lc-course-name">{session.course}</h4>
          <div className="lc-session-actions">
            {session.reminder && <span className="lc-reminder-icon">🔔</span>}
            <input
              type="checkbox"
              className="lc-completion-checkbox"
              checked={session.completed}
              onChange={() => toggleCompletion(session.id)}
            />
          </div>
        </div>
        <div className="lc-session-topic">{session.topic}</div>
        <div className="lc-session-time">
          <span>
            ⏱️ {formatTime(session.date)} • {session.duration} min
          </span>
        </div>
        {session.notes && (
          <div className="lc-session-notes">
            <p>{session.notes}</p>
          </div>
        )}
        {session.resources.length > 0 && (
          <div className="lc-session-resources">
            <span className="lc-resource-icon">📎</span>
            <span className="lc-resource-count">
              {session.resources.length} resource
              {session.resources.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </motion.div>
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "n" || e.key === "N") {
        setShowModal(true);
      } else if (e.key === "t" || e.key === "T") {
        goToToday();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="learning-calendar-container">
      {/* Top Navigation Bar */}
      <motion.div
        className="lc-top-bar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lc-nav-section">
          <div className="lc-search-container">
            <input
              type="text"
              className="lc-search-input"
              placeholder="🔍 Search sessions, topics, or courses..."
            />
          </div>
        </div>

        <div className="lc-nav-section">
          <button className="lc-today-btn" onClick={goToToday}>
            Today
          </button>
          <div className="lc-nav-arrows">
            <button className="lc-nav-btn" onClick={goToPrevious}>
              ❮
            </button>
            <div className="lc-current-period">
              {view === "day" && formatDate(currentDate)}
              {view === "week" &&
                `Week of ${formatDate(getSessionsForView().startDate)}`}
              {view === "month" &&
                new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(currentDate)}
            </div>
            <button className="lc-nav-btn" onClick={goToNext}>
              ❯
            </button>
          </div>
          <div className="lc-view-switcher">
            <button
              className={`lc-view-btn ${view === "day" ? "lc-active" : ""}`}
              onClick={() => handleViewChange("day")}
            >
              Day
            </button>
            <button
              className={`lc-view-btn ${view === "week" ? "lc-active" : ""}`}
              onClick={() => handleViewChange("week")}
            >
              Week
            </button>
            <button
              className={`lc-view-btn ${view === "month" ? "lc-active" : ""}`}
              onClick={() => handleViewChange("month")}
            >
              Month
            </button>
          </div>
        </div>

        <div className="lc-nav-section">
          <div className="lc-weekly-summary">
            <span>🧮 {learningHours} hrs learned this week</span>
          </div>
          <button className="lc-add-btn" onClick={() => setShowModal(true)}>
            + Add Session
          </button>
        </div>
      </motion.div>

      {/* Main Calendar Area */}
      <motion.div
        className="lc-calendar-area"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {renderCalendarView()}
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        className="lc-stats-bar"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="lc-stat-item">
          <span className="lc-stat-label">Total Hours</span>
          <span className="lc-stat-value">{learningHours}h</span>
        </div>
        <div className="lc-stat-item lc-progress-container">
          <span className="lc-stat-label">Goal Progress</span>
          <div className="lc-progress-bar">
            <div
              className="lc-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="lc-stat-value">{progress}%</span>
        </div>
        <div className="lc-stat-item">
          <span className="lc-stat-label">Streak</span>
          <span className="lc-stat-value lc-streak">🔥 {streak} days</span>
        </div>
        <div className="lc-stat-item">
          <span className="lc-stat-label">Active Courses</span>
          <span className="lc-stat-value">{courses}</span>
        </div>
        <div className="lc-stat-item lc-upcoming">
          <span className="lc-stat-label">Next Session</span>
          <span className="lc-stat-value">
            {learningSessions.filter((s) => s.date > new Date() && !s.completed)
              .length > 0
              ? formatDate(
                  learningSessions
                    .filter((s) => s.date > new Date() && !s.completed)
                    .sort((a, b) => a.date - b.date)[0].date
                )
              : "None scheduled"}
          </span>
        </div>
      </motion.div>

      {/* Add Session Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="lc-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="lc-add-modal"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className="lc-modal-header">
                <h3>Add Learning Session</h3>
                <button
                  className="lc-close-modal"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSessionSubmit} className="lc-session-form">
                <div className="lc-form-row">
                  <div className="lc-form-group">
                    <label htmlFor="course">Course</label>
                    <input
                      type="text"
                      id="course"
                      name="course"
                      value={newSession.course}
                      onChange={handleInputChange}
                      placeholder="e.g. React Masterclass"
                      required
                    />
                  </div>
                  <div className="lc-form-group">
                    <label htmlFor="topic">Topic</label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      value={newSession.topic}
                      onChange={handleInputChange}
                      placeholder="e.g. React Hooks"
                      required
                    />
                  </div>
                </div>

                <div className="lc-form-row">
                  <div className="lc-form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={
                        new Date(newSession.date).toISOString().split("T")[0]
                      }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="lc-form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={newSession.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="lc-form-group">
                    <label htmlFor="duration">Duration (min)</label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={newSession.duration}
                      onChange={handleInputChange}
                      min="5"
                      step="5"
                      required
                    />
                  </div>
                </div>

                <div className="lc-form-row">
                  <div className="lc-form-group lc-color-select">
                    <label>Color</label>
                    <div className="lc-color-options">
                      {[
                        "#4285F4",
                        "#DB4437",
                        "#0F9D58",
                        "#F4B400",
                        "#9C27B0",
                        "#3F51B5",
                      ].map((color) => (
                        <div
                          key={color}
                          className={`lc-color-option ${
                            newSession.color === color ? "lc-selected" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            setNewSession({ ...newSession, color })
                          }
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lc-form-row">
                  <div className="lc-form-group">
                    <label htmlFor="notes">Notes (optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={newSession.notes}
                      onChange={handleInputChange}
                      placeholder="What will you learn in this session?"
                    />
                  </div>
                </div>

                <div className="lc-form-row lc-checkbox-row">
                  <div className="lc-form-group lc-checkbox-group">
                    <input
                      type="checkbox"
                      id="repeat"
                      name="repeat"
                      checked={newSession.repeat}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="repeat">Repeat weekly</label>
                  </div>
                  <div className="lc-form-group lc-checkbox-group">
                    <input
                      type="checkbox"
                      id="reminder"
                      name="reminder"
                      checked={newSession.reminder}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="reminder">Set reminder</label>
                  </div>
                </div>

                <div className="lc-form-actions">
                  <button
                    type="button"
                    className="lc-cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="lc-save-btn">
                    Save Session
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut info */}
      <div className="lc-keyboard-shortcuts">
        Press <kbd>N</kbd> for new session • <kbd>T</kbd> for today
      </div>
    </div>
  );
};

export default CourseLearningCalendar;
