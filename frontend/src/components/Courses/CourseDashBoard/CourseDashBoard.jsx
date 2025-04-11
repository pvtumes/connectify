import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Award,
  Share2,
  Calendar,
  ChevronRight,
  Book,
  Download,
  Trophy,
  Search,
  Bell,
  Filter,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Heart,
  BookOpen,
  TrendingUp,
  List,
  Grid,
  Bookmark,
  BookmarkPlus,
  ExternalLink,
  Repeat,
  AlertCircle,
} from "lucide-react";

// Import recharts components for LineChart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Import custom components
import Toast from "./Toast";
import SearchBar from "./SearchBar";
import LearningCalendar from "./LearningCalendar";
import CourseNotes from "./CourseNotes";
import Bookmarks from "./BookMarks";
import CourseModal from "./CourseModal";
import CategoryTimeChart from "./CategoryTimeChart";
import CourseCompletionChart from "./CourseCompletionChart";

const CourseDashBoard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeNoteCourse, setActiveNoteCourse] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchResults, setSearchResults] = useState(null);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursLearned: 0,
    lessonsCompleted: 0,
    streak: 7,
  });

  // Fetch mock courses data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCourses = [
        {
          id: "course1",
          title: "Introduction to React",
          description: "Learn the fundamentals of React",
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "Web Development",
          instructor: "Jane Doe",
          rating: 4.8,
          progress: 35,
          totalLessons: 12,
          completedLessons: 4,
          lastLesson: {
            title: "Working with components",
            completedDate: "Apr 1, 2025",
          },
          notes: [],
        },
        {
          id: "course2",
          title: "Advanced JavaScript Patterns",
          description: "Master advanced JavaScript concepts",
          thumbnail:
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "Programming",
          instructor: "John Smith",
          rating: 4.6,
          progress: 70,
          totalLessons: 10,
          completedLessons: 7,
          isFavorite: true,
          lastLesson: {
            title: "Factory patterns",
            completedDate: "Apr 2, 2025",
          },
          notes: [],
        },
        {
          id: "course3",
          title: "UI/UX Design Fundamentals",
          description: "Create beautiful and intuitive interfaces",
          thumbnail:
            "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "Design",
          instructor: "Sarah Johnson",
          rating: 4.9,
          progress: 20,
          totalLessons: 8,
          completedLessons: 2,
          lastLesson: {
            title: "User research methods",
            completedDate: "Mar 29, 2025",
          },
          notes: [],
        },
        {
          id: "course4",
          title: "Data Structures in Python",
          description: "Master Python data structures",
          thumbnail:
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "Computer Science",
          instructor: "Michael Brown",
          rating: 4.7,
          progress: 50,
          totalLessons: 15,
          completedLessons: 8,
          lastLesson: {
            title: "Linked Lists",
            completedDate: "Mar 31, 2025",
          },
          notes: [],
        },
        {
          id: "course5",
          title: "Machine Learning Basics",
          description: "Introduction to ML concepts and algorithms",
          thumbnail:
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "Data Science",
          instructor: "Emily Wilson",
          rating: 4.5,
          progress: 15,
          totalLessons: 20,
          completedLessons: 3,
          lastLesson: {
            title: "Linear Regression",
            completedDate: "Mar 28, 2025",
          },
          notes: [],
        },
        {
          id: "course6",
          title: "DevOps Essentials",
          description: "CI/CD pipelines and cloud deployment",
          thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "DevOps",
          instructor: "David Chen",
          rating: 4.7,
          progress: 60,
          totalLessons: 14,
          completedLessons: 9,
          lastLesson: {
            title: "Docker Containers",
            completedDate: "Apr 3, 2025",
          },
          notes: [],
        },
      ];

      setStats({
        coursesCompleted: 2,
        hoursLearned: 28,
        lessonsCompleted: 36,
        streak: 7,
      });

      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleRateSubmit = (courseId, rating, feedback) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, rating } : course
      )
    );
    showToast("Rating submitted successfully", "success");
  };

  const handleAddNote = (courseId, courseTitle) => {
    setActiveNoteCourse({ id: courseId, title: courseTitle });
    setShowNotes(true);
  };

  const handleSaveNote = (note) => {
    setCourses(
      courses.map((course) =>
        course.id === activeNoteCourse.id
          ? { ...course, notes: [note, ...(course.notes || [])] }
          : course
      )
    );
    showToast("Note saved successfully", "success");
  };

  const handleScheduleSession = (session) => {
    setScheduledSessions([
      ...scheduledSessions,
      { ...session, id: Date.now() },
    ]);
    setShowCalendar(false);
    showToast("Learning session scheduled", "success");
  };

  const handleAddBookmark = (bookmark) => {
    const newBookmark = { ...bookmark, id: Date.now() };
    setBookmarks([...bookmarks, newBookmark]);
    showToast("Bookmark added", "success");
  };

  const handleRemoveBookmark = (bookmarkId) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== bookmarkId));
    showToast("Bookmark removed", "success");
  };

  const handleToggleFavorite = (courseId, isFavorite) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, isFavorite } : course
      )
    );
    showToast(
      isFavorite ? "Added to favorites" : "Removed from favorites",
      isFavorite ? "success" : "info"
    );
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const results = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  const filteredCourses =
    searchResults ||
    courses.filter((course) => {
      if (activeTab === "all") return true;
      if (activeTab === "inProgress")
        return course.progress > 0 && course.progress < 100;
      if (activeTab === "completed") return course.progress === 100;
      if (activeTab === "favorites") return course.isFavorite;
      return true;
    });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-800">
                Learning Dashboard
              </h1>
            </div>
            <div className="w-96">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCalendar(true)}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Schedule Learning"
              >
                <Calendar size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => setShowBookmarks(true)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
                title="Bookmarks"
              >
                <Bookmark size={20} className="text-gray-700" />
                {bookmarks.length > 0 && (
                  <span className="absolute top-0 right-0 bg-purple-800 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {bookmarks.length}
                  </span>
                )}
              </button>
              <div className="relative">
                <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100">
                  <User size={20} className="text-gray-700" />
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 custom-main">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <BookOpen size={24} className="text-purple-800" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses Completed</p>
              <h3 className="text-2xl font-bold">{stats.coursesCompleted}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Clock size={24} className="text-blue-800" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hours Learned</p>
              <h3 className="text-2xl font-bold">{stats.hoursLearned}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Check size={24} className="text-green-800" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lessons Completed</p>
              <h3 className="text-2xl font-bold">{stats.lessonsCompleted}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <Trophy size={24} className="text-orange-800" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Day Streak</p>
              <h3 className="text-2xl font-bold">{stats.streak}</h3>
            </div>
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { date: "Mar 28", hours: 1.5 },
                  { date: "Mar 29", hours: 2.0 },
                  { date: "Mar 30", hours: 1.0 },
                  { date: "Mar 31", hours: 2.5 },
                  { date: "Apr 1", hours: 1.8 },
                  { date: "Apr 2", hours: 3.0 },
                  { date: "Apr 3", hours: 2.2 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#7e22ce"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Tabs and View Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "all"
                  ? "bg-purple-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Courses
            </button>
            <button
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "inProgress"
                  ? "bg-purple-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>
            <button
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "completed"
                  ? "bg-purple-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
            <button
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "favorites"
                  ? "bg-purple-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-purple-100 text-purple-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-purple-100 text-purple-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Courses Grid/List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-800 rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    {course.isFavorite && (
                      <span className="absolute top-2 right-2 text-red-500">
                        <Heart size={20} fill="currentColor" />
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <span className="inline-block bg-purple-800 text-white px-2 py-1 rounded text-xs">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-purple-800">
                          {course.rating?.toFixed(1) || "New"}
                        </span>
                        {course.rating && (
                          <span className="text-xs text-yellow-500 ml-1">
                            ★
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-800 h-1.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {course.progress}% complete
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.floor(
                            (course.totalLessons * 30 * course.progress) / 100
                          )}{" "}
                          mins
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Activity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCourseClick(course)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded"
                              src={course.thumbnail}
                              alt={course.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-32 mr-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-purple-800 h-1.5 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {course.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.lastLesson?.title || "Not started"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.lastLesson?.completedDate || ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {course.rating ? (
                            <>
                              <span className="text-sm font-medium text-purple-800 mr-1">
                                {course.rating.toFixed(1)}
                              </span>
                              <span className="text-xs text-yellow-500">★</span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Not rated
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No courses found
            </h3>
            <p className="text-gray-500">
              {searchResults
                ? "Try a different search term"
                : activeTab === "inProgress"
                ? "You don't have any courses in progress"
                : activeTab === "completed"
                ? "You haven't completed any courses yet"
                : activeTab === "favorites"
                ? "You don't have any favorite courses"
                : "You don't have any courses yet"}
            </p>
          </div>
        )}

        {/* Scheduled Sessions */}
        {scheduledSessions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">
              Upcoming Learning Sessions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-800"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{session.courseTitle}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setScheduledSessions(
                          scheduledSessions.filter((s) => s.id !== session.id)
                        );
                        showToast("Session removed", "success");
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <Clock size={14} className="inline mr-1" />
                    {formatDate(session.date)} • {session.duration} mins
                  </p>
                  <button
                    onClick={() => {
                      const course = courses.find(
                        (c) => c.id === session.courseId
                      );
                      if (course) handleCourseClick(course);
                    }}
                    className="text-sm text-purple-800 hover:text-purple-900 flex items-center"
                  >
                    Open course <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time Spent by Category */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Time Spent by Category</h2>
          <CategoryTimeChart />
        </div>

        {/* Course Completion */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Course Completion</h2>
          <CourseCompletionChart courses={courses} stats={stats} />
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onRateSubmit={handleRateSubmit}
            onAddNote={handleAddNote}
            onAddBookmark={handleAddBookmark}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {showCalendar && (
          <LearningCalendar
            onSchedule={handleScheduleSession}
            onClose={() => setShowCalendar(false)}
          />
        )}

        {showNotes && activeNoteCourse && (
          <CourseNotes
            courseId={activeNoteCourse.id}
            courseTitle={activeNoteCourse.title}
            onClose={() => {
              setShowNotes(false);
              setActiveNoteCourse(null);
            }}
            onSave={handleSaveNote}
          />
        )}

        {showBookmarks && (
          <Bookmarks
            bookmarks={bookmarks}
            onRemove={handleRemoveBookmark}
            onClose={() => setShowBookmarks(false)}
            onOpen={(bookmark) => {
              setShowBookmarks(false);
              const course = courses.find((c) => c.id === bookmark.courseId);
              if (course) setSelectedCourse(course);
            }}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={clearToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDashBoard;
