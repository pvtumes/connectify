import React, { useState } from "react";
import "./Home.css";
import ModalLoginSignup from "./ModalLoginSignup";

const Home = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="connectify-home">
      {/* Hero Section */}
      <div id="home" className="connectify-hero-container">
        <div className="connectify-hero-content">
          <h1 className="connectify-hero-title">
            Empower Your Learning with Industry Connections
          </h1>
          <p className="connectify-hero-description">
            Connectify is your gateway to learning with industry experts,
            showcasing your skills, and landing your dream job.
          </p>
          <div className="connectify-cta-buttons">
            <button className="connectify-cta-primary" onClick={openModal}>
              Get Started
            </button>
            <a href="#benefits" className="connectify-cta-secondary">
              Learn More
            </a>
          </div>
        </div>

        <div className="connectify-hero-visual">
          {/* 3D Illustration */}
          <div className="connectify-3d-platform">
            <div className="connectify-platform-base"></div>
            <div className="connectify-3d-icon connectify-icon-1">
              <span>🧠</span>
            </div>
            <div className="connectify-3d-icon connectify-icon-2">
              <span>💻</span>
            </div>
            <div className="connectify-3d-icon connectify-icon-3">
              <span>🔗</span>
            </div>
            <div className="connectify-3d-icon connectify-icon-4">
              <span>🚀</span>
            </div>
            <div className="connectify-3d-icon connectify-icon-5">
              <span>📚</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="connectify-trusted-section">
        <p className="connectify-trusted-text"></p>
        <div className="connectify-logo-container">
          {/* <div className="connectify-logo">Google</div>
          <div className="connectify-logo">Microsoft</div>
          <div className="connectify-logo">Amazon</div>
          <div className="connectify-logo">Meta</div>
          <div className="connectify-logo">Apple</div> */}
        </div>
      </div>

      {/* Modal Component */}
      <ModalLoginSignup isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
