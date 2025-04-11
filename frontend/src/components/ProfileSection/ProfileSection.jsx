import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import {
  FaUser,
  FaCode,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaFire,
  FaEdit,
  FaMedal,
  FaChartLine,
  FaClock,
  FaRegBookmark,
  FaClipboardCheck,
  FaPalette,
  FaProjectDiagram,
  FaFileDownload,
  FaThumbsUp,
  FaBell,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTrophy,
  FaTimes,
} from "react-icons/fa";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [currentSection, setCurrentSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [theme, setTheme] = useState("light");
  const [showNotification, setShowNotification] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);

  // Sample user data
  const userData = {
    name: "Alex Johnson",
    username: "alexcode42",
    bio: "Full-stack developer passionate about solving complex problems. Learning new technologies every day.",
    college: "Stanford University",
    socials: {
      github: "github.com/alexcode42",
      linkedin: "linkedin.com/in/alexjohnson",
      twitter: "twitter.com/alexcode",
    },
    stats: {
      problemsSolved: 327,
      coursesDone: 12,
      events: 8,
      posts: 24,
      streak: 42,
    },
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "MongoDB",
      "GraphQL",
      "TypeScript",
      "AWS",
    ],
    badges: [
      {
        name: "Problem Solver",
        description: "Solved 300+ problems",
        date: "2024-12-15",
        icon: "medal",
      },
      {
        name: "Streak Master",
        description: "42-day streak",
        date: "2025-03-20",
        icon: "fire",
      },
      {
        name: "Event Winner",
        description: "1st place in Hackathon 2024",
        date: "2024-11-10",
        icon: "trophy",
      },
    ],
    courses: [
      {
        title: "Advanced React Patterns",
        progress: 85,
        image: "https://via.placeholder.com/60",
      },
      {
        title: "System Design Fundamentals",
        progress: 62,
        image: "https://via.placeholder.com/60",
      },
      {
        title: "Data Structures Masterclass",
        progress: 100,
        image: "https://via.placeholder.com/60",
      },
    ],
    problems: [
      {
        title: "Binary Tree Traversal",
        difficulty: "Medium",
        date: "2025-04-01",
        time: "12:45",
      },
      {
        title: "Dynamic Programming Basics",
        difficulty: "Hard",
        date: "2025-03-29",
        time: "15:20",
      },
      {
        title: "Array Manipulation",
        difficulty: "Easy",
        date: "2025-03-28",
        time: "09:15",
      },
    ],
    events: [
      {
        name: "Spring Hackathon 2025",
        type: "Hackathon",
        rank: "2nd",
        date: "2025-03-15",
        certificate: true,
      },
      {
        name: "Code Challenge March",
        type: "Contest",
        rank: "5th",
        date: "2025-03-08",
        certificate: true,
      },
      {
        name: "Tech Talk: AI Frontiers",
        type: "Webinar",
        rank: "Attendee",
        date: "2025-02-22",
        certificate: false,
      },
    ],
    contributions: {
      posts: [
        {
          title: "Understanding React Hooks",
          likes: 45,
          comments: 12,
          date: "2025-03-20",
        },
        {
          title: "Python vs JavaScript: A Comparison",
          likes: 32,
          comments: 8,
          date: "2025-03-12",
        },
      ],
      comments: [
        {
          post: "Optimizing Database Queries",
          comment:
            "Great article! I would add that index optimization is crucial.",
          date: "2025-03-25",
        },
        {
          post: "Frontend Architecture Patterns",
          comment:
            "I've implemented the atomic design pattern with great results.",
          date: "2025-03-18",
        },
      ],
      discussions: [
        {
          title: "Future of WebAssembly",
          participants: 8,
          messages: 34,
          date: "2025-03-22",
        },
        {
          title: "Best Practices for Code Reviews",
          participants: 12,
          messages: 27,
          date: "2025-03-15",
        },
      ],
    },
    activity: [
      { type: "problem", title: "Binary Tree Traversal", date: "2025-04-01" },
      { type: "course", title: "Advanced React Patterns", date: "2025-03-30" },
      { type: "event", title: "Spring Hackathon 2025", date: "2025-03-15" },
    ],
    analytics: {
      codingTime: { Mon: 5, Tue: 3, Wed: 6, Thu: 4, Fri: 7, Sat: 8, Sun: 2 },
      problemTypes: { Easy: 45, Medium: 35, Hard: 20 },
      streakData: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    },
    bookmarks: [
      { type: "problem", title: "Graph Algorithms", date: "2025-03-28" },
      { type: "course", title: "Machine Learning Basics", date: "2025-03-25" },
    ],
    skillAssessments: [
      { skill: "JavaScript", score: 92, percentile: 87 },
      { skill: "React", score: 88, percentile: 82 },
      { skill: "Data Structures", score: 79, percentile: 74 },
    ],
    projects: [
      {
        title: "Task Management App",
        description:
          "A full-stack task management application with drag-and-drop features",
        tech: ["React", "Node.js", "MongoDB"],
        repo: "github.com/alexcode42/task-manager",
        demo: "taskmanager-demo.com",
        image: "https://via.placeholder.com/300x200",
      },
      {
        title: "Weather Forecast API",
        description:
          "RESTful API for weather forecasting with multiple data sources",
        tech: ["Python", "Flask", "PostgreSQL"],
        repo: "github.com/alexcode42/weather-api",
        demo: "weather-api-demo.com",
        image: "https://via.placeholder.com/300x200",
      },
    ],
    endorsements: [
      {
        name: "Sarah Chen",
        position: "Senior Developer at Tech Co",
        text: "Alex is an exceptional problem solver and collaborator. Always delivers high-quality code.",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Michael Rodriguez",
        position: "Project Lead at DevFirm",
        text: "Great attention to detail and strong technical skills. A pleasure to work with!",
        image: "https://via.placeholder.com/50",
      },
    ],
    completionPercentage: 92,
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSkills(userData.skills);
      setProfileCompletion(userData.completionPercentage);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate profile completion when skills change
    const baseCompletion = 70; // Base completion without skills
    const skillCompletion = Math.min(
      (skills.length / userData.skills.length) * 30,
      30
    );
    setProfileCompletion(Math.round(baseCompletion + skillCompletion));
  }, [skills]);

  // Difficulty color mapping
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "ps-easy-difficulty";
      case "Medium":
        return "ps-medium-difficulty";
      case "Hard":
        return "ps-hard-difficulty";
      default:
        return "";
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleNotifications = () => {
    setShowNotification(!showNotification);
  };

  const generateResume = () => {
    alert("Generating resume... This would typically download a PDF.");
  };

  const renderBadgeIcon = (iconName) => {
    switch (iconName) {
      case "medal":
        return <FaMedal />;
      case "fire":
        return <FaFire />;
      case "trophy":
        return <FaTrophy />;
      default:
        return <FaMedal />;
    }
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case "overview":
        return (
          <div className="ps-overview ps-animate-fade-in">
            <div className="ps-stats-cards">
              {[
                {
                  icon: <FaCode />,
                  value: userData.stats.problemsSolved,
                  label: "Problems Solved",
                },
                {
                  icon: <FaBook />,
                  value: userData.stats.coursesDone,
                  label: "Courses Done",
                },
                {
                  icon: <FaCalendarAlt />,
                  value: userData.stats.events,
                  label: "Events",
                },
                {
                  icon: <FaFileAlt />,
                  value: userData.stats.posts,
                  label: "Posts",
                },
                {
                  icon: <FaFire />,
                  value: userData.stats.streak,
                  label: "Day Streak",
                },
              ].map((stat, index) => (
                <div key={index} className="ps-stat-card">
                  <div className="ps-stat-icon">{stat.icon}</div>
                  <div className="ps-stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                    {stat.label === "Day Streak" && (
                      <div className="ps-streak-bar"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="ps-badges-section">
              <h2>Badges & Achievements</h2>
              <div className="ps-badges-container">
                {userData.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="ps-badge-item ps-animate-bounce-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="ps-badge-icon">
                      {renderBadgeIcon(badge.icon)}
                    </div>
                    <div className="ps-badge-info">
                      <h3>{badge.name}</h3>
                      <p>{badge.description}</p>
                      <small>
                        Earned on {new Date(badge.date).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-learning-section">
              <h2>Learning Progress</h2>
              <div className="ps-courses-list">
                {userData.courses.map((course, index) => (
                  <div
                    key={index}
                    className="ps-course-item ps-animate-slide-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="ps-course-image"
                    />
                    <div className="ps-course-info">
                      <h3>{course.title}</h3>
                      <div className="ps-progress-container">
                        <div
                          className="ps-progress-bar"
                          style={{ width: `${course.progress}%` }}
                          data-progress={`${course.progress}%`}
                        ></div>
                      </div>
                    </div>
                    <button className="ps-continue-btn">Continue</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-problems-section">
              <h2>Recently Solved Problems</h2>
              <table className="ps-problems-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.problems.map((problem, index) => (
                    <tr
                      key={index}
                      className="ps-animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td>{problem.title}</td>
                      <td>
                        <span
                          className={`ps-difficulty-badge ${getDifficultyColor(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td>{problem.date}</td>
                      <td>{problem.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ps-events-section">
              <h2>Past Events</h2>
              <div className="ps-events-grid">
                {userData.events.map((event, index) => (
                  <div
                    key={index}
                    className="ps-event-card ps-animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <h3>{event.name}</h3>
                    <div className="ps-event-details">
                      <p>
                        <strong>Type:</strong> {event.type}
                      </p>
                      <p>
                        <strong>Rank:</strong> {event.rank}
                      </p>
                      <p>
                        <strong>Date:</strong> {event.date}
                      </p>
                      {event.certificate && (
                        <span className="ps-certificate-badge">
                          Certificate
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "contributions":
        return (
          <div className="ps-contributions-section ps-animate-fade-in">
            <div className="ps-contributions-tabs">
              {["posts", "comments", "discussions"].map((tab) => (
                <button
                  key={tab}
                  className={`ps-tab-btn ${
                    activeTab === tab ? "ps-active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="ps-tab-content">
              {activeTab === "posts" && (
                <div className="ps-posts-list ps-animate-slide-in">
                  {userData.contributions.posts.map((post, index) => (
                    <div key={index} className="ps-post-item">
                      <h3>{post.title}</h3>
                      <div className="ps-post-stats">
                        <span>
                          <FaThumbsUp /> {post.likes}
                        </span>
                        <span>
                          <FaClipboardCheck /> {post.comments}
                        </span>
                        <span>
                          <FaCalendarAlt /> {post.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "comments" && (
                <div className="ps-comments-list ps-animate-slide-in">
                  {userData.contributions.comments.map((comment, index) => (
                    <div key={index} className="ps-comment-item">
                      <h3>On: {comment.post}</h3>
                      <p>"{comment.comment}"</p>
                      <span className="ps-comment-date">
                        <FaClock /> {comment.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "discussions" && (
                <div className="ps-discussions-list ps-animate-slide-in">
                  {userData.contributions.discussions.map(
                    (discussion, index) => (
                      <div key={index} className="ps-discussion-item">
                        <h3>{discussion.title}</h3>
                        <div className="ps-discussion-stats">
                          <span>
                            <FaUser /> {discussion.participants}
                          </span>
                          <span>
                            <FaFileAlt /> {discussion.messages}
                          </span>
                          <span>
                            <FaCalendarAlt /> {discussion.date}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case "advanced":
        return (
          <div className="ps-advanced-section ps-animate-fade-in">
            <div className="ps-activity-timeline">
              <h2>Activity Timeline</h2>
              <div className="ps-timeline">
                {userData.activity.map((item, index) => (
                  <div
                    key={index}
                    className="ps-timeline-item ps-animate-slide-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="ps-timeline-icon">
                      {item.type === "problem" && <FaCode />}
                      {item.type === "course" && <FaBook />}
                      {item.type === "event" && <FaCalendarAlt />}
                    </div>
                    <div className="ps-timeline-content">
                      <h3>{item.title}</h3>
                      <p>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                      <span>
                        <FaClock /> {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-analytics-section">
              <h2>Analytics</h2>
              <div className="ps-analytics-cards">
                <div className="ps-analytics-card ps-animate-fade-in">
                  <h3>Coding Time This Week</h3>
                  <div className="ps-chart-placeholder">
                    <div className="ps-bar-chart">
                      {Object.entries(userData.analytics.codingTime).map(
                        ([day, hours], index) => (
                          <div key={index} className="ps-chart-bar-container">
                            <div
                              className="ps-chart-bar"
                              style={{ height: `${hours * 10}px` }}
                              data-value={`${hours}h`}
                            ></div>
                            <span>{day}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="ps-analytics-card ps-animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3>Problem Types Solved</h3>
                  <div className="ps-chart-placeholder">
                    <div className="ps-donut-chart">
                      <div className="ps-donut-segment ps-easy"></div>
                      <div className="ps-donut-segment ps-medium"></div>
                      <div className="ps-donut-segment ps-hard"></div>
                      <div className="ps-donut-hole">
                        <div className="ps-total-count">
                          {userData.stats.problemsSolved}
                        </div>
                      </div>
                    </div>
                    <div className="ps-chart-legend">
                      {Object.entries(userData.analytics.problemTypes).map(
                        ([type, percent], idx) => (
                          <div key={idx} className="ps-legend-item">
                            <span
                              className={`ps-legend-color ps-${type.toLowerCase()}`}
                            ></span>
                            <span>
                              {type} ({percent}%)
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="ps-analytics-card ps-animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3>Streak Calendar</h3>
                  <div className="ps-calendar-heatmap">
                    {userData.analytics.streakData.map((day, index) => (
                      <div
                        key={index}
                        className={`ps-calendar-day ${
                          day ? "ps-active" : "ps-inactive"
                        }`}
                        title={day ? "Active" : "Inactive"}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="ps-bookmarks-section">
              <h2>Your Bookmarks</h2>
              <div className="ps-bookmarks-list">
                {userData.bookmarks.map((bookmark, index) => (
                  <div
                    key={index}
                    className="ps-bookmark-item ps-animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="ps-bookmark-icon">
                      {bookmark.type === "problem" && <FaCode />}
                      {bookmark.type === "course" && <FaBook />}
                    </div>
                    <div className="ps-bookmark-info">
                      <h3>{bookmark.title}</h3>
                      <p>
                        {bookmark.type.charAt(0).toUpperCase() +
                          bookmark.type.slice(1)}
                      </p>
                      <span>
                        <FaRegBookmark /> {bookmark.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-skill-assessments">
              <h2>Skill Assessments</h2>
              <div className="ps-skills-list">
                {userData.skillAssessments.map((assessment, index) => (
                  <div
                    key={index}
                    className="ps-skill-assessment-item ps-animate-slide-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <h3>{assessment.skill}</h3>
                    <div className="ps-assessment-details">
                      <div className="ps-score">
                        Score: {assessment.score}/100
                      </div>
                      <div className="ps-percentile-container">
                        <div className="ps-percentile-label">
                          Better than {assessment.percentile}% of users
                        </div>
                        <div className="ps-percentile-bar-container">
                          <div
                            className="ps-percentile-bar"
                            style={{ width: `${assessment.percentile}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="ps-projects-section ps-animate-fade-in">
            <h2>Project Showcase</h2>
            <div className="ps-projects-grid">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className="ps-project-card ps-animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="ps-project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="ps-project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="ps-project-tech">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="ps-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="ps-project-links">
                      <a
                        href={`https://${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ps-project-link"
                      >
                        <FaGithub /> Repository
                      </a>
                      {project.demo && (
                        <a
                          href={`https://${project.demo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ps-project-link"
                        >
                          <FaProjectDiagram /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "endorsements":
        return (
          <div className="ps-endorsements-section ps-animate-fade-in">
            <h2>Peer Endorsements</h2>
            <div className="ps-endorsements-list">
              {userData.endorsements.map((endorsement, index) => (
                <div
                  key={index}
                  className="ps-endorsement-card ps-animate-slide-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="ps-endorser-image">
                    <img src={endorsement.image} alt={endorsement.name} />
                  </div>
                  <div className="ps-endorsement-content">
                    <h3>{endorsement.name}</h3>
                    <p className="ps-endorser-position">
                      {endorsement.position}
                    </p>
                    <p className="ps-endorsement-text">"{endorsement.text}"</p>
                    <div className="ps-endorsement-actions">
                      <button className="ps-like-btn">
                        <FaThumbsUp /> Like
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="ps-request-endorsement-btn">
                Request Endorsement
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`ps-container ps-${theme}-theme`}>
      {isLoading ? (
        <div className="ps-loading-screen">
          <div className="ps-spinner"></div>
          <p>Loading profile...</p>
        </div>
      ) : (
        <>
          <div className="ps-profile-header">
            <div className="ps-profile-completion">
              <div
                className="ps-completion-bar"
                style={{ width: `${profileCompletion}%` }}
              ></div>
              <span className="ps-completion-text">
                {profileCompletion}% Profile Complete
              </span>
            </div>

            <div className="ps-profile-banner">
              <div className="ps-user-basic-info ps-animate-fade-in">
                <div className="ps-user-avatar">
                  <FaUser className="ps-avatar-placeholder" />
                </div>
                <div className="ps-user-details">
                  <h1>{userData.name}</h1>
                  <h2>@{userData.username}</h2>
                  <p>{userData.bio}</p>
                  <p className="ps-college-info">{userData.college}</p>

                  <div className="ps-socials">
                    <a
                      href={`https://${userData.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> {userData.socials.github}
                    </a>
                    <a
                      href={`https://${userData.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin /> {userData.socials.linkedin}
                    </a>
                    <a
                      href={`https://${userData.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter /> {userData.socials.twitter}
                    </a>
                  </div>

                  <button
                    className="ps-edit-profile-btn"
                    onClick={() => setShowEditModal(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="ps-skills-container">
            <div className="ps-skills-header">
              <h2>Skills</h2>
              <button
                className="ps-toggle-edit-skills"
                onClick={() => setIsEditingSkills(!isEditingSkills)}
              >
                {isEditingSkills ? "Save Skills" : "Edit Skills"}
              </button>
            </div>

            <div className="ps-skills-tags">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`ps-skill-tag ${
                    isEditingSkills ? "ps-editable" : ""
                  } ps-animate-scale-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {skill}
                  {isEditingSkills && (
                    <span
                      className="ps-remove-skill"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <FaTimes />
                    </span>
                  )}
                </div>
              ))}
              {isEditingSkills && (
                <div className="ps-add-skill-container">
                  <input
                    type="text"
                    className="ps-add-skill-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <button
                    className="ps-add-skill-btn"
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
          

          <div className="ps-profile-navigation">
            {[
              { id: "overview", label: "Overview" },
              { id: "contributions", label: "Contributions" },
              { id: "advanced", label: "Analytics" },
              { id: "projects", label: "Projects" },
              { id: "endorsements", label: "Endorsements" },
            ].map((navItem) => (
              <button
                key={navItem.id}
                className={`ps-nav-btn ${
                  currentSection === navItem.id ? "ps-active" : ""
                }`}
                onClick={() => setCurrentSection(navItem.id)}
              >
                {navItem.label}
              </button>
            ))}
          </div>

          <div className="ps-profile-content">{renderSectionContent()}</div>

          <div className="ps-floating-actions">
            <button
              className="ps-action-btn ps-resume-btn"
              onClick={generateResume}
            >
              <FaFileDownload />
              <span className="ps-action-tooltip">Generate Resume</span>
            </button>
            <button
              className="ps-action-btn ps-theme-btn"
              onClick={toggleTheme}
            >
              <FaPalette />
              <span className="ps-action-tooltip">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </button>
            <button
              className="ps-action-btn ps-notifications-btn"
              onClick={toggleNotifications}
            >
              <FaBell />
              <span className="ps-action-tooltip">Notifications</span>
              {showNotification && (
                <div className="ps-notification-dropdown">
                  <div className="ps-notification-header">
                    <h3>Notifications</h3>
                    <button
                      className="ps-close-notifications"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotification(false);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="ps-notification-content">
                    <p>No new notifications</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
