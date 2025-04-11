import React, { useState, useEffect } from "react";
import "./CourseLeftSidebar.css";

const CourseLeftSidebar = ({ activeMenu, setActiveMenu }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setExpanded(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: "home", icon: "🏠", text: "Home", notification: 0 },
    { id: "dashboard", icon: "📊", text: "Dashboard", notification: 0 },
    { id: "all-courses", icon: "📚", text: "All Courses", notification: 0 },
    
    
    { id: "calendar", icon: "📅", text: "Calendar", notification: 0 },
    
    
    { id: "resources", icon: "📂", text: "Resources", notification: 2 },
    {
      id: "payment-history",
      icon: "💳",
      text: "Payment History",
      notification: 0,
    },
    { id: "settings", icon: "⚙️", text: "Settings", notification: 0 },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {isMobile && !expanded && (
        <button
          className="lsb-mobile-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Open sidebar menu"
        >
          <span>☰</span>
        </button>
      )}

      <aside
        className={`lsb-sidebar-container ${
          expanded ? "lsb-expanded" : "lsb-collapsed"
        } ${isMobile && expanded ? "lsb-mobile-open" : ""}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="lsb-sidebar-header">
          <div className="lsb-logo-container">
            <span className="lsb-logo-icon">🧠</span>
            {expanded && <h2 className="lsb-logo-text">Connectify</h2>}
          </div>
          <button
            className="lsb-toggle-btn"
            onClick={toggleSidebar}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? "◀" : "▶"}
          </button>
        </div>

        <nav className="lsb-nav-menu">
          <ul className="lsb-menu-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`lsb-menu-item ${
                  activeMenu === item.id ? "lsb-active" : ""
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <div className="lsb-menu-icon-container">
                  <span className="lsb-menu-icon">{item.icon}</span>
                  {item.notification > 0 && (
                    <span className="lsb-notification-badge">
                      {item.notification}
                    </span>
                  )}
                </div>
                {expanded && (
                  <>
                    <span className="lsb-menu-text">{item.text}</span>
                    {activeMenu === item.id && (
                      <span className="lsb-active-indicator"></span>
                    )}
                  </>
                )}

                {!expanded && isHovering && (
                  <div className="lsb-tooltip">
                    <div className="lsb-tooltip-content">{item.text}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="lsb-sidebar-footer">
          <div className="lsb-user-profile">
            <div className="lsb-user-avatar">
              <span>AJ</span>
            </div>
            {expanded && (
              <div className="lsb-user-info">
                <p className="lsb-user-name">Alex Johnson</p>
                <p className="lsb-user-role">Premium Member</p>
              </div>
            )}
          </div>
          <button className="lsb-logout-btn">
            <span className="lsb-logout-icon">🚪</span>
            {expanded && <span className="lsb-logout-text">Log Out</span>}
          </button>
        </div>

        {isMobile && expanded && (
          <div className="lsb-mobile-overlay" onClick={toggleSidebar}></div>
        )}
      </aside>
    </>
  );
};

export default CourseLeftSidebar;
