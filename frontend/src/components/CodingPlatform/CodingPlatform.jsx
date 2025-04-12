import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MonacoEditor from "react-monaco-editor";
import { Resizable } from "re-resizable";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import {
  FaPlay,
  FaCheck,
  FaDownload,
  FaCopy,
  FaMoon,
  FaSun,
  FaPlus,
  FaMinus,
  FaUndo,
} from "react-icons/fa";
import "./CodingPlatform.css";

// Hardcoded problem data (aligned with ConnectifyPlatform)
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
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    companies: ["Amazon", "Google", "Meta"],
    topics: ["Array", "Hash Table"],
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
    companies: ["Microsoft", "Meta"],
    topics: ["Linked List", "Math"],
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
    companies: ["Amazon", "Google", "Microsoft"],
    topics: ["Hash Table", "String", "Sliding Window"],
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
    companies: ["Amazon", "Apple", "Microsoft"],
    topics: ["Array", "Binary Search", "Divide and Conquer"],
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
    companies: ["Bloomberg", "Apple", "Google"],
    topics: ["Math"],
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
];

// Hardcoded submissions
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
  },
  {
    id: 2,
    problemId: 2,
    userId: 1,
    code: "function addTwoNumbers(l1, l2) {\n    let dummy = new ListNode(0);\n    let curr = dummy;\n    let carry = 0;\n    \n    while (l1 || l2 || carry) {\n        let sum = (l1?.val || 0) + (l2?.val || 0) + carry;\n        carry = Math.floor(sum / 10);\n        curr.next = new ListNode(sum % 10);\n        curr = curr.next;\n        l1 = l1?.next;\n        l2 = l2?.next;\n    }\n    \n    return dummy.next;\n};",
    language: "javascript",
    status: "Accepted",
    runtime: 120,
    memory: 45.2,
    timestamp: "2023-05-16T14:45:00Z",
    testCases: [{ input: "[2,4,3]\n[5,6,4]", output: "[7,0,8]", passed: true }],
  },
];

