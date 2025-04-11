import React, { useState } from "react";
import "./MainCourseFile.css";
import CourseLeftSidebar from "./CourseLeftSidebar";
import CoursesData from "./CoursesAllCoursesSection/CoursesData";
import CourseDashBoard from "./CourseDashBoard/CourseDashBoard";
import CoursesHomeSection from "./CoursesHomeSection/CoursesHomeSection";
import CourseLearningCalendar from "./LearningCalendar/CourseLearningCalendar";
import CourseResources from "./CourseResources/CourseResources";
import CoursePaymentHistory from "./CoursePaymentHistory/CoursePaymentHistory";
import CourseSettings from "./CourseSettings/CourseSettings";

const MainCourseFile = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [selectedCourseType, setSelectedCourseType] = useState(null);

  // Function to handle course type selection from the navbar
  const handleCourseTypeSelect = (type) => {
    setSelectedCourseType(type);
    setActiveMenu("all-courses");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <CourseDashBoard />;
      case "home":
        return <CoursesHomeSection />;
      case "all-courses":
        return <CoursesData courseType={selectedCourseType} />;
      case "calendar":
        return <CourseLearningCalendar />;
      case "resources":
        return <CourseResources />;
      case "payment-history":
        return <CoursePaymentHistory />;
      case "settings":
        return <CourseSettings />;
      default:
        return <CoursesHomeSection />;
    }
  };

  return (
    <div className="course-app-container">
      <div className="course-main-content">
        <CourseLeftSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <main className="course-content-container">{renderContent()}</main>
      </div>

      <footer className="course-main-footer">
        <div className="course-footer-content">
          <div className="course-footer-section">
            <h4>About Connectify</h4>
            <p>
              Your premier platform for online learning and professional
              development.
            </p>
          </div>
          <div className="course-footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => e.preventDefault()}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="course-footer-section">
            <h4>Connect With Us</h4>
            <div className="course-social-icons">
              <a href="#facebook" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#twitter" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#instagram" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#linkedin" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="course-footer-bottom">
          <p>© {new Date().getFullYear()} Connectify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainCourseFile;
