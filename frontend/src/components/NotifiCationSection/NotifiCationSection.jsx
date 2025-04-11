import React, { useState, useEffect } from 'react';
import './NotifiCationSection.css';

const NotifiCationSection = () => {
  // States
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [notificationPreferences, setNotificationPreferences] = useState({
    eventUpdates: true,
    courseReminders: true,
    mentions: true,
    adminAnnouncements: true,
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    soundAlerts: false,
  });

  // Mock data fetch
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockNotifications = [
        {
          id: 1,
          type: 'system',
          title: 'New feature launched!',
          message: 'Check out our new collaboration tools',
          timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
          read: false,
          actionText: 'Explore',
          actionUrl: '#explore'
        },
        {
          id: 2,
          type: 'course',
          title: 'Course progress update',
          message: 'Your Data Structures course progress is at 80%',
          timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
          read: false,
          actionText: 'Continue',
          actionUrl: '#course'
        },
        {
          id: 3,
          type: 'event',
          title: 'Leaderboard updated',
          message: 'You ranked #5 in the Quiz Wars competition',
          timestamp: new Date(Date.now() - 5 * 60 * 60000), // 5 hours ago
          read: true,
          actionText: 'View Results',
          actionUrl: '#results'
        },
        {
          id: 4,
          type: 'social',
          title: 'Mentioned in comment',
          message: 'Alex mentioned you in a discussion about React hooks',
          timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
          read: false,
          actionText: 'Reply',
          actionUrl: '#comment'
        },
        {
          id: 5,
          type: 'invitation',
          title: 'Group invitation',
          message: 'You were invited to join "DSA Squad"',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
          read: true,
          actionText: 'Join',
          actionUrl: '#join'
        },
        {
          id: 6,
          type: 'system',
          title: 'Scheduled maintenance',
          message: 'Platform will be down for maintenance on Sunday 2AM-4AM',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
          read: true,
          actionText: 'Details',
          actionUrl: '#maintenance'
        },
        {
          id: 7,
          type: 'course',
          title: 'New course available',
          message: 'Advanced React Patterns course is now available',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60000), // 5 days ago
          read: false,
          actionText: 'Enroll',
          actionUrl: '#enroll'
        },
        {
          id: 8,
          type: 'invitation',
          title: 'Event invitation',
          message: 'Youve been invited to the "Spring Hackathon"',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60000), // 6 days ago
          read: false,
          actionText: 'RSVP',
          actionUrl: '#rsvp'
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    };
    
    fetchNotifications();
  }, []);

  // Filter notifications based on active filter and search query
  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === activeFilter);
    }
    
    // Apply read/unread filter
    if (activeFilter === 'unread') {
      filtered = filtered.filter(notification => !notification.read);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(notification => 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply date filter
    if (dateFilter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(notification => notification.timestamp >= today);
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(notification => notification.timestamp >= weekAgo);
    }
    
    return filtered;
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  // Mark single notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Delete notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return 'Yesterday';
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    
    return timestamp.toLocaleDateString();
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'system': return <span className="alert-icon">🛠️</span>;
      case 'course': return <span className="alert-icon">📘</span>;
      case 'event': return <span className="alert-icon">🏁</span>;
      case 'social': return <span className="alert-icon">💬</span>;
      case 'invitation': return <span className="alert-icon">📩</span>;
      default: return <span className="alert-icon">📣</span>;
    }
  };

  // Get notification count for badges
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Group notifications by day
  const groupNotificationsByDay = () => {
    const filteredNotifications = getFilteredNotifications();
    const grouped = {
      'Today': [],
      'Yesterday': [],
      'This Week': [],
      'Earlier': []
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    filteredNotifications.forEach(notification => {
      const timestamp = notification.timestamp;
      if (timestamp >= today) {
        grouped['Today'].push(notification);
      } else if (timestamp >= yesterday) {
        grouped['Yesterday'].push(notification);
      } else if (timestamp >= weekAgo) {
        grouped['This Week'].push(notification);
      } else {
        grouped['Earlier'].push(notification);
      }
    });
    
    return grouped;
  };

  // Toggle notification settings
  const toggleNotificationSetting = (setting) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [setting]: !notificationPreferences[setting]
    });
  };

  // Delete all read notifications
  const deleteAllRead = () => {
    const unreadNotifications = notifications.filter(notification => !notification.read);
    setNotifications(unreadNotifications);
  };

  const groupedNotifications = groupNotificationsByDay();

  return (
    <div className="notification-hub-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading notifications...</p>
        </div>
      ) : (
        <>
          <header className="notification-header">
            <div className="notification-title-container">
              <h2 className="notification-title">Notifications</h2>
              {getUnreadCount() > 0 && (
                <span className="notification-badge">{getUnreadCount()}</span>
              )}
            </div>
            
            <div className="notification-actions">
              <button 
                className="mark-all-read-btn" 
                onClick={markAllAsRead}
                disabled={getUnreadCount() === 0}
              >
                Mark all as read
              </button>
              <button 
                className="settings-btn" 
                onClick={() => setShowSettings(true)}
              >
                <span className="settings-icon">⚙️</span>
              </button>
            </div>
          </header>
          
          <div className="notification-filters">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveFilter('unread')}
              >
                Unread
                {getUnreadCount() > 0 && <span className="mini-badge">{getUnreadCount()}</span>}
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'system' ? 'active' : ''}`}
                onClick={() => setActiveFilter('system')}
              >
                System
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'course' ? 'active' : ''}`}
                onClick={() => setActiveFilter('course')}
              >
                Course
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'event' ? 'active' : ''}`}
                onClick={() => setActiveFilter('event')}
              >
                Events
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'social' ? 'active' : ''}`}
                onClick={() => setActiveFilter('social')}
              >
                Mentions
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'invitation' ? 'active' : ''}`}
                onClick={() => setActiveFilter('invitation')}
              >
                Invites
              </button>
            </div>
            
            <div className="search-filter-container">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn" 
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <div className="date-filter">
                <select 
                  value={dateFilter} 
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="date-filter-select"
                >
                  <option value="all">Any time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                </select>
              </div>
              
              <button 
                className="bulk-delete-btn"
                onClick={deleteAllRead}
                title="Delete all read notifications"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <div className="notifications-feed">
            {Object.entries(groupedNotifications).map(([day, dayNotifications]) => (
              dayNotifications.length > 0 && (
                <div className="notification-group" key={day}>
                  <h3 className="group-heading">{day}</h3>
                  {dayNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-card ${!notification.read ? 'unread' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-header-row">
                          <h4 className="notification-title">{notification.title}</h4>
                          <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
                        </div>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-actions-row">
                          <a 
                            href={notification.actionUrl} 
                            className="notification-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            {notification.actionText}
                          </a>
                          <button 
                            className="notification-dismiss-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
            
            {getFilteredNotifications().length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔔</div>
                <h3>No notifications found</h3>
                <p>You're all caught up! Check back later for updates.</p>
              </div>
            )}
          </div>
            
          {showSettings && (
            <div className="modal-overlay" onClick={() => setShowSettings(false)}>
              <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Notification Preferences</h3>
                  <button 
                    className="close-modal-btn" 
                    onClick={() => setShowSettings(false)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="settings-content">
                  <div className="settings-section">
                    <h4>Notification Types</h4>
                    <div className="setting-toggle">
                      <span>Event updates</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.eventUpdates}
                          onChange={() => toggleNotificationSetting('eventUpdates')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="setting-toggle">
                      <span>Course reminders</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.courseReminders}
                          onChange={() => toggleNotificationSetting('courseReminders')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="setting-toggle">
                      <span>Mentions/comments</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.mentions}
                          onChange={() => toggleNotificationSetting('mentions')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="setting-toggle">
                      <span>Admin announcements</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.adminAnnouncements}
                          onChange={() => toggleNotificationSetting('adminAnnouncements')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="settings-section">
                    <h4>Delivery Methods</h4>
                    <div className="setting-toggle">
                      <span>Email notifications</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.emailNotifications}
                          onChange={() => toggleNotificationSetting('emailNotifications')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="setting-toggle">
                      <span>Push notifications</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.pushNotifications}
                          onChange={() => toggleNotificationSetting('pushNotifications')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="setting-toggle">
                      <span>In-app notifications</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.inAppNotifications}
                          onChange={() => toggleNotificationSetting('inAppNotifications')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="settings-section">
                    <h4>Sound &amp; Vibration</h4>
                    <div className="setting-toggle">
                      <span>Sound alerts</span>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.soundAlerts}
                          onChange={() => toggleNotificationSetting('soundAlerts')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowSettings(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="save-btn" 
                    onClick={() => setShowSettings(false)}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotifiCationSection;