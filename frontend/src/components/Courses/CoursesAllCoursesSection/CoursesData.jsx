import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HomeHeader from "./HomeHeader";
import HomeSearchAndFilters from "./HomeSearchAndFilters";
import HomeTagsFilter from "./HomeTagsFilter";
import HomeCourseCard from "./HomeCourseCard";
import HomePagination from "./HomePagination";
import HomeSavedCoursesSummary from "./HomeSavedCoursesSummary";
import HomeNoResults from "./HomeNoResults";
import "./CoursesData.css";

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React, including components, state, and props.",
    domain: "Web Dev",
    tags: ["React", "JavaScript", "Frontend"],
    difficulty: "Beginner",
    duration: "2 weeks",
    timeCommitment: "4 hours/week",
    rating: 4.7,
    reviews: 234,
    popularity: 9.8,
    dateCreated: "2024-12-15",
    image: "https://placehold.co/600x400/e9ecef/212529?text=React+Course",
    instructor: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description:
      "An introduction to machine learning algorithms and techniques.",
    domain: "AI/ML",
    tags: ["Python", "Machine Learning", "Data Science"],
    difficulty: "Intermediate",
    duration: "4 weeks",
    timeCommitment: "6 hours/week",
    rating: 4.9,
    reviews: 345,
    popularity: 9.5,
    dateCreated: "2024-11-20",
    image: "https://placehold.co/600x400/e9ecef/212529?text=ML+Fundamentals",
    instructor: "David Chen",
  },
  {
    id: 3,
    title: "Advanced Data Structures",
    description: "Deep dive into advanced data structures and algorithms.",
    domain: "Computer Science",
    tags: ["Algorithms", "Java", "Data Structures"],
    difficulty: "Advanced",
    duration: "6 weeks",
    timeCommitment: "8 hours/week",
    rating: 4.6,
    reviews: 178,
    popularity: 8.9,
    dateCreated: "2024-10-05",
    image: "https://placehold.co/600x400/e9ecef/212529?text=Data+Structures",
    instructor: "Michael Brown",
  },
  {
    id: 4,
    title: "Full Stack JavaScript",
    description:
      "Build complete web applications with Node.js, Express, and MongoDB.",
    domain: "Web Dev",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    difficulty: "Intermediate",
    duration: "8 weeks",
    timeCommitment: "10 hours/week",
    rating: 4.8,
    reviews: 289,
    popularity: 9.7,
    dateCreated: "2024-09-30",
    image: "https://placehold.co/600x400/e9ecef/212529?text=Full+Stack+JS",
    instructor: "Emily Davis",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Learn Python libraries for data analysis and visualization.",
    domain: "Data Science",
    tags: ["Python", "Pandas", "NumPy"],
    difficulty: "Beginner",
    duration: "3 weeks",
    timeCommitment: "5 hours/week",
    rating: 4.5,
    reviews: 210,
    popularity: 9.3,
    dateCreated: "2024-12-10",
    image:
      "https://placehold.co/600x400/e9ecef/212529?text=Python+Data+Science",
    instructor: "Jessica Wilson",
  },
  {
    id: 6,
    title: "DevOps and CI/CD",
    description:
      "Learn modern DevOps practices and continuous integration/deployment.",
    domain: "DevOps",
    tags: ["Docker", "Jenkins", "AWS"],
    difficulty: "Advanced",
    duration: "5 weeks",
    timeCommitment: "7 hours/week",
    rating: 4.7,
    reviews: 156,
    popularity: 9.0,
    dateCreated: "2024-11-15",
    image: "https://placehold.co/600x400/e9ecef/212529?text=DevOps+CI/CD",
    instructor: "Robert Martinez",
  },
  {
    id: 7,
    title: "UI/UX Design Principles",
    description:
      "Master the fundamentals of user interface and experience design.",
    domain: "Design",
    tags: ["Figma", "UI Design", "UX Research"],
    difficulty: "Intermediate",
    duration: "4 weeks",
    timeCommitment: "6 hours/week",
    rating: 4.8,
    reviews: 195,
    popularity: 9.4,
    dateCreated: "2024-10-20",
    image: "https://placehold.co/600x400/e9ecef/212529?text=UI/UX+Design",
    instructor: "Lisa Thompson",
  },
  {
    id: 8,
    title: "Blockchain Development",
    description:
      "Build decentralized applications using blockchain technology.",
    domain: "Blockchain",
    tags: ["Solidity", "Ethereum", "Web3"],
    difficulty: "Advanced",
    duration: "10 weeks",
    timeCommitment: "12 hours/week",
    rating: 4.9,
    reviews: 132,
    popularity: 9.2,
    dateCreated: "2024-09-15",
    image: "https://placehold.co/600x400/e9ecef/212529?text=Blockchain+Dev",
    instructor: "James Wilson",
  },
];

