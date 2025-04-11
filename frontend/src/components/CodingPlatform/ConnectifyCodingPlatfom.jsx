import React, { useState, useEffect, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ConnectifyCodingPlatfom.css";

// Create context for theme
const ThemeContext = createContext();

// Mock data for problems
const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "45.6%",
    frequency: 80,
    solved: false,
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Meta"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "38.2%",
    frequency: 65,
    solved: true,
    tags: ["Linked List", "Math"],
    companies: ["Microsoft", "Meta"],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "32.4%",
    frequency: 70,
    solved: false,
    tags: ["String", "Sliding Window"],
    companies: ["Amazon", "Google"],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "25.8%",
    frequency: 40,
    solved: false,
    tags: ["Array", "Binary Search"],
    companies: ["Google", "Apple"],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "31.5%",
    frequency: 55,
    solved: true,
    tags: ["String", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft"],
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    acceptance: "41.2%",
    frequency: 35,
    solved: false,
    tags: ["String"],
    companies: ["Google"],
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    acceptance: "28.4%",
    frequency: 60,
    solved: true,
    tags: ["Math"],
    companies: ["Amazon", "Apple"],
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    acceptance: "16.5%",
    frequency: 50,
    solved: false,
    tags: ["String", "Math"],
    companies: ["Microsoft", "Google"],
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    acceptance: "51.8%",
    frequency: 75,
    solved: true,
    tags: ["Math"],
    companies: ["Amazon"],
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    acceptance: "28.1%",
    frequency: 30,
    solved: false,
    tags: ["String", "Dynamic Programming"],
    companies: ["Google", "Meta"],
  },
];

// Mock data for learning modules
const learningModules = [
  { id: 1, title: "Top Interview Questions", count: 145, icon: "📝" },
  { id: 2, title: "DSA Crash Course", count: 95, icon: "🧮" },
  { id: 3, title: "30 Days of JavaScript", count: 30, icon: "📅" },
  { id: 4, title: "SQL Practice", count: 50, icon: "🗄️" },
  { id: 5, title: "Intro to Pandas", count: 35, icon: "🐼" },
  { id: 6, title: "System Design", count: 25, icon: "🏗️" },
];

// Mock data for topics/tags
const topicsData = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Greedy",
  "Sorting",
  "Depth-First Search",
  "Binary Search",
  "Tree",
  "Two Pointers",
  "Breadth-First Search",
  "Stack",
  "Backtracking",
  "Design",
];

// Mock data for languages
const languagesData = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Ruby",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Rust",
];

// Mock data for companies
const companiesData = [
  { name: "Google", count: 243 },
  { name: "Amazon", count: 185 },
  { name: "Meta", count: 157 },
  { name: "Microsoft", count: 132 },
  { name: "Apple", count: 97 },
  { name: "Uber", count: 86 },
  { name: "LinkedIn", count: 75 },
];

