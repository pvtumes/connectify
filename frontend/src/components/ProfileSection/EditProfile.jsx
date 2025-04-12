import React, { useState, useRef, useEffect } from "react";
import "./EditProfile.css";


const EditProfile = () => {
  // File input ref
  const fileInputRef = useRef(null);

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  // Form visibility states for sections
  const [visibleSection, setVisibleSection] = useState("authentication");

  // Form data state
  const [formData, setFormData] = useState({
    // Authentication Details
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",

    // Educational Details
    university: "",
    degreeProgram: "",
    major: "",
    yearOfStudy: "",
    enrollmentNumber: "",
    collegeEmail: "",

    // Learning Preferences
    learningInterests: [],
    learningStyle: "",
    dailyCommitment: "",
    timeZone: "",

    // Profile & Personalization
    gender: "",
    dateOfBirth: "",
    location: "",
    bio: "",
    linkedinProfile: "",
    githubProfile: "",

    // Skill Level
    skillLevel: "1",
    techStack: "",
    shortTermGoals: "",
    longTermGoals: "",

    // Notification Preferences
    emailUpdates: false,
    allowDiscoverability: false,
    allowMessaging: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "learningInterests") {
      // Handle multi-select for learning interests
      const interests = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setFormData({ ...formData, [name]: interests });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Profile Picture:", profilePicture);

    // Show success notification
    const notification = document.getElementById("success-notification");
    if (notification) {
      notification.classList.add("show");

      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  };

  // Change visible section
  const changeSection = (section) => {
    const formContainer = document.querySelector(
      ".edit-profile-form-container"
    );
    if (formContainer) {
      formContainer.classList.add("section-changing");

      setTimeout(() => {
        setVisibleSection(section);
        formContainer.classList.remove("section-changing");
      }, 300);
    }
  };

  // Get section completion percentage
  const getSectionCompletion = (section) => {
    let fieldsToCheck = [];
    let filledFields = 0;

    switch (section) {
      case "authentication":
        fieldsToCheck = [
          "firstName",
          "lastName",
          "username",
          "email",
          "password",
          "confirmPassword",
        ];
        break;
      case "education":
        fieldsToCheck = ["university", "degreeProgram", "major", "yearOfStudy"];
        break;
      case "learning":
        fieldsToCheck = ["learningStyle", "dailyCommitment", "timeZone"];
        if (formData.learningInterests.length > 0) filledFields++;
        break;
      case "profile":
        fieldsToCheck = [
          "gender",
          "dateOfBirth",
          "location",
          "bio",
          "linkedinProfile",
          "githubProfile",
        ];
        break;
      case "skills":
        fieldsToCheck = [
          "skillLevel",
          "techStack",
          "shortTermGoals",
          "longTermGoals",
        ];
        break;
      case "notifications":
        return 100; // Always complete as it's just toggles
      default:
        return 0;
    }

    // Count filled fields
    fieldsToCheck.forEach((field) => {
      if (formData[field] && formData[field] !== "") {
        filledFields++;
      }
    });

    if (section === "learning" && fieldsToCheck.length === 3) {
      // Special case for learning where we added learningInterests separately
      return Math.round((filledFields / 4) * 100);
    }

    return Math.round((filledFields / fieldsToCheck.length) * 100);
  };

  // Animation for progress indicators on mount
  useEffect(() => {
    const progressBars = document.querySelectorAll(".section-progress-fill");
    if (progressBars) {
      setTimeout(() => {
        progressBars.forEach((bar) => {
          bar.style.opacity = 1;
        });
      }, 500);
    }
  }, []);

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <p className="edit-profile-subtitle">
        Complete your profile to get the most out of Connectify
      </p>

      <div className="edit-profile-content">
        <div className="edit-profile-sidebar">
          <div className="profile-picture-container">
            <div
              className="profile-picture"
              onClick={handleProfilePictureClick}
              style={{
                backgroundImage: previewURL ? `url(${previewURL})` : "none",
              }}
            >
              {!previewURL && <span>Add Photo</span>}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                hidden
              />
            </div>
            <h3 className="profile-name">
              {formData.firstName || formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : "Your Name"}
            </h3>
            <p className="profile-username">
              {formData.username ? `@${formData.username}` : "@username"}
            </p>
          </div>

          <div className="sidebar-sections">
            <div
              className={`sidebar-section ${
                visibleSection === "authentication" ? "active" : ""
              }`}
              onClick={() => changeSection("authentication")}
            >
              <div className="section-header">
                <span className="section-icon">🔐</span>
                <h3 className="section-title">Authentication</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{
                      width: `${getSectionCompletion("authentication")}%`,
                    }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("authentication")}%
                </span>
              </div>
            </div>

            <div
              className={`sidebar-section ${
                visibleSection === "education" ? "active" : ""
              }`}
              onClick={() => changeSection("education")}
            >
              <div className="section-header">
                <span className="section-icon">🎓</span>
                <h3 className="section-title">Education</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{ width: `${getSectionCompletion("education")}%` }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("education")}%
                </span>
              </div>
            </div>

            <div
              className={`sidebar-section ${
                visibleSection === "learning" ? "active" : ""
              }`}
              onClick={() => changeSection("learning")}
            >
              <div className="section-header">
                <span className="section-icon">🧠</span>
                <h3 className="section-title">Learning Preferences</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{ width: `${getSectionCompletion("learning")}%` }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("learning")}%
                </span>
              </div>
            </div>

            <div
              className={`sidebar-section ${
                visibleSection === "profile" ? "active" : ""
              }`}
              onClick={() => changeSection("profile")}
            >
              <div className="section-header">
                <span className="section-icon">👤</span>
                <h3 className="section-title">Profile & Personalization</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{ width: `${getSectionCompletion("profile")}%` }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("profile")}%
                </span>
              </div>
            </div>

            <div
              className={`sidebar-section ${
                visibleSection === "skills" ? "active" : ""
              }`}
              onClick={() => changeSection("skills")}
            >
              <div className="section-header">
                <span className="section-icon">🧩</span>
                <h3 className="section-title">Skills & Goals</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{ width: `${getSectionCompletion("skills")}%` }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("skills")}%
                </span>
              </div>
            </div>

            <div
              className={`sidebar-section ${
                visibleSection === "notifications" ? "active" : ""
              }`}
              onClick={() => changeSection("notifications")}
            >
              <div className="section-header">
                <span className="section-icon">🔔</span>
                <h3 className="section-title">Notifications & Privacy</h3>
              </div>
              <div className="section-progress">
                <div className="section-progress-track">
                  <div
                    className="section-progress-fill"
                    style={{
                      width: `${getSectionCompletion("notifications")}%`,
                    }}
                  ></div>
                </div>
                <span className="section-progress-text">
                  {getSectionCompletion("notifications")}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="edit-profile-form-container">
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            {/* Authentication Details */}
            <div
              className={`form-section ${
                visibleSection === "authentication" ? "visible" : ""
              }`}
              id="authentication-section"
            >
              <h2 className="section-title">Authentication Details</h2>
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username">Username*</label>
                <div className="input-with-icon">
                  <span className="input-icon">@</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number (Optional for 2FA)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => changeSection("education")}
                >
                  Next: Education
                </button>
              </div>
            </div>

            {/* Educational Details */}
            <div
              className={`form-section ${
                visibleSection === "education" ? "visible" : ""
              }`}
              id="education-section"
            >
              <h2 className="section-title">Educational Details</h2>
              <div className="form-group">
                <label htmlFor="university">College/University Name*</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="degreeProgram">Degree Program*</label>
                <select
                  id="degreeProgram"
                  name="degreeProgram"
                  value={formData.degreeProgram}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Degree Program</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.E">B.E</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="major">Branch / Major*</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. Computer Science, Electronics"
                />
              </div>

              <div className="form-group">
                <label htmlFor="yearOfStudy">Year of Study*</label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="enrollmentNumber">
                  Enrollment Number (Optional)
                </label>
                <input
                  type="text"
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="collegeEmail">
                  College Email ID (Optional - for verification)
                </label>
                <input
                  type="email"
                  id="collegeEmail"
                  name="collegeEmail"
                  value={formData.collegeEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button outline"
                  onClick={() => changeSection("authentication")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => changeSection("learning")}
                >
                  Next: Learning Preferences
                </button>
              </div>
            </div>

            {/* Learning Preferences */}
            <div
              className={`form-section ${
                visibleSection === "learning" ? "visible" : ""
              }`}
              id="learning-section"
            >
              <h2 className="section-title">Learning Preferences</h2>
              <div className="form-group">
                <label htmlFor="learningInterests">
                  Learning Interests / Goals*
                </label>
                <input
                  type="text"
                  id="learningInterests"
                  name="learningInterests"
                  value={formData.learningInterests.join(", ")}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. Web Dev, DSA, AI (comma separated)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="learningStyle">Preferred Learning Style*</label>
                <div className="learning-style-options">
                  <div
                    className={`learning-style-option ${
                      formData.learningStyle === "Visual" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="visualStyle"
                      name="learningStyle"
                      value="Visual"
                      checked={formData.learningStyle === "Visual"}
                      onChange={handleChange}
                      hidden
                    />
                    <label htmlFor="visualStyle" className="style-option-label">
                      <span className="style-icon">👁️</span>
                      <span className="style-text">Visual</span>
                    </label>
                  </div>

                  <div
                    className={`learning-style-option ${
                      formData.learningStyle === "Textual" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="textualStyle"
                      name="learningStyle"
                      value="Textual"
                      checked={formData.learningStyle === "Textual"}
                      onChange={handleChange}
                      hidden
                    />
                    <label
                      htmlFor="textualStyle"
                      className="style-option-label"
                    >
                      <span className="style-icon">📝</span>
                      <span className="style-text">Textual</span>
                    </label>
                  </div>

                  <div
                    className={`learning-style-option ${
                      formData.learningStyle === "Interactive" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="interactiveStyle"
                      name="learningStyle"
                      value="Interactive"
                      checked={formData.learningStyle === "Interactive"}
                      onChange={handleChange}
                      hidden
                    />
                    <label
                      htmlFor="interactiveStyle"
                      className="style-option-label"
                    >
                      <span className="style-icon">🖱️</span>
                      <span className="style-text">Interactive</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dailyCommitment">
                  Daily Learning Time Commitment*
                </label>
                <select
                  id="dailyCommitment"
                  name="dailyCommitment"
                  value={formData.dailyCommitment}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Time Commitment</option>
                  <option value="30 minutes/day">30 minutes/day</option>
                  <option value="1 hour/day">1 hour/day</option>
                  <option value="2 hours/day">2 hours/day</option>
                  <option value="3+ hours/day">3+ hours/day</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeZone">Time Zone*</label>
                <select
                  id="timeZone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Time Zone</option>
                  <option value="UTC-12:00">UTC-12:00</option>
                  <option value="UTC-11:00">UTC-11:00</option>
                  <option value="UTC-10:00">UTC-10:00</option>
                  <option value="UTC-09:00">UTC-09:00</option>
                  <option value="UTC-08:00">UTC-08:00 (PST)</option>
                  <option value="UTC-07:00">UTC-07:00 (MST)</option>
                  <option value="UTC-06:00">UTC-06:00 (CST)</option>
                  <option value="UTC-05:00">UTC-05:00 (EST)</option>
                  <option value="UTC-04:00">UTC-04:00</option>
                  <option value="UTC-03:00">UTC-03:00</option>
                  <option value="UTC-02:00">UTC-02:00</option>
                  <option value="UTC-01:00">UTC-01:00</option>
                  <option value="UTC+00:00">UTC+00:00</option>
                  <option value="UTC+01:00">UTC+01:00</option>
                  <option value="UTC+02:00">UTC+02:00</option>
                  <option value="UTC+03:00">UTC+03:00</option>
                  <option value="UTC+04:00">UTC+04:00</option>
                  <option value="UTC+05:00">UTC+05:00</option>
                  <option value="UTC+05:30">UTC+05:30 (IST)</option>
                  <option value="UTC+06:00">UTC+06:00</option>
                  <option value="UTC+07:00">UTC+07:00</option>
                  <option value="UTC+08:00">UTC+08:00</option>
                  <option value="UTC+09:00">UTC+09:00</option>
                  <option value="UTC+10:00">UTC+10:00</option>
                  <option value="UTC+11:00">UTC+11:00</option>
                  <option value="UTC+12:00">UTC+12:00</option>
                </select>
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button outline"
                  onClick={() => changeSection("education")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => changeSection("profile")}
                >
                  Next: Profile
                </button>
              </div>
            </div>

            {/* Profile & Personalization */}
            <div
              className={`form-section ${
                visibleSection === "profile" ? "visible" : ""
              }`}
              id="profile-section"
            >
              <h2 className="section-title">Profile & Personalization</h2>
              <div className="form-group">
                <label htmlFor="gender">Gender (Optional)</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth (Optional)</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location / City (Optional)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Mumbai, India"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio / About Me (Optional)</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us a bit about yourself..."
                  rows={4}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="linkedinProfile">
                  LinkedIn Profile (Optional)
                </label>
                <div className="input-with-icon">
                  <span className="input-icon">linkedin.com/in/</span>
                  <input
                    type="text"
                    id="linkedinProfile"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleChange}
                    className="form-input with-icon"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="githubProfile">GitHub Profile (Optional)</label>
                <div className="input-with-icon">
                  <span className="input-icon">github.com/</span>
                  <input
                    type="text"
                    id="githubProfile"
                    name="githubProfile"
                    value={formData.githubProfile}
                    onChange={handleChange}
                    className="form-input with-icon"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button outline"
                  onClick={() => changeSection("learning")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => changeSection("skills")}
                >
                  Next: Skills
                </button>
              </div>
            </div>

            {/* Skills & Goals */}
            <div
              className={`form-section ${
                visibleSection === "skills" ? "visible" : ""
              }`}
              id="skills-section"
            >
              <h2 className="section-title">Skills & Goals</h2>
              <div className="form-group">
                <label>Self-rated Skill Level*</label>
                <div className="skill-level-slider">
                  <input
                    type="range"
                    id="skillLevel"
                    name="skillLevel"
                    min="1"
                    max="3"
                    step="1"
                    value={formData.skillLevel}
                    onChange={handleChange}
                    className="skill-slider-input"
                    required
                  />
                  <div className="skill-level-labels">
                    <span
                      className={formData.skillLevel === "1" ? "active" : ""}
                    >
                      Beginner
                    </span>
                    <span
                      className={formData.skillLevel === "2" ? "active" : ""}
                    >
                      Intermediate
                    </span>
                    <span
                      className={formData.skillLevel === "3" ? "active" : ""}
                    >
                      Advanced
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="techStack">Tech Stack / Skills*</label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. JavaScript, Python, React (comma separated)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shortTermGoals">
                  Short-term Learning Goals*
                </label>
                <textarea
                  id="shortTermGoals"
                  name="shortTermGoals"
                  value={formData.shortTermGoals}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="What do you want to learn in the next 3-6 months?"
                  rows={3}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="longTermGoals">Long-term Career Goals*</label>
                <textarea
                  id="longTermGoals"
                  name="longTermGoals"
                  value={formData.longTermGoals}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Where do you see yourself in 2-5 years?"
                  rows={3}
                ></textarea>
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button outline"
                  onClick={() => changeSection("profile")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => changeSection("notifications")}
                >
                  Next: Notifications
                </button>
              </div>
            </div>

            {/* Notifications & Privacy */}
            <div
              className={`form-section ${
                visibleSection === "notifications" ? "visible" : ""
              }`}
              id="notifications-section"
            >
              <h2 className="section-title">Notifications & Privacy</h2>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="emailUpdates"
                    name="emailUpdates"
                    checked={formData.emailUpdates}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  Receive email updates and newsletters
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="allowDiscoverability"
                    name="allowDiscoverability"
                    checked={formData.allowDiscoverability}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  Allow others to find me in search results
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="allowMessaging"
                    name="allowMessaging"
                    checked={formData.allowMessaging}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  Allow direct messages from other users
                </label>
              </div>

              <div className="form-button-row">
                <button
                  type="button"
                  className="secondary-button outline"
                  onClick={() => changeSection("skills")}
                >
                  Back
                </button>
                <button type="submit" className="primary-button">
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div id="success-notification" className="success-notification">
        Profile updated successfully!
      </div>
    </div>
  );
};

export default EditProfile;
