import React, { useState, useEffect, createContext } from "react";
import { motion } from "framer-motion";
import CodingPlatform from "./CodingPlatform";
import "./ConnectifyCodingPlatfom.css";

// Hardcoded problem data
const HARDCODED_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "45.6%",
    frequency: 80,
    solved: false,
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Meta"],
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expected: "[0,1]" },
      { input: "[3,2,4]\n6", expected: "[1,2]" },
    ],
    starterCode: {
      python: "def twoSum(nums, target):\n    # Your code here\n    pass",
      javascript: "function twoSum(nums, target) {\n    // Your code here\n};",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
    },
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
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
    ],
    testCases: [{ input: "[2,4,3]\n[5,6,4]", expected: "[7,0,8]" }],
    starterCode: {
      python: "def addTwoNumbers(l1, l2):\n    # Your code here\n    pass",
      javascript: "function addTwoNumbers(l1, l2) {\n    // Your code here\n};",
      java: "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Your code here\n    }\n};",
    },
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "35.2%",
    frequency: 75,
    solved: false,
    tags: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Google", "Microsoft"],
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
    ],
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" },
    ],
    starterCode: {
      python:
        "def lengthOfLongestSubstring(s):\n    # Your code here\n    pass",
      javascript:
        "function lengthOfLongestSubstring(s) {\n    // Your code here\n};",
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n    }\n};",
    },
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "32.1%",
    frequency: 60,
    solved: false,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Amazon", "Apple", "Microsoft"],
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
    ],
    testCases: [
      { input: "[1,3]\n[2]", expected: "2.00000" },
      { input: "[1,2]\n[3,4]", expected: "2.50000" },
    ],
    starterCode: {
      python:
        "def findMedianSortedArrays(nums1, nums2):\n    # Your code here\n    pass",
      javascript:
        "function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n};",
      java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Your code here\n    }\n};",
    },
  },
  {
    id: 5,
    title: "Reverse Integer",
    difficulty: "Medium",
    acceptance: "27.5%",
    frequency: 55,
    solved: false,
    tags: ["Math"],
    companies: ["Bloomberg", "Apple", "Google"],
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    examples: [
      {
        input: "x = 123",
        output: "321",
      },
      {
        input: "x = -123",
        output: "-321",
      },
    ],
    testCases: [
      { input: "123", expected: "321" },
      { input: "-123", expected: "-321" },
      { input: "120", expected: "21" },
    ],
    starterCode: {
      python: "def reverse(x):\n    # Your code here\n    pass",
      javascript: "function reverse(x) {\n    // Your code here\n};",
      java: "class Solution {\n    public int reverse(int x) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    int reverse(int x) {\n        // Your code here\n    }\n};",
    },
  },
  {
    id: 6,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "42.3%",
    frequency: 70,
    solved: true,
    tags: ["Stack", "String"],
    companies: ["Amazon", "Bloomberg", "Facebook"],
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only."],
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string is valid.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Mismatched parentheses.",
      },
    ],
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"(]"', expected: "false" },
    ],
    starterCode: {
      python: "def isValid(s):\n    # Your code here\n    pass",
      javascript: "function isValid(s) {\n    // Your code here\n};",
      java: "class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n    }\n};",
    },
  },
  {
    id: 7,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    acceptance: "58.4%",
    frequency: 66,
    solved: false,
    tags: ["Linked List", "Recursion"],
    companies: ["Google", "Amazon"],
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merging in sorted order.",
      },
    ],
    testCases: [{ input: "[1,2,4]\n[1,3,4]", expected: "[1,1,2,3,4,4]" }],
    starterCode: {
      python:
        "def mergeTwoLists(list1, list2):\n    # Your code here\n    pass",
      javascript:
        "function mergeTwoLists(list1, list2) {\n    // Your code here\n};",
      java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Your code here\n    }\n}",
      cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Your code here\n    }\n};",
    },
  },
];

// Mock data for learning modules
const learningModules = [
  {
    id: 1,
    title: "Top Interview Questions",
    count: 145,
    icon: "📝",
    description:
      "Ace your interviews with the most frequently asked questions and detailed explanations.",
  },
  {
    id: 2,
    title: "DSA Crash Course",
    count: 95,
    icon: "🧮",
    description:
      "Master Data Structures and Algorithms with this comprehensive crash course. Learn the fundamentals and practice problem-solving.",
  },
  {
    id: 3,
    title: "30 Days of JavaScript",
    count: 30,
    icon: "📅",
    description:
      "Embark on a 30-day journey to become proficient in JavaScript. Cover core concepts and build practical projects.",
  },
  {
    id: 4,
    title: "React Fundamentals",
    count: 60,
    icon: "⚛️",
    description:
      "Dive into the world of React! Learn about components, state management, routing, and build interactive user interfaces.",
  },
  {
    id: 5,
    title: "Node.js for Beginners",
    count: 45,
    icon: "🚀",
    description:
      "Get started with backend development using Node.js. Learn about server-side JavaScript, APIs, and database interactions.",
  },
  {
    id: 6,
    title: "Python for Data Science",
    count: 120,
    icon: "📊",
    description:
      "Unlock the power of data science with Python. Learn essential libraries like NumPy, Pandas, and Matplotlib.",
  },
  {
    id: 7,
    title: "SQL Essentials",
    count: 75,
    icon: "🗄️",
    description:
      "Master the fundamentals of SQL for database management and querying. Learn to create, read, update, and delete data efficiently.",
  },
  {
    id: 8,
    title: "Git and Version Control",
    count: 35,
    icon: "🌱",
    description:
      "Learn the essentials of Git for version control, collaboration, and managing your codebase effectively.",
  },
  {
    id: 9,
    title: "Web Development Bootcamp",
    count: 180,
    icon: "🌐",
    description:
      "A comprehensive bootcamp covering HTML, CSS, and JavaScript to build responsive and interactive websites.",
  },
  {
    id: 10,
    title: "Cybersecurity Basics",
    count: 50,
    icon: "🔒",
    description:
      "Understand the fundamental concepts of cybersecurity, common threats, and best practices for staying safe online.",
  },
  {
    id: 11,
    title: "Mobile App Development with React Native",
    count: 90,
    icon: "📱",
    description:
      "Build cross-platform mobile applications using your JavaScript and React knowledge with React Native.",
  },
];

