import React from "react";
import "./Features.css";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "💡",
      title: "Industry Connections",
      description:
        "Connect with industry experts, alumni, and professionals for guidance. Engage in Q&A sessions, webinars, and mentorship programs.",
      color: "#6b46c1",
    },
    {
      id: 2,
      icon: "🛠️",
      title: "In-Built Coding Platform",
      description:
        "Practice coding in real-time with an interactive editor. Participate in coding challenges and hackathons.",
      color: "#e53e3e",
    },
    {
      id: 3,
      icon: "🏆",
      title: "Showcase Achievements Like LinkedIn",
      description:
        "Share your certifications, projects, and skills with peers. Build a strong professional profile for employers to notice.",
      color: "#38a169",
    },
    {
      id: 4,
      icon: "🔍",
      title: "Job & Internship Opportunities",
      description:
        "Access curated job and internship listings from top companies. Get matched with opportunities based on your skills and achievements.",
      color: "#3182ce",
    },
    {
      id: 5,
      icon: "📊",
      title: "AI-Powered Resume Builder",
      description:
        "Generate a well-structured resume with minimal typos using AI. Optimize your resume to increase chances of getting hired.",
      color: "#d69e2e",
    },
    {
      id: 6,
      icon: "🔥",
      title: "Hackathons & Competitive Challenges",
      description:
        "Participate in real-world problem-solving competitions. Gain experience by solving industry-level challenges.",
      color: "#dd6b20",
    },
  ];

  return (
    <section id="features" className="connectify-features">
      <div className="connectify-features-container">
        <div className="connectify-features-header">
          <h2 className="connectify-features-title">Key Features</h2>
          <p className="connectify-features-subtitle">
            Everything you need to accelerate your career journey in one place
          </p>
        </div>

        <div className="connectify-features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="connectify-feature-card"
              style={{ "--feature-accent-color": feature.color }}
            >
              <div className="connectify-feature-icon-container">
                <span className="connectify-feature-icon">{feature.icon}</span>
              </div>
              <h3 className="connectify-feature-title">{feature.title}</h3>
              <p className="connectify-feature-description">
                {feature.description}
              </p>
              <div className="connectify-feature-hover-effect"></div>
            </div>
          ))}
        </div>

       
      </div>

      {/* Background decorative elements */}
      <div className="connectify-features-bg-circle connectify-features-bg-circle-1"></div>
      <div className="connectify-features-bg-circle connectify-features-bg-circle-2"></div>
      <div className="connectify-features-bg-dots"></div>
    </section>
  );
};

export default Features;
