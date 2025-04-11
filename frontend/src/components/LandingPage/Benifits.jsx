import React from "react";
import "./Benifits.css";

const Benifits = () => {
  const benefitsData = [
    {
      id: "career-acceleration",
      icon: "🚀",
      title: "Career Acceleration",
      description: [
        "Gain direct access to top industry experts and recruiters.",
        "Get guidance on career paths, skill development, and industry trends.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/1869/1869679.png",
    },
    {
      id: "learn-grow",
      icon: "📚",
      title: "Learn & Grow Continuously",
      description: [
        "Participate in interactive courses, webinars, and coding challenges.",
        "Improve skills with real-world projects and industry-level problems.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
    },
    {
      id: "network",
      icon: "🌍",
      title: "Build a Strong Network",
      description: [
        "Connect with mentors, alumni, and peers from diverse industries.",
        "Join professional groups and discussion forums for knowledge sharing.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/2906/2906274.png",
    },
    {
      id: "dream-job",
      icon: "💼",
      title: "Land Your Dream Job",
      description: [
        "Get AI-powered resume recommendations to stand out in job applications.",
        "Direct access to internship and job opportunities from leading companies.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/1570/1570887.png",
    },
    {
      id: "recognition",
      icon: "🏆",
      title: "Recognition & Visibility",
      description: [
        "Showcase your achievements, projects, and skills like LinkedIn.",
        "Gain recognition among industry leaders and recruiters.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
    },
    {
      id: "hackathons",
      icon: "🔥",
      title: "Exclusive Hackathons & Competitions",
      description: [
        "Participate in company-sponsored challenges and win exciting rewards.",
        "Get a chance to work on real-world industry problems and gain experience.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
    },
  ];

  return (
    <section id="benefits" className="connectify-benefits-section">
      <div className="connectify-benefits-container">
        <div className="connectify-benefits-header">
          <h2 className="connectify-benefits-title">Why Choose Connectify?</h2>
          <p className="connectify-benefits-subheading">
            Empowering students and professionals with the right tools to grow,
            connect, and succeed.
          </p>
        </div>

        <div className="connectify-benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div key={benefit.id} className="connectify-benefit-card">
              <div className="connectify-benefit-model-container">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="connectify-benefit-image"
                />
              </div>
              <div className="connectify-benefit-content">
                <div className="connectify-benefit-icon">{benefit.icon}</div>
                <h3 className="connectify-benefit-title">{benefit.title}</h3>
                <ul className="connectify-benefit-list">
                  {benefit.description.map((item, i) => (
                    <li key={i} className="connectify-benefit-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benifits;