// Mock data for topics/tags
const topicsData = [
  "Array",
  "Hash Table",
  "Linked List",
  "Math",
  "String",
  "Tree",
  "Graph",
  "Sorting",
  "Searching",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Bit Manipulation",
  "Queue",
  "Stack",
  "Heap (Priority Queue)",
  "Geometry",
  "Probability",
  "Recursion",
];

// Mock data for companies
const companiesData = [
  {
    name: "Google",
    count: 243,
    industry: "Technology",
    location: "Mountain View, CA",
    logo: "google_logo.png",
  },
  {
    name: "Amazon",
    count: 185,
    industry: "E-commerce",
    location: "Seattle, WA",
    logo: "amazon_logo.png",
  },
  {
    name: "Meta",
    count: 157,
    industry: "Social Media",
    location: "Menlo Park, CA",
    logo: "meta_logo.png",
  },
  {
    name: "Microsoft",
    count: 210,
    industry: "Technology",
    location: "Redmond, WA",
    logo: "microsoft_logo.png",
  },
  {
    name: "Apple",
    count: 195,
    industry: "Technology",
    location: "Cupertino, CA",
    logo: "apple_logo.png",
  },
  {
    name: "Netflix",
    count: 120,
    industry: "Entertainment",
    location: "Los Gatos, CA",
    logo: "netflix_logo.png",
  },
  {
    name: "Tesla",
    count: 98,
    industry: "Automotive",
    location: "Austin, TX",
    logo: "tesla_logo.png",
  },
  {
    name: "Samsung",
    count: 168,
    industry: "Electronics",
    location: "Seoul, South Korea",
    logo: "samsung_logo.png",
  },
  {
    name: "Nvidia",
    count: 112,
    industry: "Semiconductor",
    location: "Santa Clara, CA",
    logo: "nvidia_logo.png",
  },
  {
    name: "Accenture",
    count: 140,
    industry: "Consulting",
    location: "Dublin, Ireland",
    logo: "accenture_logo.png",
  },
  {
    name: "IBM",
    count: 135,
    industry: "Technology",
    location: "Armonk, NY",
    logo: "ibm_logo.png",
  },
  {
    name: "Oracle",
    count: 125,
    industry: "Software",
    location: "Austin, TX",
    logo: "oracle_logo.png",
  },
  {
    name: "Intel",
    count: 105,
    industry: "Semiconductor",
    location: "Santa Clara, CA",
    logo: "intel_logo.png",
  },
  {
    name: "Salesforce",
    count: 118,
    industry: "Software",
    location: "San Francisco, CA",
    logo: "salesforce_logo.png",
  },
  {
    name: "Adobe",
    count: 92,
    industry: "Software",
    location: "San Jose, CA",
    logo: "adobe_logo.png",
  },
];

// Theme context
const ThemeContext = createContext();

const ConnectifyPlatform = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [problems, setProblems] = useState(HARDCODED_PROBLEMS);
  const [filteredProblems, setFilteredProblems] = useState(HARDCODED_PROBLEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedList, setSelectedList] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showCodingPlatform, setShowCodingPlatform] = useState(false);
  const [currentProblemId, setCurrentProblemId] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    let result = problems;

    if (searchQuery) {
      result = result.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.id.toString().includes(searchQuery)
      );
    }

    if (selectedDifficulty !== "All") {
      result = result.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    if (selectedStatus === "Solved") {
      result = result.filter((problem) => problem.solved);
    } else if (selectedStatus === "Unsolved") {
      result = result.filter((problem) => !problem.solved);
    }

    if (selectedList === "Favorites") {
      result = result.filter((problem) => problem.id % 2 === 0);
    } else if (selectedList === "Attempted") {
      result = result.filter((problem) => problem.solved);
    }

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

  const pickRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    setCurrentProblemId(filteredProblems[randomIndex].id);
    setShowCodingPlatform(true);
  };

  const openProblem = (problemId) => {
    setCurrentProblemId(problemId);
    setShowCodingPlatform(true);
  };

  const closeProblem = () => {
    setShowCodingPlatform(false);
    setCurrentProblemId(null);
  };

  const daysInMonth = 30;
  const streakData = Array(daysInMonth)
    .fill()
    .map((_, index) => ({
      day: index + 1,
      completed: Math.random() > 0.4,
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
                              setSelectedTags(
                                selectedTags.includes(topic)
                                  ? selectedTags.filter((t) => t !== topic)
                                  : [...selectedTags, topic]
                              );
                            }}
                          >
                            {topic}
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
                            onClick={() => openProblem(problem.id)}
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
                </div>
              </div>
            </div>
          </>
        ) : (
          <CodingPlatform
            problemId={currentProblemId}
            userId={1}
            onClose={closeProblem}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

const NavigationBar = ({ darkMode, toggleDarkMode }) => {
  const navItems = ["Problems", "Contests", "Discussions"];

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
          <div className="connectify-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </div>
          <div className="connectify-user-avatar">JD</div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ConnectifyPlatform;
