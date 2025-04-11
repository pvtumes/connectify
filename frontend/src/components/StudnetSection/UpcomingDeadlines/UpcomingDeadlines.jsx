import React, { useState } from "react";
import "./UpcomingDeadlines.css";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const UpcomingDeadlines = () => {
  const [expandedDeadline, setExpandedDeadline] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  const deadlines = [
    {
      id: 1,
      title: "Project Alpha Delivery",
      dueDate: "2023-11-15",
      dueTime: "17:00",
      priority: "high",
      description:
        "Final delivery of all project files and documentation to the client. Includes source code, design assets, and user manuals.",
      completed: false,
    },
    {
      id: 2,
      title: "Team Retrospective Meeting",
      dueDate: "2023-11-10",
      dueTime: "14:30",
      priority: "medium",
      description:
        "Monthly team retrospective to discuss what went well and areas for improvement. Prepare your feedback points.",
      completed: false,
    },
    {
      id: 3,
      title: "UI Design Review",
      dueDate: "2023-11-08",
      dueTime: "10:00",
      priority: "high",
      description:
        "Presentation of new UI designs to stakeholders. Prepare mockups and design rationale documentation.",
      completed: false,
    },
    {
      id: 4,
      title: "Quarterly Report Submission",
      dueDate: "2023-11-20",
      dueTime: "23:59",
      priority: "medium",
      description:
        "Submit all quarterly performance reports to management. Financials, KPIs, and team metrics required.",
      completed: false,
    },
    {
      id: 5,
      title: "Server Maintenance Window",
      dueDate: "2023-11-05",
      dueTime: "02:00",
      priority: "low",
      description:
        "Planned maintenance window for production servers. Expected downtime of 30 minutes.",
      completed: true,
    },
  ];

  const toggleDeadline = (id) => {
    setExpandedDeadline(expandedDeadline === id ? null : id);
  };

  const toggleComplete = (id, e) => {
    e.stopPropagation();
    // In a real app, you would update the state here
    console.log(`Toggled completion for deadline ${id}`);
  };

  const visibleDeadlines = viewAll ? deadlines : deadlines.slice(0, 3);

  return (
    <div className="deadlines-container">
      <div className="deadlines-header">
        <Calendar size={24} className="header-icon" />
        <h2>Upcoming Deadlines</h2>
        <button className="view-all-btn" onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "Show Less" : "View All"}
          {viewAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="deadlines-list">
        {visibleDeadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={`deadline-item ${deadline.priority} ${
              deadline.completed ? "completed" : ""
            } ${expandedDeadline === deadline.id ? "expanded" : ""}`}
            onClick={() => toggleDeadline(deadline.id)}
          >
            <div className="deadline-main">
              <button
                className={`complete-checkbox ${
                  deadline.completed ? "checked" : ""
                }`}
                onClick={(e) => toggleComplete(deadline.id, e)}
              >
                {deadline.completed ? <Check size={16} /> : null}
              </button>

              <div className="deadline-info">
                <h3 className="deadline-title">{deadline.title}</h3>
                <div className="deadline-time">
                  <Clock size={16} />
                  <span>
                    {new Date(
                      `${deadline.dueDate}T${deadline.dueTime}`
                    ).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {deadline.priority === "high" && (
                <div className="priority-indicator">
                  <AlertTriangle size={16} />
                  <span>Urgent</span>
                </div>
              )}
            </div>

            {expandedDeadline === deadline.id && (
              <div className="deadline-details">
                <p>{deadline.description}</p>
                <div className="deadline-actions">
                  <button className="action-btn reminder">Set Reminder</button>
                  <button className="action-btn delegate">Delegate</button>
                  <button className="action-btn details">View Details</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
