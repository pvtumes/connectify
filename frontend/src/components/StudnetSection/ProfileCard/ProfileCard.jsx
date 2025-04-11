import React from "react";
import "./ProfileCard.css";
import { MapPin, Briefcase, Calendar, Award } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="pc-card">
      {/* Cover Photo */}
      <div className="pc-cover-container">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
          alt="Cover"
          className="pc-cover-photo"
        />
      </div>

      {/* Profile Picture */}
      <div className="pc-profile-pic-container">
        <img src="./profile.png" alt="Profile" className="pc-profile-pic" />
        <div className="pc-profile-pic-status"></div>
      </div>

      {/* Profile Info */}
      <div className="pc-info-container">
        <h1 className="pc-name">Umesh Prasad</h1>
        <h2 className="pc-title">Full Stack Web Developer</h2>

        <div className="pc-details">
          <div className="pc-detail-item">
            <MapPin size={16} className="pc-icon" />
            <span>India</span>
          </div>
          <div className="pc-detail-item">
            <Briefcase size={16} className="pc-icon" />
            <span>Computer Science & Business Systems</span>
          </div>
          <div className="pc-detail-item">
            <Calendar size={16} className="pc-icon" />
            <span>Joined April 2025</span>
          </div>
        </div>

        {/* Bio */}
        <p className="pc-bio">
          Passionate about web development, problem-solving, and building
          scalable applications. Persistent in my work and always eager to learn
          and help others.
        </p>

        {/* Stats */}
        <div className="pc-stats">
          <div className="pc-stat">
            <span className="pc-stat-number">1000+</span>
            <span className="pc-stat-label">Connections</span>
          </div>
          <div className="pc-stat">
            <span className="pc-stat-number">50+</span>
            <span className="pc-stat-label">Projects</span>
          </div>
          <div className="pc-stat">
            <span className="pc-stat-number">30+</span>
            <span className="pc-stat-label">Recommendations</span>
          </div>
        </div>

        {/* Badges */}
        <div className="pc-badges">
          <div className="pc-badge">
            <Award size={16} className="pc-badge-icon" />
            <span>Top Developer</span>
          </div>
          <div className="pc-badge">
            <Award size={16} className="pc-badge-icon" />
            <span>Persistent Achiever</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
