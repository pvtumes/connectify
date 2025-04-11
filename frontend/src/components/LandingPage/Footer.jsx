// Footer.jsx
import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription success
    setSubscribed(true);
    // Reset form
    setEmail("");
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="specify-footer">
      <div className="specify-footer-container">
        <div className="specify-footer-main">
          <div className="specify-footer-brand">
            <div className="specify-footer-logo">
              <img
                src="/logo.png"
                alt="Connectify logo"
                width="40"
                height="40"
              />
              <span className="specify-footer-brand-name">Connectify</span>
            </div>
            <p className="specify-footer-tagline">
              Empowering students and professionals to connect, learn, and grow.
            </p>
            <div className="specify-footer-socials">
              <a
                href="#"
                className="specify-footer-social-link"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="specify-footer-social-link"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                className="specify-footer-social-link"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="#"
                className="specify-footer-social-link"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="specify-footer-links">
            <div className="specify-footer-links-group">
              <h3 className="specify-footer-links-title">Features</h3>
              <ul className="specify-footer-links-list">
                <li>
                  <a href="#" className="specify-footer-link">
                    Coding Platform
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Alumni Connections
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Job Opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Hackathons
                  </a>
                </li>
              </ul>
            </div>

            <div className="specify-footer-links-group">
              <h3 className="specify-footer-links-title">Company</h3>
              <ul className="specify-footer-links-list">
                <li>
                  <a href="#" className="specify-footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="specify-footer-links-group">
              <h3 className="specify-footer-links-title">Resources</h3>
              <ul className="specify-footer-links-list">
                <li>
                  <a href="#" className="specify-footer-link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="specify-footer-link">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="specify-footer-newsletter">
            <h3 className="specify-footer-newsletter-title">Stay up to date</h3>
            <p className="specify-footer-newsletter-text">
              Subscribe to our newsletter for updates on new features and
              opportunities.
            </p>
            {subscribed ? (
              <div className="specify-footer-subscribe-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Thank you! You're now subscribed.</span>
              </div>
            ) : (
              <form
                className="specify-footer-subscribe-form"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  className="specify-footer-subscribe-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="specify-footer-subscribe-button"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="specify-footer-bottom">
          <div className="specify-footer-copyright">
            © {new Date().getFullYear()} Connectify. All rights reserved.
          </div>
          <div className="specify-footer-legal">
            <a href="#" className="specify-footer-legal-link">
              Privacy Policy
            </a>
            <a href="#" className="specify-footer-legal-link">
              Terms of Service
            </a>
            <a href="#" className="specify-footer-legal-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