// Main Component
const ConnectifyPlatform = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [problems, setProblems] = useState(problemsData);
  const [filteredProblems, setFilteredProblems] = useState(problemsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedList, setSelectedList] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showCodingPlatform, setShowCodingPlatform] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter problems based on selected filters
  useEffect(() => {
    let result = problems;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.id.toString().includes(searchQuery)
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "All") {
      result = result.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    // Filter by status
    if (selectedStatus === "Solved") {
      result = result.filter((problem) => problem.solved);
    } else if (selectedStatus === "Unsolved") {
      result = result.filter((problem) => !problem.solved);
    }

    // Filter by list
    if (selectedList === "Favorites") {
      // Mock implementation - in a real app, this would check a favorites list
      result = result.filter((problem) => problem.id % 3 === 0);
    } else if (selectedList === "Attempted") {
      result = result.filter(
        (problem) => problem.solved || problem.id % 4 === 0
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((problem) =>
        problem.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    setFilteredProblems(result);
  }, [
    searchQuery,
    selectedDifficulty,
    selectedStatus,
    selectedList,
    selectedTags,
    problems,
  ]);

  // Function to pick a random problem
  const pickRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    const selectedProblem = filteredProblems[randomIndex];
    setCurrentProblem(selectedProblem);
    setShowCodingPlatform(true);
  };

  // Function to open problem
  const openProblem = (problem) => {
    setCurrentProblem(problem);
    setShowCodingPlatform(true);
  };

  // Function to close problem and go back to list
  const closeProblem = () => {
    setShowCodingPlatform(false);
  };

  // Create streak data
  const daysInMonth = 30;
  const streakData = Array(daysInMonth)
    .fill()
    .map((_, index) => ({
      day: index + 1,
      completed: Math.random() > 0.4, // Random completion status
    }));

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div
        className={`connectify-platform ${
          darkMode ? "dark-mode" : "light-mode"
        }`}
      >
        {!showCodingPlatform ? (
          <>
            <NavigationBar
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <div className="connectify-main-content">
              <div className="connectify-container">
                <motion.div
                  className="connectify-learning-modules"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="connectify-section-title">Learning Modules</h2>
                  <div className="connectify-module-cards">
                    {learningModules.map((module) => (
                      <motion.div
                        key={module.id}
                        className="connectify-module-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="connectify-module-icon">
                          {module.icon}
                        </div>
                        <div className="connectify-module-info">
                          <h3>{module.title}</h3>
                          <p>{module.count} Problems</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="connectify-problem-section">
                  <motion.div
                    className="connectify-filter-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="connectify-topic-filters">
                      <h3>Topics</h3>
                      <div className="connectify-topics-container">
                        {topicsData.map((topic) => (
                          <div
                            key={topic}
                            className={`connectify-topic-tag ${
                              selectedTags.includes(topic) ? "selected" : ""
                            }`}
                            onClick={() => {
                              if (selectedTags.includes(topic)) {
                                setSelectedTags(
                                  selectedTags.filter((t) => t !== topic)
                                );
                              } else {
                                setSelectedTags([...selectedTags, topic]);
                              }
                            }}
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="connectify-language-filters">
                      <h3>Languages</h3>
                      <div className="connectify-languages-container">
                        {languagesData.map((language) => (
                          <div
                            key={language}
                            className={`connectify-language-tag ${
                              selectedLanguages.includes(language)
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              if (selectedLanguages.includes(language)) {
                                setSelectedLanguages(
                                  selectedLanguages.filter(
                                    (l) => l !== language
                                  )
                                );
                              } else {
                                setSelectedLanguages([
                                  ...selectedLanguages,
                                  language,
                                ]);
                              }
                            }}
                          >
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="connectify-problem-filters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="connectify-search-bar">
                      <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="connectify-search-input"
                      />
                    </div>

                    <div className="connectify-filter-dropdowns">
                      <select
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                        className="connectify-filter-dropdown"
                      >
                        <option value="All">All Lists</option>
                        <option value="Favorites">Favorites</option>
                        <option value="Attempted">Attempted</option>
                        <option value="Unsolved">Unsolved</option>
                      </select>

                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="connectify-filter-dropdown"
                      >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="connectify-filter-dropdown"
                      >
                        <option value="All">All Status</option>
                        <option value="Solved">Solved</option>
                        <option value="Unsolved">Unsolved</option>
                      </select>
                    </div>

                    <motion.button
                      className="connectify-random-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={pickRandomProblem}
                    >
                      Pick One
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="connectify-problem-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <table className="connectify-problems-table">
                      <thead>
                        <tr>
                          <th className="connectify-status-col">Status</th>
                          <th className="connectify-id-col">ID</th>
                          <th className="connectify-title-col">Title</th>
                          <th className="connectify-difficulty-col">
                            Difficulty
                          </th>
                          <th className="connectify-acceptance-col">
                            Acceptance
                          </th>
                          <th className="connectify-frequency-col">
                            Frequency
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProblems.map((problem) => (
                          <motion.tr
                            key={problem.id}
                            className="connectify-problem-row"
                            onClick={() => openProblem(problem)}
                            whileHover={{
                              backgroundColor: darkMode ? "#2d3748" : "#f7fafc",
                            }}
                          >
                            <td>
                              <div
                                className={`connectify-status-icon ${
                                  problem.solved ? "solved" : "unsolved"
                                }`}
                              >
                                {problem.solved ? "✓" : ""}
                              </div>
                            </td>
                            <td>{problem.id}</td>
                            <td className="connectify-problem-title">
                              {problem.title}
                            </td>
                            <td>
                              <span
                                className={`connectify-difficulty-badge ${problem.difficulty.toLowerCase()}`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>
                            <td>{problem.acceptance}</td>
                            <td>
                              <div className="connectify-frequency-bar-container">
                                <div
                                  className="connectify-frequency-bar"
                                  style={{ width: `${problem.frequency}%` }}
                                ></div>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </div>

                <div className="connectify-sidebar">
                  <motion.div
                    className="connectify-streak-calendar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3>Your Coding Streak</h3>
                    <div className="connectify-calendar">
                      {streakData.map((day, index) => (
                        <div
                          key={index}
                          className={`connectify-calendar-day ${
                            day.completed ? "completed" : "empty"
                          }`}
                          title={`Day ${day.day}: ${
                            day.completed ? "Completed" : "Not completed"
                          }`}
                        >
                          {day.day}
                        </div>
                      ))}
                    </div>
                    <div className="connectify-streak-info">
                      <p>Current Streak: 7 days</p>
                      <p>Longest Streak: 14 days</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="connectify-company-trends"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3>Top Companies</h3>
                    <ul className="connectify-company-list">
                      {companiesData.map((company) => (
                        <li
                          key={company.name}
                          className="connectify-company-item"
                        >
                          <span className="connectify-company-name">
                            {company.name}
                          </span>
                          <span className="connectify-company-count">
                            {company.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <CodingPlatform problem={currentProblem} onClose={closeProblem} />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

// Navigation Bar Component
const NavigationBar = ({ darkMode, toggleDarkMode }) => {
  const navItems = [
    "Explore",
    "Problems",
    "Contests",
    "Discussions",
    "Interview Prep",
    "Store",
  ];

  return (
    <motion.nav
      className="connectify-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="connectify-nav-container">
        <div className="connectify-nav-left">
          <div className="connectify-logo">Connectify</div>
          <ul className="connectify-nav-items">
            {navItems.map((item) => (
              <li key={item} className="connectify-nav-item">
                <a href="#" className={item === "Problems" ? "active" : ""}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="connectify-nav-right">
          <button className="connectify-upgrade-btn">Upgrade to Pro</button>
          <div className="connectify-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </div>
          <div className="connectify-user-avatar">JD</div>
        </div>
      </div>
    </motion.nav>
  );
};

// Mock Coding Platform Component
const CodingPlatform = ({ problem, onClose }) => {
  if (!problem) return null;

  return (
    <div className="connectify-coding-platform">
      <div className="connectify-coding-header">
        <button className="connectify-back-button" onClick={onClose}>
          &larr; Back to Problems
        </button>
        <h2>
          Problem #{problem.id}: {problem.title}
        </h2>
        <div className="connectify-problem-meta">
          <span
            className={`connectify-difficulty-badge ${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>
          <span className="connectify-acceptance">
            Acceptance: {problem.acceptance}
          </span>
        </div>
      </div>

      <div className="connectify-coding-container">
        <div className="connectify-problem-description">
          <h3>Description</h3>
          <p>
            This is a placeholder for the problem description of "
            {problem.title}". In a real implementation, this would contain the
            full description text, examples, constraints, and other relevant
            information.
          </p>

          <h4>Examples:</h4>
          <div className="connectify-example">
            <pre>
              <strong>Input:</strong> nums = [2, 7, 11, 15], target = 9
              <strong>Output:</strong> [0, 1]
              <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
              return [0, 1].
            </pre>
          </div>

          <h4>Constraints:</h4>
          <ul>
            <li>2 ≤ nums.length ≤ 10^4</li>
            <li>-10^9 ≤ nums[i] ≤ 10^9</li>
            <li>-10^9 ≤ target ≤ 10^9</li>
            <li>Only one valid answer exists.</li>
          </ul>

          <div className="connectify-problem-companies">
            <h4>Companies:</h4>
            <div className="connectify-company-tags">
              {problem.companies.map((company) => (
                <span key={company} className="connectify-company-tag">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="connectify-code-editor">
          <div className="connectify-editor-header">
            <select className="connectify-language-select">
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
            <button className="connectify-reset-btn">Reset</button>
          </div>
          <div className="connectify-editor-area">
            <pre className="connectify-code-area">
              {/* Sample code placeholder */}
              {problem.id === 1
                ? `function twoSum(nums, target) {
    // Write your code here
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`
                : `// Write your solution for "${problem.title}" here`}
            </pre>
          </div>
          <div className="connectify-editor-footer">
            <button className="connectify-run-btn">Run Code</button>
            <button className="connectify-submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectifyPlatform;