// All unique domains from the courses
const allDomains = [...new Set(mockCourses.map((course) => course.domain))];
// All unique tags from the courses
const allTags = [...new Set(mockCourses.flatMap((course) => course.tags))];
// All difficulty levels
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const CoursesData = () => {
  const [darkMode, setDarkMode] = useState(false); // Light mode by default
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [savedCourses, setSavedCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [page, setPage] = useState(1);
  const coursesPerPage = 4;
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply filters and sorting to courses
  useEffect(() => {
    let filtered = [...mockCourses];

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedDomain !== "All") {
      filtered = filtered.filter((course) => course.domain === selectedDomain);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((course) =>
        selectedTags.every((tag) => course.tags.includes(tag))
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (course) => course.difficulty === selectedDifficulty
      );
    }

    if (sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setTotalPages(Math.ceil(filtered.length / coursesPerPage));

    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    setDisplayedCourses(filtered.slice(startIndex, endIndex));
  }, [
    searchQuery,
    selectedDomain,
    selectedTags,
    selectedDifficulty,
    sortBy,
    page,
  ]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const courseSuggestions = mockCourses
        .filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((course) => course.title)
        .slice(0, 5);

      const tagSuggestions = allTags
        .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3);

      setSearchSuggestions([...courseSuggestions, ...tagSuggestions]);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const changePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaveCourse = (id) => {
    if (savedCourses.includes(id)) {
      setSavedCourses(savedCourses.filter((courseId) => courseId !== id));
    } else {
      setSavedCourses([...savedCourses, id]);
    }
  };

  const updateProgress = (id, status) => {
    setCourseProgress({
      ...courseProgress,
      [id]: status,
    });
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
    setPage(1);
  };

  const shareCourse = (id) => {
    const course = mockCourses.find((c) => c.id === id);
    navigator.clipboard.writeText(`Check out this course: ${course.title}`);
    alert("Link copied to clipboard!");
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedDomain("All");
    setSelectedTags([]);
    setSelectedDifficulty("All");
    setSortBy("popularity");
    setPage(1);
  };

  return (
    <div
      className={`courses-data-container ${
        darkMode ? "courses-dark-mode" : ""
      }`}
    >
      <HomeHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <HomeSearchAndFilters
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        searchSuggestions={searchSuggestions}
        selectSuggestion={selectSuggestion}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allDomains={allDomains}
        difficultyLevels={difficultyLevels}
        setPage={setPage}
      />

      <HomeTagsFilter
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        allTags={allTags}
        setPage={setPage}
      />

      <div className="courses-grid">
        {displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <HomeCourseCard
              key={course.id}
              course={course}
              savedCourses={savedCourses}
              toggleSaveCourse={toggleSaveCourse}
              courseProgress={courseProgress}
              updateProgress={updateProgress}
              shareCourse={shareCourse}
            />
          ))
        ) : (
          <HomeNoResults resetFilters={resetAllFilters} />
        )}
      </div>

      {totalPages > 1 && (
        <HomePagination
          page={page}
          totalPages={totalPages}
          changePage={changePage}
        />
      )}

      {savedCourses.length > 0 && (
        <HomeSavedCoursesSummary
          savedCourses={savedCourses}
          toggleSaveCourse={toggleSaveCourse}
          mockCourses={mockCourses}
        />
      )}
    </div>
  );
};

export default CoursesData;
