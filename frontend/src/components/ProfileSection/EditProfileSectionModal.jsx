import React, { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGoogle,
  FaBell,
} from "react-icons/fa";

const EditProfileSectionModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Authentication Details
    firstName: userData.name.split(" ")[0] || "",
    lastName: userData.name.split(" ")[1] || "",
    username: userData.username || "",
    email: userData.email || "",
    password: "",
    confirmPassword: "",
    phone: userData.phone || "",
    profilePicture: null,

    // Educational Details
    college: userData.college || "",
    degreeProgram: userData.degreeProgram || "",
    major: userData.major || "",
    yearOfStudy: userData.yearOfStudy || "",
    enrollmentNumber: userData.enrollmentNumber || "",
    collegeEmail: userData.collegeEmail || "",

    // Learning Preferences
    learningInterests: userData.learningInterests || [],
    learningStyle: userData.learningStyle || "Visual",
    dailyLearningTime: userData.dailyLearningTime || "1hr/day",
    timeZone:
      userData.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,

    // Profile and Personalization
    gender: userData.gender || "",
    dateOfBirth: userData.dateOfBirth || "",
    location: userData.location || "",
    bio: userData.bio || "",
    linkedin: userData.socials?.linkedin?.replace("linkedin.com/in/", "") || "",
    github: userData.socials?.github?.replace("github.com/", "") || "",

    // Notification & Privacy Preferences
    emailUpdates: userData.emailUpdates !== false,
    discoverable: userData.discoverable !== false,
    allowMessaging: userData.allowMessaging !== false,
  });

  const [currentTab, setCurrentTab] = useState("authentication");
  const [skillLevel, setSkillLevel] = useState(
    userData.skillLevel || "Beginner"
  );
  const [techStack, setTechStack] = useState(userData.techStack || []);
  const [newTech, setNewTech] = useState("");
  const [learningGoals, setLearningGoals] = useState(
    userData.learningGoals || []
  );
  const [newGoal, setNewGoal] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleAddTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTech = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleAddGoal = () => {
    if (newGoal.trim() && !learningGoals.includes(newGoal.trim())) {
      setLearningGoals([...learningGoals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const handleRemoveGoal = (goal) => {
    setLearningGoals(learningGoals.filter((g) => g !== goal));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      socials: {
        linkedin: formData.linkedin
          ? `linkedin.com/in/${formData.linkedin}`
          : "",
        github: formData.github ? `github.com/${formData.github}` : "",
        twitter: userData.socials?.twitter || "",
      },
      skillLevel,
      techStack,
      learningGoals,
    };
    onSave(updatedData);
    onClose();
  };

  return (
    <div className="ps-modal-overlay">
      <div className="ps-modal-container">
        <div className="ps-modal-header">
          <h2>Edit Profile</h2>
          <button className="ps-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="ps-modal-tabs">
          {[
            "authentication",
            "education",
            "learning",
            "profile",
            "notifications",
          ].map((tab) => (
            <button
              key={tab}
              className={`ps-modal-tab ${currentTab === tab ? "active" : ""}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="ps-modal-form">
          <div className="ps-modal-content">
            {currentTab === "authentication" && (
              <>
                <h3>Authentication Details</h3>
                <div className="ps-form-group">
                  <label>
                    <FaUser /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ps-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ps-form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaLock /> Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                  />
                </div>

                {formData.password && (
                  <div className="ps-form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="ps-form-group">
                  <label>
                    <FaPhone /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="ps-form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="profilePicture"
                  />
                </div>
              </>
            )}

            {currentTab === "education" && (
              <>
                <h3>
                  <FaGraduationCap /> Educational Details
                </h3>
                <div className="ps-form-group">
                  <label>College/University</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div className="ps-form-group">
                  <label>Degree Program</label>
                  <select
                    name="degreeProgram"
                    value={formData.degreeProgram}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="B.E">B.E</option>
                    <option value="MBA">MBA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="ps-form-group">
                  <label>Major/Branch</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="ps-form-group">
                  <label>Year of Study</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                    <option value="Postgrad">Postgrad</option>
                  </select>
                </div>

                <div className="ps-form-group">
                  <label>Enrollment Number</label>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="ps-form-group">
                  <label>College Email</label>
                  <input
                    type="email"
                    name="collegeEmail"
                    value={formData.collegeEmail}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {currentTab === "learning" && (
              <>
                <h3>Learning Preferences</h3>
                <div className="ps-form-group">
                  <label>Skill Level</label>
                  <div className="ps-radio-group">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <label key={level} className="ps-radio-label">
                        <input
                          type="radio"
                          name="skillLevel"
                          checked={skillLevel === level}
                          onChange={() => setSkillLevel(level)}
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="ps-form-group">
                  <label>Tech Stack</label>
                  <div className="ps-tags-input">
                    <div className="ps-tags-container">
                      {techStack.map((tech, index) => (
                        <span key={index} className="ps-tag">
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(tech)}
                            className="ps-tag-remove"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="ps-tag-input">
                      <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        placeholder="Add technology"
                        onKeyPress={(e) => e.key === "Enter" && handleAddTech()}
                      />
                      <button
                        type="button"
                        onClick={handleAddTech}
                        disabled={!newTech.trim()}
                        className="ps-tag-add-btn"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ps-form-group">
                  <label>Learning Goals</label>
                  <div className="ps-tags-input">
                    <div className="ps-tags-container">
                      {learningGoals.map((goal, index) => (
                        <span key={index} className="ps-tag">
                          {goal}
                          <button
                            type="button"
                            onClick={() => handleRemoveGoal(goal)}
                            className="ps-tag-remove"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="ps-tag-input">
                      <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add learning goal"
                        onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
                      />
                      <button
                        type="button"
                        onClick={handleAddGoal}
                        disabled={!newGoal.trim()}
                        className="ps-tag-add-btn"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ps-form-group">
                  <label>Preferred Learning Style</label>
                  <select
                    name="learningStyle"
                    value={formData.learningStyle}
                    onChange={handleChange}
                  >
                    <option value="Visual">Visual</option>
                    <option value="Textual">Textual</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Auditory">Auditory</option>
                  </select>
                </div>

                <div className="ps-form-group">
                  <label>Daily Learning Time</label>
                  <select
                    name="dailyLearningTime"
                    value={formData.dailyLearningTime}
                    onChange={handleChange}
                  >
                    <option value="30min/day">30 min/day</option>
                    <option value="1hr/day">1 hr/day</option>
                    <option value="2hr/day">2 hr/day</option>
                    <option value="3hr/day">3 hr/day</option>
                    <option value="4+hr/day">4+ hr/day</option>
                  </select>
                </div>

                <div className="ps-form-group">
                  <label>Time Zone</label>
                  <select
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                  >
                    {Intl.supportedValuesOf("timeZone").map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {currentTab === "profile" && (
              <>
                <h3>Profile & Personalization</h3>
                <div className="ps-form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaCalendarAlt /> Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaMapMarkerAlt /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="ps-form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaLinkedin /> LinkedIn Username
                  </label>
                  <div className="ps-social-input">
                    <span>linkedin.com/in/</span>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="ps-form-group">
                  <label>
                    <FaGithub /> GitHub Username
                  </label>
                  <div className="ps-social-input">
                    <span>github.com/</span>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            {currentTab === "notifications" && (
              <>
                <h3>
                  <FaBell /> Notification & Privacy Preferences
                </h3>
                <div className="ps-form-group ps-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="emailUpdates"
                      checked={formData.emailUpdates}
                      onChange={handleChange}
                    />
                    Receive Email Updates
                  </label>
                </div>

                <div className="ps-form-group ps-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="discoverable"
                      checked={formData.discoverable}
                      onChange={handleChange}
                    />
                    Allow Discoverability by Other Users
                  </label>
                </div>

                <div className="ps-form-group ps-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="allowMessaging"
                      checked={formData.allowMessaging}
                      onChange={handleChange}
                    />
                    Allow Messaging/Connect Requests
                  </label>
                </div>
              </>
            )}
          </div>

          <div className="ps-modal-footer">
            <button type="button" className="ps-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ps-modal-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileSectionModal;
