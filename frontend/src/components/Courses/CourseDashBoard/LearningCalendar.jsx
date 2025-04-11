import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Clock,
  BookOpen,
  X,
  Timer,
} from "lucide-react";
import "./LearningCalendar.css";

const LearningCalendar = ({ onSchedule, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [duration, setDuration] = useState(60);
  const [courses, setCourses] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setCourses([
      { id: "course1", title: "Introduction to React" },
      { id: "course2", title: "Advanced JavaScript Patterns" },
      { id: "course3", title: "UI/UX Design Fundamentals" },
      { id: "course4", title: "Data Structures in Python" },
    ]);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Matches animation duration
  };

  const getCurrentMonthDays = () => {
    const date = new Date(selectedDate);
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleSchedule = () => {
    const selectedCourseObj = courses.find((c) => c.id === selectedCourse);
    onSchedule({
      date: selectedDate,
      time: selectedTime,
      courseId: selectedCourse,
      courseTitle: selectedCourseObj?.title || "",
      duration,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <motion.div
      className="calendar-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="calendar-modal"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: isClosing ? 0.9 : 1,
          opacity: isClosing ? 0 : 1,
        }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="calendar-header">
          <h2>📆 Schedule Learning Session</h2>
          <button
            onClick={handleClose}
            className="close-button"
            title="Close"
            disabled={isClosing}
            aria-label="Close calendar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="calendar-month-navigation">
          <button onClick={handlePrevMonth} className="nav-button">
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <h3>{formatDate(selectedDate)}</h3>
          <button onClick={handleNextMonth} className="nav-button">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}

          {getCurrentMonthDays().map((date, idx) => (
            <motion.div
              key={idx}
              className={`calendar-day ${!date ? "empty-day" : ""} ${
                date && isToday(date) ? "today" : ""
              } ${
                date &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
                  ? "selected-day"
                  : ""
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleDateClick(date)}
            >
              {date ? date.getDate() : ""}
            </motion.div>
          ))}
        </div>

        <div className="schedule-form">
          <div className="form-group">
            <label>
              <BookOpen size={16} /> Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-control"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <Clock size={16} /> Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>
              <Timer size={16} /> Duration (minutes)
            </label>
            <div className="duration-control">
              <button
                onClick={() => setDuration(Math.max(15, duration - 15))}
                className="duration-button"
              >
                −
              </button>
              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(Math.max(15, parseInt(e.target.value) || 15))
                }
                className="duration-input"
                min="15"
                step="15"
              />
              <button
                onClick={() => setDuration(duration + 15)}
                className="duration-button"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: selectedCourse ? 1.02 : 1 }}
            onClick={handleSchedule}
            disabled={!selectedCourse}
            className={`schedule-button ${
              selectedCourse ? "active" : "disabled"
            }`}
          >
            <Calendar size={16} />
            Schedule Session
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningCalendar;
