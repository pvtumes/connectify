import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ModalLoginSignup from "./ModalLoginSignup"; // Import the modal component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add this smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`specify-navbar ${
        isScrolled ? "specify-navbar-scrolled" : ""
      }`}
    >
      <div className="specify-container">
        <div className="specify-logo-container">
          <a href="/" className="specify-logo">
            <img
              src="/logo.png"
              alt="Specify Logo"
              className="specify-logo-img"
            />
            <span className="specify-logo-text">Connectify</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="specify-nav-links-desktop">
          <a
            href="#home"
            className="specify-nav-link"
            onClick={(e) => handleSmoothScroll(e, "#home")}
          >
            Home
          </a>
          <a
            href="#features"
            className="specify-nav-link"
            onClick={(e) => handleSmoothScroll(e, "#features")}
          >
            Features
          </a>
          <a
            href="#benefits"
            className="specify-nav-link"
            onClick={(e) => handleSmoothScroll(e, "#benefits")}
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            className="specify-nav-link"
            onClick={(e) => handleSmoothScroll(e, "#testimonials")}
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="specify-nav-link"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
          >
            Contact
          </a>
        </div>

        <div className="specify-auth-buttons-desktop">
          <button className="specify-login-btn" onClick={handleOpenModal}>
            Login
          </button>
          <button className="specify-signup-btn" onClick={handleOpenModal}>
            Sign up
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="specify-mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span
            className={`specify-hamburger ${
              isMenuOpen ? "specify-hamburger-active" : ""
            }`}
          ></span>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`specify-mobile-menu ${
            isMenuOpen ? "specify-mobile-menu-active" : ""
          }`}
        >
          <div className="specify-nav-links-mobile">
            <a
              href="#home"
              className="specify-nav-link-mobile"
              onClick={(e) => handleSmoothScroll(e, "#home")}
            >
              Home
            </a>
            <a
              href="#features"
              className="specify-nav-link-mobile"
              onClick={(e) => handleSmoothScroll(e, "#features")}
            >
              Features
            </a>
            <a
              href="#benefits"
              className="specify-nav-link-mobile"
              onClick={(e) => handleSmoothScroll(e, "#benefits")}
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="specify-nav-link-mobile"
              onClick={(e) => handleSmoothScroll(e, "#testimonials")}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="specify-nav-link-mobile"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              Contact
            </a>
          </div>

          <div className="specify-auth-buttons-mobile">
            <button
              className="specify-login-btn-mobile"
              onClick={handleOpenModal}
            >
              Login
            </button>
            <button
              className="specify-signup-btn-mobile"
              onClick={handleOpenModal}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Render the ModalLoginSignup component */}
      <ModalLoginSignup isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* You can place your login/signup form content here */}
        <div>
          <h2>Login or Sign Up</h2>
          {/* Add your login and signup form elements here */}
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Submit</button>
        </div>
      </ModalLoginSignup>
    </nav>
  );
};

export default Navbar;
