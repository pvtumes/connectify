import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiCreditCard,
  FiTarget,
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiMoon,
  FiSun,
  FiEdit,
  FiUpload,
  FiTrash2,
  FiDownload,
  FiAlertTriangle,
} from "react-icons/fi";
import "./CourseSettings.css";

const CourseSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const saveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const resetSettings = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      // Reset logic would go here
    }
  };

  return (
    <div
      className={`settings-page-container ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Header */}
      <motion.header
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="user-profile-summary">
          <div className="avatar-container">
            <img
              src="/api/placeholder/40/40"
              alt="User avatar"
              className="user-avatar"
            />
          </div>
          <div className="user-info">
            <h3>Alex Johnson</h3>
            <p>alex.johnson@example.com</p>
          </div>
        </div>

        <div className="subscription-badge">
          <span>Pro Plan</span>
        </div>

        <div className="header-actions">
          <motion.button
            className="edit-profile-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection("profile")}
          >
            <FiEdit /> Edit Profile
          </motion.button>

          <motion.button
            className="theme-toggle-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <FiSun className="sun-icon" />
            ) : (
              <FiMoon className="moon-icon" />
            )}
          </motion.button>

          <motion.button
            className="reset-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSettings}
          >
            <FiRefreshCw /> Reset
          </motion.button>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.div
        className="settings-nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.button
          className={`nav-btn ${activeSection === "profile" ? "active" : ""}`}
          whileHover={{ backgroundColor: darkMode ? "#3a3a3a" : "#f0f0f0" }}
          onClick={() => setActiveSection("profile")}
        >
          <FiUser /> Profile
        </motion.button>
        <motion.button
          className={`nav-btn ${activeSection === "security" ? "active" : ""}`}
          whileHover={{ backgroundColor: darkMode ? "#3a3a3a" : "#f0f0f0" }}
          onClick={() => setActiveSection("security")}
        >
          <FiLock /> Security
        </motion.button>
        <motion.button
          className={`nav-btn ${activeSection === "billing" ? "active" : ""}`}
          whileHover={{ backgroundColor: darkMode ? "#3a3a3a" : "#f0f0f0" }}
          onClick={() => setActiveSection("billing")}
        >
          <FiCreditCard /> Billing
        </motion.button>
        <motion.button
          className={`nav-btn ${activeSection === "learning" ? "active" : ""}`}
          whileHover={{ backgroundColor: darkMode ? "#3a3a3a" : "#f0f0f0" }}
          onClick={() => setActiveSection("learning")}
        >
          <FiTarget /> Learning
        </motion.button>
        <motion.button
          className={`nav-btn ${activeSection === "advanced" ? "active" : ""}`}
          whileHover={{ backgroundColor: darkMode ? "#3a3a3a" : "#f0f0f0" }}
          onClick={() => setActiveSection("advanced")}
        >
          <FiSettings /> Advanced
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="settings-main-content">
        <AnimatePresence mode="wait">
          {activeSection === "profile" && (
            <SettingsCard
              key="profile"
              title="Profile Settings"
              icon={<FiUser className="section-icon" />}
            >
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  <img
                    src="/api/placeholder/100/100"
                    alt="Profile"
                    className="profile-picture"
                  />
                  <motion.div
                    className="upload-overlay"
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    <FiUpload />
                  </motion.div>
                </div>
                <motion.button
                  className="upload-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#4a6cf7" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Photo
                </motion.button>
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue="Alex Johnson"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="email-field-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue="alex.johnson@example.com"
                    readOnly
                    className="form-input email-input"
                  />
                  <motion.button
                    className="change-email-btn"
                    whileHover={{ scale: 1.05, backgroundColor: "#4a6cf7" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Change
                  </motion.button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio / About Me</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className="form-input"
                  defaultValue="Learning enthusiast and professional developer with a passion for technology and education."
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location (Optional)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue="San Francisco, CA"
                  className="form-input"
                />
              </div>
            </SettingsCard>
          )}

          {activeSection === "security" && (
            <SettingsCard
              key="security"
              title="Account & Security"
              icon={<FiLock className="section-icon" />}
            >
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                />
              </div>

              <div className="form-group switch-group">
                <div className="switch-label">
                  <label>Two-Factor Authentication</label>
                  <p className="helper-text">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="form-group switch-group">
                <div className="switch-label">
                  <label>Receive Product Updates</label>
                  <p className="helper-text">
                    Get notified about new features and improvements
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="form-group switch-group">
                <div className="switch-label">
                  <label>Promotional Emails</label>
                  <p className="helper-text">
                    Receive special offers and promotions
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <motion.button
                  className="deactivate-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#e94560" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Deactivate Account
                </motion.button>
              </div>
            </SettingsCard>
          )}

          {activeSection === "billing" && (
            <SettingsCard
              key="billing"
              title="Subscription & Billing"
              icon={<FiCreditCard className="section-icon" />}
            >
              <div className="current-plan-section">
                <div className="plan-badge pro">Pro Plan</div>
                <p className="plan-description">
                  Access to all premium features and content
                </p>
                <div className="plan-details">
                  <div className="plan-detail">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">$15.99/month</span>
                  </div>
                  <div className="plan-detail">
                    <span className="detail-label">Renewal Date:</span>
                    <span className="detail-value">May 15, 2025</span>
                  </div>
                </div>
              </div>

              <div className="payment-method-section">
                <h4>Payment Method</h4>
                <div className="payment-card">
                  <div className="card-info">
                    <div className="card-type visa"></div>
                    <span className="card-number">•••• •••• •••• 4567</span>
                  </div>
                  <div className="card-expiry">Expires 09/26</div>
                </div>
                <motion.button
                  className="update-payment-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#4a6cf7" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Update Payment Method
                </motion.button>
              </div>

              <div className="subscription-actions">
                <motion.button
                  className="change-plan-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#4a6cf7" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Change Plan
                </motion.button>
                <motion.button
                  className="cancel-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel Subscription
                </motion.button>
              </div>

              <div className="billing-history">
                <h4>Billing History</h4>
                <div className="billing-items">
                  <div className="billing-item">
                    <div className="billing-date">April 15, 2025</div>
                    <div className="billing-amount">$15.99</div>
                    <motion.button
                      className="invoice-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Invoice
                    </motion.button>
                  </div>
                  <div className="billing-item">
                    <div className="billing-date">March 15, 2025</div>
                    <div className="billing-amount">$15.99</div>
                    <motion.button
                      className="invoice-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Invoice
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  className="view-all-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All History
                </motion.button>
              </div>
            </SettingsCard>
          )}

          {activeSection === "learning" && (
            <SettingsCard
              key="learning"
              title="Learning Preferences"
              icon={<FiTarget className="section-icon" />}
            >
              <div className="form-group">
                <label htmlFor="reminderTime">Daily Reminder Time</label>
                <input
                  type="time"
                  id="reminderTime"
                  name="reminderTime"
                  defaultValue="09:00"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="defaultFilter">Default Course Filter</label>
                <select
                  id="defaultFilter"
                  name="defaultFilter"
                  className="form-input"
                >
                  <option value="enrolled">Show Enrolled First</option>
                  <option value="recommended">Show Recommended First</option>
                  <option value="popular">Show Popular First</option>
                  <option value="newest">Show Newest First</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="calendarView">Calendar View Preference</label>
                <select
                  id="calendarView"
                  name="calendarView"
                  className="form-input"
                >
                  <option value="week">Week View</option>
                  <option value="month">Month View</option>
                  <option value="day">Day View</option>
                </select>
              </div>

              <div className="notification-settings">
                <h4>Notification Preferences</h4>

                <div className="form-group switch-group">
                  <div className="switch-label">
                    <label>Email Notifications</label>
                    <p className="helper-text">
                      Receive course updates and reminders via email
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-group switch-group">
                  <div className="switch-label">
                    <label>Push Notifications</label>
                    <p className="helper-text">Receive alerts on your device</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-group switch-group">
                  <div className="switch-label">
                    <label>In-App Notifications</label>
                    <p className="helper-text">
                      See notifications within the application
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="form-group appearance-group">
                <h4>Appearance Mode</h4>
                <div className="appearance-options">
                  <motion.div
                    className={`appearance-option ${!darkMode ? "active" : ""}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDarkMode(false)}
                  >
                    <FiSun className="appearance-icon" />
                    <span>Light</span>
                  </motion.div>
                  <motion.div
                    className={`appearance-option ${darkMode ? "active" : ""}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDarkMode(true)}
                  >
                    <FiMoon className="appearance-icon" />
                    <span>Dark</span>
                  </motion.div>
                  <motion.div
                    className="appearance-option"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSettings className="appearance-icon" />
                    <span>System</span>
                  </motion.div>
                </div>
              </div>
            </SettingsCard>
          )}

          {activeSection === "advanced" && (
            <SettingsCard
              key="advanced"
              title="Advanced Settings"
              icon={<FiSettings className="section-icon" />}
            >
              <div className="data-export-section">
                <h4>Data Export</h4>
                <p>Download all your personal data in a portable format</p>
                <motion.button
                  className="export-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#4a6cf7" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload /> Export Data
                </motion.button>
              </div>

              <div className="danger-zone-advanced">
                <h4>Danger Zone</h4>
                <p>The following actions cannot be undone</p>

                <motion.button
                  className="reset-all-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#ff9800" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiRefreshCw /> Reset All Settings
                </motion.button>

                <motion.button
                  className="delete-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#e94560" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTrash2 /> Delete Account Permanently
                </motion.button>
              </div>

              <div className="account-data-section">
                <h4>Account Data</h4>
                <div className="data-metrics">
                  <div className="data-metric">
                    <div className="metric-value">52 MB</div>
                    <div className="metric-label">Storage Used</div>
                  </div>
                  <div className="data-metric">
                    <div className="metric-value">15</div>
                    <div className="metric-label">Courses Completed</div>
                  </div>
                  <div className="data-metric">
                    <div className="metric-value">243</div>
                    <div className="metric-label">Days Active</div>
                  </div>
                </div>
              </div>

              <div className="beta-features-section">
                <h4>Beta Features</h4>
                <div className="form-group switch-group">
                  <div className="switch-label">
                    <label>AI Learning Assistant</label>
                    <p className="helper-text">Early access to AI features</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </SettingsCard>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Save Button */}
      <motion.div
        className="sticky-save-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.button
          className={`save-btn ${isSaving ? "saving" : ""}`}
          whileHover={{ scale: 1.05, backgroundColor: "#4caf50" }}
          whileTap={{ scale: 0.95 }}
          onClick={saveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="spinner"></div>
              Saving...
            </>
          ) : (
            <>
              <FiSave /> Save Changes
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast success-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <span>✅ Settings saved successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Settings Card Component
const SettingsCard = ({ title, icon, children, key }) => {
  return (
    <motion.div
      className="settings-card"
      key={key}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        {icon}
        <h2>{title}</h2>
      </div>
      <div className="card-content">{children}</div>
    </motion.div>
  );
};

export default CourseSettings;
