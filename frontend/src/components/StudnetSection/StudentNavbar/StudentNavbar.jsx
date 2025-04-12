import React from "react";
import "./StudentNavbar.css";
import {
  FaHome,
  FaBook,
  FaBell,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaCode,
} from "react-icons/fa";

const StudentNavbar = ({ onNavigate }) => {
  const handleNavClick = (view, e) => {
    e.preventDefault();
    onNavigate(view);
  };

  return (
    <nav className="sn-navbar">
      <div className="sn-nav-container">
        <div className="sn-logo-container">
          <img src="/logo.png" alt="Connectify" className="sn-logo-img" />
          <span className="sn-logo-text">Connectify</span>
        </div>

        <ul className="sn-nav-links">
          {/* Home Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("home", e)}
            >
              <FaHome className="sn-nav-icon" />
              <span>Home</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Courses Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("courses", e)}
            >
              <FaBook className="sn-nav-icon" />
              <span>Courses</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Code of the Day Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("codeOfTheDay", e)}
            >
              <FaCode className="sn-nav-icon" />
              <span>Code of the Day</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Events Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("events", e)}
            >
              <FaCalendarAlt className="sn-nav-icon" />
              <span>Events</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Notifications Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("notifications", e)}
            >
              <FaBell className="sn-nav-icon" />
              <span>Notifications</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Opportunities Link */}
          <li className="sn-nav-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("opportunities", e)}
            >
              <FaBriefcase className="sn-nav-icon" />
              <span>Opportunities</span>
              <div className="sn-hover-line"></div>
            </a>
          </li>

          {/* Profile Link */}
          <li className="sn-nav-item sn-profile-item">
            <a
              href="#"
              className="sn-nav-link"
              onClick={(e) => handleNavClick("profile", e)}
            >
              <div className="sn-profile-container">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="sn-profile-pic"
                />
                <span>Profile</span>
              </div>
              <div className="sn-hover-line"></div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StudentNavbar;
