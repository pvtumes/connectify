import { useState, useEffect } from "react";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
  X,
} from "lucide-react";
import "./OpportunityListings.css";

const OpportunityListings = () => {
  // Sample data - in a real app this would come from an API
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      workMode: "Hybrid",
      stipend: "₹25,000 - ₹35,000/month",
      duration: "6 months",
      deadline: "2025-04-30",
      tags: ["Frontend", "React", "JavaScript"],
      type: "Internship",
      experience: "0-1 yr",
      description:
        "We are looking for a frontend developer with experience in React to join our team...",
      skills: ["React", "JavaScript", "HTML/CSS", "Redux"],
      perks: ["Certificate", "PPO opportunity", "Flexible hours"],
      aboutCompany:
        "TechCorp Solutions is a leading tech company focused on creating innovative products...",
      applicationProcess:
        "Apply with your resume and a cover letter. Selected candidates will be called for an interview.",
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      company: "AI Innovations",
      location: "Remote",
      workMode: "Remote",
      stipend: "₹45,000 - ₹60,000/month",
      duration: "Full-time",
      deadline: "2025-05-15",
      tags: ["ML", "Python", "Deep Learning"],
      type: "Full-time",
      experience: "1-3 yrs",
      description:
        "Join our AI team to develop cutting-edge machine learning models...",
      skills: [
        "Python",
        "TensorFlow/PyTorch",
        "Data Analysis",
        "Computer Vision",
      ],
      perks: ["Health Insurance", "Annual Bonus", "Learning Budget"],
      aboutCompany:
        "AI Innovations specializes in developing AI solutions for various industries...",
      applicationProcess:
        "Apply with your resume and portfolio. A technical assessment will be conducted.",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "WebStack Tech",
      location: "Mumbai, India",
      workMode: "On-site",
      stipend: "₹40,000 - ₹50,000/month",
      duration: "3 months",
      deadline: "2025-04-25",
      tags: ["Full Stack", "Node.js", "MongoDB"],
      type: "Internship",
      experience: "Fresher",
      description:
        "Looking for a passionate full stack developer to join our team...",
      skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
      perks: ["Mentorship", "Certificate", "PPO opportunity"],
      aboutCompany:
        "WebStack Tech creates web applications for startups and enterprises...",
      applicationProcess:
        "Send your resume and GitHub profile. Shortlisted candidates will be interviewed.",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Data Insights Corp",
      location: "Delhi, India",
      workMode: "Hybrid",
      stipend: "₹30,000 - ₹40,000/month",
      duration: "Part-time",
      deadline: "2025-05-10",
      tags: ["Data Analysis", "SQL", "Power BI"],
      type: "Part-time",
      experience: "0-1 yr",
      description:
        "We're hiring a data analyst to help us derive insights from our data...",
      skills: ["SQL", "Excel", "Power BI/Tableau", "Statistics"],
      perks: [
        "Flexible hours",
        "Professional growth",
        "Networking opportunities",
      ],
      aboutCompany:
        "Data Insights Corp provides data analysis services to various industries...",
      applicationProcess:
        "Submit your resume and a cover letter explaining your interest in data analysis.",
    },
    {
      id: 5,
      title: "Frontend Developer Intern",
      company: "WebSpark Solutions",
      location: "Mumbai, India",
      workMode: "Remote",
      stipend: "₹15,000 - ₹25,000/month",
      duration: "3 months",
      deadline: "2025-04-30",
      tags: ["Frontend", "React", "JavaScript", "HTML", "CSS"],
      type: "Internship",
      experience: "Fresher",
      description:
        "Join our dynamic team as a Frontend Developer Intern and contribute to building engaging user interfaces...",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React (or Angular/Vue)",
        "Responsive Design",
      ],
      perks: [
        "Mentorship",
        "Hands-on experience",
        "Potential for full-time offer",
        "Remote work flexibility",
      ],
      aboutCompany:
        "WebSpark Solutions is a leading web development agency focused on creating innovative and user-friendly web applications...",
      applicationProcess:
        "Apply with your resume and a portfolio (if available) showcasing your frontend projects.",
    },
    {
      id: 6,
      title: "Backend Developer",
      company: "Tech Innovators Ltd",
      location: "Bangalore, India",
      workMode: "On-site",
      stipend: "₹60,000 - ₹90,000/month",
      duration: "Full-time",
      deadline: "2025-05-15",
      tags: ["Backend", "Node.js", "Python", "API", "Database"],
      type: "Full-time",
      experience: "2-5 yrs",
      description:
        "We are looking for an experienced Backend Developer to build and maintain robust server-side applications...",
      skills: [
        "Node.js (or Python/Java)",
        "RESTful APIs",
        "Database (SQL/NoSQL)",
        "Version Control (Git)",
        "Server Management",
      ],
      perks: [
        "Competitive salary",
        "Health insurance",
        "Paid time off",
        "Learning and development opportunities",
      ],
      aboutCompany:
        "Tech Innovators Ltd is a fast-growing technology company developing cutting-edge solutions for various industries...",
      applicationProcess:
        "Submit your detailed resume and a cover letter highlighting your backend development experience.",
    },
    {
      id: 7,
      title: "Marketing Intern",
      company: "Global Marketing Group",
      location: "Chennai, India",
      workMode: "Hybrid",
      stipend: "₹10,000 - ₹15,000/month",
      duration: "6 months",
      deadline: "2025-05-05",
      tags: [
        "Marketing",
        "Social Media",
        "Content Creation",
        "Digital Marketing",
      ],
      type: "Internship",
      experience: "Fresher",
      description:
        "We are seeking a creative and enthusiastic Marketing Intern to support our marketing campaigns and activities...",
      skills: [
        "Social Media Marketing",
        "Content Writing",
        "Market Research",
        "Communication Skills",
      ],
      perks: [
        "Exposure to marketing strategies",
        "Mentorship from experienced marketers",
        "Certificate of completion",
        "Flexible work arrangement",
      ],
      aboutCompany:
        "Global Marketing Group is a leading marketing agency providing comprehensive marketing solutions to clients worldwide...",
      applicationProcess:
        "Send your resume and a brief write-up on why you are interested in marketing.",
    },
    {
      id: 8,
      title: "Software Engineer",
      company: "CodeCraft Technologies",
      location: "Hyderabad, India",
      workMode: "On-site",
      stipend: "₹70,000 - ₹110,000/month",
      duration: "Full-time",
      deadline: "2025-05-20",
      tags: [
        "Software Development",
        "Java",
        "Spring",
        "Microservices",
        "Cloud",
      ],
      type: "Full-time",
      experience: "3-7 yrs",
      description:
        "We are looking for a skilled Software Engineer with experience in building scalable and robust applications...",
      skills: [
        "Java",
        "Spring Framework",
        "Microservices Architecture",
        "Cloud Platforms (AWS/Azure/GCP)",
        "Agile Methodologies",
      ],
      perks: [
        "Excellent growth opportunities",
        "Comprehensive benefits package",
        "Collaborative work environment",
        "Opportunity to work on challenging projects",
      ],
      aboutCompany:
        "CodeCraft Technologies is a dynamic software development company committed to delivering high-quality and innovative software solutions...",
      applicationProcess:
        "Please submit your updated resume and a cover letter detailing your relevant experience.",
    },
    {
      id: 9,
      title: "UI/UX Designer",
      company: "DesignFlow Agency",
      location: "Pune, India",
      workMode: "Remote",
      stipend: "₹45,000 - ₹75,000/month",
      duration: "Full-time",
      deadline: "2025-05-12",
      tags: ["UI Design", "UX Design", "Figma", "Sketch", "Prototyping"],
      type: "Full-time",
      experience: "1-4 yrs",
      description:
        "We are seeking a talented UI/UX Designer to create intuitive and visually appealing user interfaces and experiences...",
      skills: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "UI Design Tools (Figma/Sketch/Adobe XD)",
        "Usability Testing",
      ],
      perks: [
        "Creative freedom",
        "Work from anywhere",
        "Opportunity to impact user experience",
        "Professional development resources",
      ],
      aboutCompany:
        "DesignFlow Agency is a creative design agency specializing in crafting exceptional user experiences for web and mobile applications...",
      applicationProcess:
        "Submit your portfolio showcasing your UI/UX design work and a brief introduction about yourself.",
    },
    {
      id: 10,
      title: "Technical Content Writer",
      company: "TechWrite Solutions",
      location: "Gurgaon, India",
      workMode: "Hybrid",
      stipend: "₹25,000 - ₹40,000/month",
      duration: "Full-time",
      deadline: "2025-05-08",
      tags: [
        "Technical Writing",
        "Content Marketing",
        "Documentation",
        "Technology",
      ],
      type: "Full-time",
      experience: "1-3 yrs",
      description:
        "We are looking for a skilled Technical Content Writer to create clear and concise documentation, articles, and marketing materials...",
      skills: [
        "Excellent Writing Skills",
        "Understanding of Technical Concepts",
        "SEO Basics",
        "Content Management Systems",
      ],
      perks: [
        "Opportunity to learn new technologies",
        "Collaborative team environment",
        "Flexible work options",
        "Contribution to knowledge sharing",
      ],
      aboutCompany:
        "TechWrite Solutions provides high-quality technical content writing services to technology companies...",
      applicationProcess:
        "Please share your resume and writing samples relevant to technical topics.",
    },
  ]);

  // State for various features
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarked, setBookmarked] = useState([]);
  const [applied, setApplied] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    role: [],
    location: [],
    type: [],
    workMode: [],
    experience: [],
    stipendRange: [0, 100000],
  });

  // UI state for range slider
  const [stipendRange, setStipendRange] = useState([0, 100000]);

  // Filter options
  const filterOptions = {
    role: [
      "Frontend",
      "Backend",
      "Full Stack",
      "ML",
      "Data Analysis",
      "UI/UX",
      "DevOps",
    ],
    location: ["Bangalore", "Mumbai", "Delhi", "Remote", "Hybrid"],
    type: ["Internship", "Full-time", "Part-time", "Freelance"],
    workMode: ["Remote", "On-site", "Hybrid"],
    experience: ["Fresher", "0-1 yr", "1-3 yrs", "3-5 yrs", "5+ yrs"],
  };

  // Apply filters
  useEffect(() => {
    let results = opportunities;

    // Apply search term
    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply other filters
    if (activeFilters.role.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => activeFilters.role.includes(tag))
      );
    }

    if (activeFilters.location.length > 0) {
      results = results.filter((job) =>
        activeFilters.location.some((loc) => job.location.includes(loc))
      );
    }

    if (activeFilters.type.length > 0) {
      results = results.filter((job) => activeFilters.type.includes(job.type));
    }

    if (activeFilters.workMode.length > 0) {
      results = results.filter((job) =>
        activeFilters.workMode.includes(job.workMode)
      );
    }

    if (activeFilters.experience.length > 0) {
      results = results.filter((job) =>
        activeFilters.experience.includes(job.experience)
      );
    }

    // Apply stipend range
    results = results.filter((job) => {
      // Extract first number from stipend range
      const stipendValue = parseInt(job.stipend.match(/\d+/)[0]);
      return stipendValue >= stipendRange[0] && stipendValue <= stipendRange[1];
    });

    setFilteredOpportunities(results);
  }, [searchTerm, opportunities, activeFilters, stipendRange]);

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((jobId) => jobId !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  // Toggle applied status
  const toggleApplied = (id) => {
    if (applied.includes(id)) {
      setApplied(applied.filter((jobId) => jobId !== id));
    } else {
      setApplied([...applied, id]);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      // Toggle the filter value
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }

      return newFilters;
    });
  };

  // View job details
  const viewJobDetails = (job) => {
    setSelectedOpportunity(job);
    setShowDetails(true);
  };

  // Close job details
  const closeJobDetails = () => {
    setShowDetails(false);
    setSelectedOpportunity(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      role: [],
      location: [],
      type: [],
      workMode: [],
      experience: [],
      stipendRange: [0, 100000],
    });
    setStipendRange([0, 100000]);
    setSearchTerm("");
  };

  // Initialize filtered opportunities with all opportunities
  useEffect(() => {
    setFilteredOpportunities(opportunities);
  }, [opportunities]);

  return (
    <div className="connectify-opportunity-container">
      {/* Header */}
      <div className="connectify-opportunity-header">
        <h1>Opportunities</h1>
        <p>
          Discover internships and jobs that match your skills and interests
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="connectify-search-filter-section">
        <div className="connectify-search-bar">
          <Search size={20} className="connectify-search-icon" />
          <input
            type="text"
            placeholder="Search by title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="connectify-filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="connectify-filters-section">
          <div className="connectify-filters-header">
            <h3>Filters</h3>
            <button
              className="connectify-clear-filters-btn"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>

          <div className="connectify-filters-grid">
            {/* Role Filter */}
            <div className="connectify-filter-group">
              <h4>Role</h4>
              <div className="connectify-filter-options">
                {filterOptions.role.map((role) => (
                  <label key={role} className="connectify-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.role.includes(role)}
                      onChange={() => handleFilterChange("role", role)}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="connectify-filter-group">
              <h4>Location</h4>
              <div className="connectify-filter-options">
                {filterOptions.location.map((location) => (
                  <label key={location} className="connectify-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.location.includes(location)}
                      onChange={() => handleFilterChange("location", location)}
                    />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="connectify-filter-group">
              <h4>Type</h4>
              <div className="connectify-filter-options">
                {filterOptions.type.map((type) => (
                  <label key={type} className="connectify-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.type.includes(type)}
                      onChange={() => handleFilterChange("type", type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Mode Filter */}
            <div className="connectify-filter-group">
              <h4>Work Mode</h4>
              <div className="connectify-filter-options">
                {filterOptions.workMode.map((mode) => (
                  <label key={mode} className="connectify-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.workMode.includes(mode)}
                      onChange={() => handleFilterChange("workMode", mode)}
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="connectify-filter-group">
              <h4>Experience</h4>
              <div className="connectify-filter-options">
                {filterOptions.experience.map((exp) => (
                  <label key={exp} className="connectify-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={activeFilters.experience.includes(exp)}
                      onChange={() => handleFilterChange("experience", exp)}
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stipend Range Filter */}
            <div className="connectify-filter-group connectify-stipend-filter">
              <h4>Stipend/Salary Range</h4>
              <div className="connectify-range-slider">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={stipendRange[1]}
                  onChange={(e) =>
                    setStipendRange([stipendRange[0], parseInt(e.target.value)])
                  }
                />
                <div className="connectify-range-values">
                  <span>₹0</span>
                  <span>₹{stipendRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="connectify-results-count">
        {filteredOpportunities.length}{" "}
        {filteredOpportunities.length === 1 ? "opportunity" : "opportunities"}{" "}
        found
      </div>

      {/* Opportunities Listing */}
      <div className="connectify-opportunities-list">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((job) => (
            <div key={job.id} className="connectify-opportunity-card">
              <div className="connectify-card-header">
                <h3>{job.title}</h3>
                <button
                  className="connectify-bookmark-btn"
                  onClick={() => toggleBookmark(job.id)}
                  aria-label={
                    bookmarked.includes(job.id)
                      ? "Remove bookmark"
                      : "Add bookmark"
                  }
                >
                  {bookmarked.includes(job.id) ? (
                    <BookmarkCheck
                      className="connectify-bookmarked"
                      size={20}
                    />
                  ) : (
                    <Bookmark size={20} />
                  )}
                </button>
              </div>

              <div className="connectify-company-name">{job.company}</div>

              <div className="connectify-card-details">
                <div className="connectify-detail-item">
                  <MapPin size={16} />
                  <span>
                    {job.location} ({job.workMode})
                  </span>
                </div>

                <div className="connectify-detail-item">
                  <DollarSign size={16} />
                  <span>{job.stipend}</span>
                </div>

                <div className="connectify-detail-item">
                  <Clock size={16} />
                  <span>{job.duration}</span>
                </div>

                <div className="connectify-detail-item">
                  <Calendar size={16} />
                  <span>
                    Apply by: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="connectify-tags">
                {job.tags.map((tag) => (
                  <span key={tag} className="connectify-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              {applied.includes(job.id) && (
                <div className="connectify-applied-badge">
                  <CheckCircle size={14} />
                  Applied
                </div>
              )}

              <div className="connectify-card-actions">
                <button
                  className="connectify-view-details-btn"
                  onClick={() => viewJobDetails(job)}
                >
                  View Details
                  <ArrowRight size={16} />
                </button>

                <button
                  className={`connectify-apply-btn ${
                    applied.includes(job.id) ? "connectify-already-applied" : ""
                  }`}
                  onClick={() => toggleApplied(job.id)}
                >
                  {applied.includes(job.id) ? "Applied" : "Apply Now"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="connectify-no-results">
            <p>
              No opportunities match your filters. Try adjusting your search
              criteria.
            </p>
            <button
              className="connectify-clear-filters-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {showDetails && selectedOpportunity && (
        <div className="connectify-modal-overlay">
          <div className="connectify-job-details-modal">
            <button
              className="connectify-close-modal-btn"
              onClick={closeJobDetails}
            >
              <X size={24} />
            </button>

            <div className="connectify-modal-header">
              <h2>{selectedOpportunity.title}</h2>
              <div className="connectify-company-name">
                {selectedOpportunity.company}
              </div>

              <div className="connectify-modal-actions">
                <button
                  className="connectify-bookmark-btn-large"
                  onClick={() => toggleBookmark(selectedOpportunity.id)}
                >
                  {bookmarked.includes(selectedOpportunity.id) ? (
                    <BookmarkCheck
                      className="connectify-bookmarked"
                      size={20}
                    />
                  ) : (
                    <Bookmark size={20} />
                  )}
                  {bookmarked.includes(selectedOpportunity.id)
                    ? "Saved"
                    : "Save"}
                </button>

                <button
                  className={`connectify-apply-btn-large ${
                    applied.includes(selectedOpportunity.id)
                      ? "connectify-already-applied"
                      : ""
                  }`}
                  onClick={() => toggleApplied(selectedOpportunity.id)}
                >
                  {applied.includes(selectedOpportunity.id)
                    ? "Applied"
                    : "Apply Now"}
                </button>
              </div>
            </div>

            <div className="connectify-modal-content">
              <div className="connectify-modal-section">
                <h3>Key Details</h3>
                <div className="connectify-key-details-grid">
                  <div className="connectify-key-detail">
                    <MapPin size={18} />
                    <div>
                      <h4>Location</h4>
                      <p>
                        {selectedOpportunity.location} (
                        {selectedOpportunity.workMode})
                      </p>
                    </div>
                  </div>

                  <div className="connectify-key-detail">
                    <DollarSign size={18} />
                    <div>
                      <h4>Compensation</h4>
                      <p>{selectedOpportunity.stipend}</p>
                    </div>
                  </div>

                  <div className="connectify-key-detail">
                    <Clock size={18} />
                    <div>
                      <h4>Duration</h4>
                      <p>{selectedOpportunity.duration}</p>
                    </div>
                  </div>

                  <div className="connectify-key-detail">
                    <Calendar size={18} />
                    <div>
                      <h4>Deadline</h4>
                      <p>
                        {new Date(
                          selectedOpportunity.deadline
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="connectify-modal-section">
                <h3>Description</h3>
                <p>{selectedOpportunity.description}</p>
              </div>

              <div className="connectify-modal-section">
                <h3>Required Skills</h3>
                <div className="connectify-skills-list">
                  {selectedOpportunity.skills.map((skill) => (
                    <span key={skill} className="connectify-skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="connectify-modal-section">
                <h3>Perks & Benefits</h3>
                <ul className="connectify-perks-list">
                  {selectedOpportunity.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              </div>

              <div className="connectify-modal-section">
                <h3>About the Company</h3>
                <p>{selectedOpportunity.aboutCompany}</p>
              </div>

              <div className="connectify-modal-section">
                <h3>Application Process</h3>
                <p>{selectedOpportunity.applicationProcess}</p>
              </div>
            </div>

            <div className="connectify-modal-footer">
              <button
                className="connectify-close-btn"
                onClick={closeJobDetails}
              >
                Close
              </button>
              <button
                className={`connectify-apply-btn-large ${
                  applied.includes(selectedOpportunity.id)
                    ? "connectify-already-applied"
                    : ""
                }`}
                onClick={() => toggleApplied(selectedOpportunity.id)}
              >
                {applied.includes(selectedOpportunity.id)
                  ? "Applied"
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityListings;
