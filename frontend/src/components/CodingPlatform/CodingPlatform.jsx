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
  FaHistory,
  FaLightbulb,
  FaMoon,
  FaSun,
  FaPlus,
  FaMinus,
  FaUndo,
} from "react-icons/fa";
import "./CodingPlatForm.css";

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
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
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
      javascript: "function twoSum(nums, target) {\n    // Your code here\n};",
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
];

const CodingPlatform = ({ problemId = 1, userId = 1 }) => {
  // State management
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [testCases, setTestCases] = useState([]);
  const [customTestCase, setCustomTestCase] = useState("");
  const [executionResults, setExecutionResults] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [expandedExamples, setExpandedExamples] = useState({});
  const [editorLocked, setEditorLocked] = useState(false);
  const [testCaseView, setTestCaseView] = useState("split");

  // Fetch problem data on load
  useEffect(() => {
    if (problemId) {
      // Use hardcoded data instead of API call
      const foundProblem = HARDCODED_PROBLEMS.find((p) => p.id === problemId);
      if (foundProblem) {
        setProblem(foundProblem);
        setTestCases(foundProblem.testCases);
        setCode(foundProblem.starterCode[language] || "// Start coding here");
      }

      // Use hardcoded submissions
      const userSubmissions = HARDCODED_SUBMISSIONS.filter(
        (s) => s.problemId === problemId && s.userId === userId
      );
      setSubmissions(userSubmissions);
    }
  }, [problemId, userId, language]);

  const handleCodeChange = (newValue) => {
    if (!editorLocked) {
      setCode(newValue);
    }
  };

  const toggleExample = (index) => {
    setExpandedExamples({
      ...expandedExamples,
      [index]: !expandedExamples[index],
    });
  };

  const runCode = async () => {
    setIsRunning(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response
      const mockResults = {
        status: "Executed",
        consoleOutput: "Running test cases...\nAll test cases passed!",
        testCases: problem.testCases.map((testCase, index) => ({
          input: testCase.input,
          expected: testCase.expected,
          output: testCase.expected, // Mocking that all tests pass
          passed: true,
        })),
        analytics: {
          runtimePercentile: Math.floor(Math.random() * 100),
          memoryPercentile: Math.floor(Math.random() * 100),
        },
      };

      setExecutionResults(mockResults);
      setIsRunning(false);
    }, 1500);
  };

  const submitCode = async () => {
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Create a mock submission
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
        testCases: problem.testCases.map((testCase, index) => ({
          input: testCase.input,
          expected: testCase.expected,
          output: Math.random() > 0.3 ? testCase.expected : "wrong output",
          passed: Math.random() > 0.3,
        })),
        analytics: {
          runtimePercentile: Math.floor(Math.random() * 100),
          memoryPercentile: Math.floor(Math.random() * 100),
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
      };

      setExecutionResults(newSubmission);
      setSubmissions([newSubmission, ...submissions]);
      setIsSubmitting(false);
    }, 2000);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expected: "", isCustom: true }]);
  };

  const removeTestCase = (index) => {
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);
    setTestCases(newTestCases);
  };

  const updateTestCase = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const resetCode = () => {
    if (window.confirm("Are you sure you want to reset your code?")) {
      setCode(problem.starterCode[language] || "// Start coding here");
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    // Add toast notification here
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
        <div className="loader-spinner"></div>
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="coding-platform-container" data-theme={theme}>
      {/* Top Navigation Bar */}
      <div className="coding-platform-navbar">
        <div className="navbar-left">
          <h1 className="platform-title">CodeMaster</h1>
        </div>
        <div className="navbar-center">
          <div className="streak-tracker">
            <span className="streak-icon">🔥 7</span>
            <span className="streak-text">day streak</span>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-user-info">
            <img
              src={`/avatars/${userId}.jpg`}
              alt="User Avatar"
              className="user-avatar"
            />
            <span className="username">JohnDoe</span>
          </div>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "vs-dark" ? <FaSun /> : <FaMoon />}
          </button>
          <select
            className="language-selector global"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="coding-platform-main">
        {/* Problem Description Sidebar */}
        <div className="problem-sidebar">
          <div className="problem-header">
            <h2 className="problem-title">{problem.title}</h2>
            <span
              className={`difficulty-tag difficulty-${problem.difficulty.toLowerCase()}`}
            >
              {problem.difficulty}
            </span>
          </div>

          <div className="problem-tags">
            {problem.companies && (
              <div className="company-tags">
                {problem.companies.map((company, index) => (
                  <span key={`company-${index}`} className="tag company-tag">
                    {company}
                  </span>
                ))}
              </div>
            )}
            <div className="topic-tags">
              {problem.topics.map((topic, index) => (
                <span key={`topic-${index}`} className="tag topic-tag">
                  {topic}
                </span>
              ))}
            </div>
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
              <Tab className="problem-tab">Editorial</Tab>
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
              <div className="description-actions">
                <button
                  className="copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(problem.description)
                  }
                >
                  <FaCopy /> Copy
                </button>
              </div>
            </TabPanel>

            <TabPanel className="tab-discussion">
              <div className="discussions-container">
                <p>Join the discussion about this problem...</p>
                {/* Discussion content would be loaded here */}
              </div>
            </TabPanel>

            <TabPanel className="tab-editorial">
              <div className="editorial-container">
                <p>Official solution and approach...</p>
                {/* Editorial content would be loaded here */}
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Code Editor Pane */}
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
              <button
                className="editor-action-btn"
                onClick={resetCode}
                title="Reset Code"
              >
                <FaUndo />
              </button>
              <button
                className="editor-action-btn"
                onClick={copyCode}
                title="Copy Code"
              >
                <FaCopy />
              </button>
              <button
                className="editor-action-btn"
                onClick={downloadCode}
                title="Download Code"
              >
                <FaDownload />
              </button>
              <button
                className="editor-action-btn"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === "vs-dark" ? <FaSun /> : <FaMoon />}
              </button>
              <button
                className={`editor-action-btn ${editorLocked ? "active" : ""}`}
                onClick={() => setEditorLocked(!editorLocked)}
                title={editorLocked ? "Unlock Editor" : "Lock Editor"}
              >
                {editorLocked ? "🔒" : "🔓"}
              </button>
            </div>
          </div>

          <div className="monaco-editor-wrapper">
            <MonacoEditor
              width="100%"
              height="calc(100% - 96px)" // Adjust based on header and controls height
              language={language}
              theme={theme}
              value={code}
              onChange={handleCodeChange}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: editorLocked,
                cursorStyle: "line",
                automaticLayout: true,
                folding: true,
                lineNumbers: "on",
                minimap: { enabled: true },
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
              {isRunning && <div className="btn-spinner"></div>}
            </button>
            <button
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              onClick={submitCode}
              disabled={isRunning || isSubmitting}
            >
              <FaCheck /> Submit
              {isSubmitting && <div className="btn-spinner"></div>}
            </button>
          </div>
        </Resizable>

        {/* Test Cases and Results Sidebar */}
        <div className="results-sidebar">
          <Tabs defaultIndex={0}>
            <TabList className="results-tabs">
              <Tab className="results-tab">Test Cases</Tab>
              <Tab className="results-tab">Console</Tab>
              <Tab className="results-tab">Submissions</Tab>
              <Tab className="results-tab">Analytics</Tab>
            </TabList>

            <TabPanel className="tab-test-cases">
              <div className="test-cases-header">
                <h3>Test Cases</h3>
                <div className="test-cases-actions">
                  <button
                    className="view-toggle-btn"
                    onClick={() =>
                      setTestCaseView(
                        testCaseView === "split" ? "tabbed" : "split"
                      )
                    }
                  >
                    Toggle View
                  </button>
                  <button className="add-test-case-btn" onClick={addTestCase}>
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className={`test-cases-container view-${testCaseView}`}>
                {testCases.map((testCase, index) => (
                  <div key={`test-case-${index}`} className="test-case-item">
                    <div className="test-case-header">
                      <h4>Case {index + 1}</h4>
                      {testCase.isCustom && (
                        <button
                          className="remove-test-case-btn"
                          onClick={() => removeTestCase(index)}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                    <div className="test-case-content">
                      <div className="test-case-input">
                        <label>Input:</label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) =>
                            updateTestCase(index, "input", e.target.value)
                          }
                          className="test-case-textarea"
                        />
                      </div>
                      <div className="test-case-expected">
                        <label>Expected:</label>
                        <textarea
                          value={testCase.expected}
                          onChange={(e) =>
                            updateTestCase(index, "expected", e.target.value)
                          }
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

              <div className="custom-test-case">
                <h4>Custom Input</h4>
                <textarea
                  value={customTestCase}
                  onChange={(e) => setCustomTestCase(e.target.value)}
                  className="custom-test-textarea"
                  placeholder="Add your own test input here..."
                />
                <button
                  className="run-custom-btn"
                  onClick={() => {
                    // Run with custom test case
                    // Integration point
                  }}
                >
                  Run Custom Input
                </button>
              </div>
            </TabPanel>

            <TabPanel className="tab-console">
              <div className="console-output">
                <h3>Console Output</h3>
                <div className="console-content">
                  {executionResults && executionResults.consoleOutput ? (
                    <pre>{executionResults.consoleOutput}</pre>
                  ) : (
                    <p className="console-placeholder">
                      Run your code to see output...
                    </p>
                  )}
                </div>
              </div>
            </TabPanel>

            <TabPanel className="tab-submissions">
              <div className="submissions-list">
                <h3>Your Submissions</h3>
                {submissions.length > 0 ? (
                  <div className="submissions-container">
                    {submissions.map((submission, index) => (
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
                            <span className="runtime">
                              Runtime: {submission.runtime}ms
                            </span>
                            <span className="memory">
                              Memory: {submission.memory}MB
                            </span>
                          </div>
                        </div>
                        <button
                          className="view-submission-btn"
                          onClick={() => {
                            // View this submission
                            setCode(submission.code);
                          }}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-submissions">No submissions yet.</p>
                )}
              </div>
            </TabPanel>

            <TabPanel className="tab-analytics">
              <div className="analytics-container">
                <h3>Performance Analytics</h3>
                {executionResults && executionResults.analytics ? (
                  <div className="analytics-content">
                    <div className="performance-chart">
                      <h4>Runtime Distribution</h4>
                      <div className="runtime-chart">
                        <div
                          className="runtime-bar"
                          style={{
                            width: `${executionResults.analytics.runtimePercentile}%`,
                          }}
                        >
                          {executionResults.analytics.runtimePercentile}%
                        </div>
                      </div>
                      <p>
                        Beats {executionResults.analytics.runtimePercentile}% of{" "}
                        {language} submissions
                      </p>
                    </div>

                    <div className="performance-chart">
                      <h4>Memory Distribution</h4>
                      <div className="memory-chart">
                        <div
                          className="memory-bar"
                          style={{
                            width: `${executionResults.analytics.memoryPercentile}%`,
                          }}
                        >
                          {executionResults.analytics.memoryPercentile}%
                        </div>
                      </div>
                      <p>
                        Beats {executionResults.analytics.memoryPercentile}% of{" "}
                        {language} submissions
                      </p>
                    </div>

                    <div className="complexity-analysis">
                      <h4>Complexity Analysis</h4>
                      <div className="complexity-item">
                        <span>Time Complexity:</span>
                        <span className="complexity-value">
                          {executionResults.analytics.timeComplexity || "N/A"}
                        </span>
                      </div>
                      <div className="complexity-item">
                        <span>Space Complexity:</span>
                        <span className="complexity-value">
                          {executionResults.analytics.spaceComplexity || "N/A"}
                        </span>
                      </div>
                      <div className="premium-tag">
                        <FaLightbulb /> Premium Feature
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="no-analytics">
                    Submit your solution to see performance analytics.
                  </p>
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
