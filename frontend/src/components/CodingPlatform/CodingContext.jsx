import React, { createContext, useState, useContext } from "react";

const CodingContext = createContext();

export const CodingProvider = ({ children }) => {
  // Hardcoded data
  const HARDCODED_PROBLEMS = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
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
      ],
      companies: ["Amazon", "Google", "Microsoft"],
      topics: ["Array", "Hash Table"],
      testCases: [
        { input: "[2,7,11,15]\n9", expected: "[0,1]" },
        { input: "[3,2,4]\n6", expected: "[1,2]" },
      ],
      starterCode: {
        python: "def twoSum(nums, target):\n    # Your code here\n    pass",
        javascript:
          "function twoSum(nums, target) {\n    // Your code here\n};",
        java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
      },
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      description:
        "Write a function that reverses a string. The input string is given as an array of characters s.",
      constraints: [
        "1 <= s.length <= 10^5",
        "s[i] is a printable ascii character.",
      ],
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
        },
      ],
      companies: ["Facebook", "Apple"],
      topics: ["String", "Two Pointers"],
      testCases: [
        { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      ],
      starterCode: {
        python: "def reverseString(s):\n    # Your code here\n    pass",
        javascript: "function reverseString(s) {\n    // Your code here\n};",
        java: "class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}",
        cpp: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Your code here\n    }\n};",
      },
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Easy",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only."],
      examples: [
        {
          input: 's = "()"',
          output: "true",
        },
        {
          input: 's = "(]"',
          output: "false",
        },
      ],
      companies: ["Amazon", "Google", "Bloomberg"],
      topics: ["Stack", "String"],
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
  ];


  const HARDCODED_SUBMISSIONS = [
    {
      id: 1,
      problemId: 1,
      userId: 1,
      code: "def twoSum(nums, target):\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i\n    return []",
      language: "python",
      status: "Accepted",
      runtime: 56,
      memory: 14.5,
      timestamp: "2023-05-15T10:30:00Z",
      testCases: [
        { input: "[2,7,11,15]\n9", output: "[0,1]", passed: true },
        { input: "[3,2,4]\n6", output: "[1,2]", passed: true },
      ],
      analytics: {
        runtimePercentile: 85,
        memoryPercentile: 72,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    },
    {
      id: 2,
      problemId: 1,
      userId: 1,
      code: "def twoSum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []",
      language: "python",
      status: "Time Limit Exceeded",
      runtime: 2100,
      memory: 13.8,
      timestamp: "2023-05-14T15:45:00Z",
      testCases: [
        { input: "[2,7,11,15]\n9", output: "[0,1]", passed: true },
        { input: "[3,2,4]\n6", output: "[1,2]", passed: false },
      ],
    },
    {
      id: 3,
      problemId: 2,
      userId: 1,
      code: "function reverseString(s) {\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++;\n        right--;\n    }\n};",
      language: "javascript",
      status: "Accepted",
      runtime: 68,
      memory: 13.2,
      timestamp: "2023-05-16T08:00:00Z",
      testCases: [
        {
          input: '["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          passed: true,
        },
      ],
      analytics: {
        runtimePercentile: 78,
        memoryPercentile: 66,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    },
  ];


  const learningModules = [
    { id: 1, title: "Top Interview Questions", count: 145, icon: "📝" },
    { id: 2, title: "DSA Crash Course", count: 95, icon: "🧮" },
    { id: 3, title: "30 Days of JavaScript", count: 30, icon: "📅" },
    { id: 4, title: "SQL Practice", count: 50, icon: "🗄️" },
    { id: 5, title: "Intro to Pandas", count: 35, icon: "🐼" },
    { id: 6, title: "System Design", count: 25, icon: "🏗️" },
  ];

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

  const companiesData = [
    { name: "Google", count: 243 },
    { name: "Amazon", count: 185 },
    { name: "Meta", count: 157 },
    { name: "Microsoft", count: 132 },
    { name: "Apple", count: 97 },
    { name: "Uber", count: 86 },
    { name: "LinkedIn", count: 75 },
  ];

  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showCodingPlatform, setShowCodingPlatform] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedList, setSelectedList] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Filter problems based on selected filters
  const filteredProblems = HARDCODED_PROBLEMS.filter((problem) => {
    // Filter by search query
    if (
      searchQuery &&
      !problem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !problem.id.toString().includes(searchQuery)
    ) {
      return false;
    }

    // Filter by difficulty
    if (
      selectedDifficulty !== "All" &&
      problem.difficulty !== selectedDifficulty
    ) {
      return false;
    }

    // Filter by status
    if (selectedStatus === "Solved" && !problem.solved) {
      return false;
    } else if (selectedStatus === "Unsolved" && problem.solved) {
      return false;
    }

    // Filter by tags
    if (
      selectedTags.length > 0 &&
      !problem.tags.some((tag) => selectedTags.includes(tag))
    ) {
      return false;
    }

    return true;
  });

  // Open a problem in the coding platform
  const openProblem = (problem) => {
    setCurrentProblem(problem);
    setCode(problem.starterCode[language] || "// Start coding here");
    setShowCodingPlatform(true);

    // Load submissions for this problem
    const userSubmissions = HARDCODED_SUBMISSIONS.filter(
      (s) => s.problemId === problem.id && s.userId === 1
    );
    setSubmissions(userSubmissions);
  };

  // Close the coding platform and go back to problem list
  const closeProblem = () => {
    setShowCodingPlatform(false);
  };

  // Pick a random problem
  const pickRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    openProblem(filteredProblems[randomIndex]);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle editor theme
  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
  };

  return (
    <CodingContext.Provider
      value={{
        // State
        darkMode,
        currentProblem,
        showCodingPlatform,
        code,
        setCode,
        language,
        setLanguage,
        theme,
        submissions,
        searchQuery,
        setSearchQuery,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedStatus,
        setSelectedStatus,
        selectedList,
        setSelectedList,
        selectedTags,
        setSelectedTags,
        selectedLanguages,
        setSelectedLanguages,

        // Data
        problems: HARDCODED_PROBLEMS,
        filteredProblems,
        learningModules,
        topicsData,
        languagesData,
        companiesData,

        // Functions
        openProblem,
        closeProblem,
        pickRandomProblem,
        toggleDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </CodingContext.Provider>
  );
};

export const useCoding = () => {
  return useContext(CodingContext);
};
