import React from "react";
import "./StudentSectionFooter.css";

const StudentSectionFooter = () => {
  return (
    <footer className="connectify-footer">
      <div className="footer-flex-container">
        {/* First Group - Logo and Copyright */}
        <div className="footer-group">
          <img src="logo.png" alt="Connectify" className="footer-logo" />
          <span className="copyright">
            Connectify Corporation © {new Date().getFullYear()}
          </span>
        </div>

        {/* Second Group - About Links */}
        <div className="footer-group">
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/accessibility" className="footer-link">
            Accessibility
          </a>
          <a href="/help-center" className="footer-link">
            Help Center
          </a>
        </div>

        {/* Third Group - Privacy Links */}
        <div className="footer-group">
          <div className="footer-link-with-dropdown">
            <a href="/privacy" className="footer-link">
              Privacy & Terms
            </a>
            <span className="dropdown-icon">▼</span>
          </div>
          <a href="/ad-choices" className="footer-link">
            Ad Choices
          </a>
        </div>

        {/* Fourth Group - Business Links */}
        <div className="footer-group">
          <a href="/advertising" className="footer-link">
            Advertising
          </a>
          <div className="footer-link-with-dropdown">
            <a href="/business-services" className="footer-link">
              Business Services
            </a>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>

        {/* Fifth Group - App Links */}
        <div className="footer-group">
          <a href="/get-app" className="footer-link">
            Get the Connectify app
          </a>
          <a href="/more" className="footer-link">
            More
          </a>
        </div>
      </div>
    </footer>
  );
};

export default StudentSectionFooter;