const CodingPlatform = ({ problemId, userId, onClose }) => {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [testCases, setTestCases] = useState([]);
  const [executionResults, setExecutionResults] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [expandedExamples, setExpandedExamples] = useState({});

  useEffect(() => {
    if (problemId) {
      const foundProblem = HARDCODED_PROBLEMS.find((p) => p.id === problemId);
      if (foundProblem) {
        setProblem(foundProblem);
        setTestCases(foundProblem.testCases);
        setCode(foundProblem.starterCode[language] || "// Start coding here");
      }

      const userSubmissions = HARDCODED_SUBMISSIONS.filter(
        (s) => s.problemId === problemId && s.userId === userId
      );
      setSubmissions(userSubmissions);
    }
  }, [problemId, userId, language]);

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const toggleExample = (index) => {
    setExpandedExamples({
      ...expandedExamples,
      [index]: !expandedExamples[index],
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setTimeout(() => {
      const mockResults = {
        status: "Executed",
        consoleOutput: "Running test cases...\nAll test cases passed!",
        testCases: problem.testCases.map((testCase) => ({
          input: testCase.input,
          expected: testCase.expected,
          output: testCase.expected,
          passed: true,
        })),
      };
      setExecutionResults(mockResults);
      setIsRunning(false);
    }, 1000);
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newSubmission = {
        id: submissions.length + 1,
        problemId: problem.id,
        userId,
        code,
        language,
        status: Math.random() > 0.3 ? "Accepted" : "Wrong Answer",
        runtime: Math.floor(Math.random() * 100) + 10,
        memory: Math.random() * 10 + 10,
        timestamp: new Date().toISOString(),
        testCases: problem.testCases.map((testCase) => ({
          input: testCase.input,
          expected: testCase.expected,
          output: Math.random() > 0.3 ? testCase.expected : "wrong output",
          passed: Math.random() > 0.3,
        })),
      };
      setExecutionResults(newSubmission);
      setSubmissions([newSubmission, ...submissions]);
      setIsSubmitting(false);
    }, 1000);
  };

  const resetCode = () => {
    if (window.confirm("Are you sure you want to reset your code?")) {
      setCode(problem.starterCode[language] || "// Start coding here");
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const fileExtension =
      {
        python: ".py",
        javascript: ".js",
        java: ".java",
        cpp: ".cpp",
      }[language] || ".txt";
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `solution${fileExtension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
  };

  if (!problem) {
    return (
      <div className="coding-platform-loader">
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="coding-platform-container" data-theme={theme}>
      <div className="coding-platform-navbar">
        <div className="navbar-left">
          <button className="back-button" onClick={onClose}>
            ← Back to Problems
          </button>
          <h1 className="platform-title">CodeMaster</h1>
        </div>
        <div className="navbar-right">
          <select
            className="language-selector"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "vs-dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      <div className="coding-platform-main">
        <div className="problem-sidebar">
          <div className="problem-header">
            <h2 className="problem-title">{problem.title}</h2>
            <span
              className={`difficulty-tag difficulty-${problem.difficulty.toLowerCase()}`}
            >
              {problem.difficulty}
            </span>
          </div>

          <Tabs
            selectedIndex={activeTab === "description" ? 0 : 1}
            onSelect={(index) =>
              setActiveTab(index === 0 ? "description" : "discussion")
            }
          >
            <TabList className="problem-tabs">
              <Tab className="problem-tab">Description</Tab>
              <Tab className="problem-tab">Discussion</Tab>
            </TabList>

            <TabPanel className="tab-description">
              <div className="problem-description">
                <p>{problem.description}</p>
                <div className="problem-constraints">
                  <h3>Constraints:</h3>
                  <ul>
                    {problem.constraints.map((constraint, index) => (
                      <li key={`constraint-${index}`}>{constraint}</li>
                    ))}
                  </ul>
                </div>
                <div className="problem-examples">
                  <h3>Examples:</h3>
                  {problem.examples.map((example, index) => (
                    <div key={`example-${index}`} className="example-box">
                      <div
                        className="example-header"
                        onClick={() => toggleExample(index)}
                      >
                        <h4>Example {index + 1}</h4>
                        <span>{expandedExamples[index] ? "▼" : "►"}</span>
                      </div>
                      <AnimatePresence>
                        {expandedExamples[index] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="example-content"
                          >
                            <div className="example-input">
                              <strong>Input:</strong> {example.input}
                            </div>
                            <div className="example-output">
                              <strong>Output:</strong> {example.output}
                            </div>
                            {example.explanation && (
                              <div className="example-explanation">
                                <strong>Explanation:</strong>{" "}
                                {example.explanation}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel className="tab-discussion">
              <p>Discussion content goes here...</p>
            </TabPanel>
          </Tabs>
        </div>

        <Resizable
          className="editor-pane-container"
          defaultSize={{ width: "50%", height: "100%" }}
          minWidth="30%"
          maxWidth="70%"
          enable={{ right: true }}
        >
          <div className="editor-header">
            <select
              className="language-selector"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <div className="editor-actions">
              <button className="editor-action-btn" onClick={resetCode}>
                <FaUndo />
              </button>
              <button className="editor-action-btn" onClick={copyCode}>
                <FaCopy />
              </button>
              <button className="editor-action-btn" onClick={downloadCode}>
                <FaDownload />
              </button>
            </div>
          </div>

          <div className="monaco-editor-wrapper">
            <MonacoEditor
              width="100%"
              height="calc(100% - 96px)"
              language={language}
              theme={theme}
              value={code}
              onChange={handleCodeChange}
              options={{
                selectOnLineNumbers: true,
                readOnly: false,
                automaticLayout: true,
                minimap: { enabled: false },
              }}
            />
          </div>

          <div className="editor-controls">
            <button
              className={`run-btn ${isRunning ? "running" : ""}`}
              onClick={runCode}
              disabled={isRunning || isSubmitting}
            >
              <FaPlay /> Run Code
            </button>
            <button
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              onClick={submitCode}
              disabled={isRunning || isSubmitting}
            >
              <FaCheck /> Submit
            </button>
          </div>
        </Resizable>

        <div className="results-sidebar">
          <Tabs defaultIndex={0}>
            <TabList className="results-tabs">
              <Tab className="results-tab">Test Cases</Tab>
              <Tab className="results-tab">Submissions</Tab>
            </TabList>

            <TabPanel className="tab-test-cases">
              <div className="test-cases-container">
                {testCases.map((testCase, index) => (
                  <div key={`test-case-${index}`} className="test-case-item">
                    <div className="test-case-content">
                      <div className="test-case-input">
                        <label>Input:</label>
                        <textarea
                          value={testCase.input}
                          readOnly
                          className="test-case-textarea"
                        />
                      </div>
                      <div className="test-case-expected">
                        <label>Expected:</label>
                        <textarea
                          value={testCase.expected}
                          readOnly
                          className="test-case-textarea"
                        />
                      </div>
                      {executionResults &&
                        executionResults.testCases &&
                        executionResults.testCases[index] && (
                          <div className="test-case-result">
                            <div
                              className={`result-status ${
                                executionResults.testCases[index].passed
                                  ? "passed"
                                  : "failed"
                              }`}
                            >
                              {executionResults.testCases[index].passed
                                ? "Passed"
                                : "Failed"}
                            </div>
                            <div className="result-output">
                              <label>Actual:</label>
                              <div className="output-code">
                                {executionResults.testCases[index].output}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel className="tab-submissions">
              <div className="submissions-list">
                <h3>Your Submissions</h3>
                {submissions.length > 0 ? (
                  submissions.map((submission, index) => (
                    <div
                      key={`submission-${index}`}
                      className="submission-item"
                    >
                      <div
                        className={`submission-status ${submission.status.toLowerCase()}`}
                      >
                        {submission.status}
                      </div>
                      <div className="submission-details">
                        <div className="submission-time">
                          {new Date(submission.timestamp).toLocaleString()}
                        </div>
                        <div className="submission-metrics">
                          <span>Runtime: {submission.runtime}ms</span>
                          <span>Memory: {submission.memory}MB</span>
                        </div>
                      </div>
                      <button
                        className="view-submission-btn"
                        onClick={() => setCode(submission.code)}
                      >
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No submissions yet.</p>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;
