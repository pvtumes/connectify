import React, { useState, useEffect } from "react";
import "./Trending.css";
import { TrendingUp, Hash, Flame, ArrowRight, X } from "lucide-react";

const Trending = () => {
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [animation, setAnimation] = useState("");
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This is a placeholder for your API integration
  // In production, you would use your actual API key
  const fetchTrendingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // For demonstration purposes, we'll use a mock API
      // Replace this with your actual API call when you have your API key
      const mockApiResponse = await mockFetchTrends();

      // If using Twitter API (example structure):
      // const response = await fetch('https://api.twitter.com/1.1/trends/place.json?id=1', {
      //   headers: {
      //     'Authorization': `Bearer YOUR_API_KEY`
      //   }
      // });
      // const data = await response.json();
      // const formattedTrends = formatTrends(data[0].trends);

      setTrends(mockApiResponse);
    } catch (err) {
      setError("Failed to fetch trending data");
      console.error("Error fetching trends:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mock function to simulate API call - remove this when you have real API
  const mockFetchTrends = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            tag: "#UIUXDesign",
            posts: `${Math.floor(Math.random() * 50) + 10}K`,
            description:
              "Latest UI/UX design trends and best practices including dark mode designs, micro-interactions, and 3D elements.",
          },
          {
            id: 2,
            tag: "#TechJobs",
            posts: `${Math.floor(Math.random() * 40) + 10}K`,
            description:
              "Top tech companies hiring right now. Remote and onsite opportunities with salary ranges and interview tips.",
          },
          {
            id: 3,
            tag: "#WebDev",
            posts: `${Math.floor(Math.random() * 60) + 10}K`,
            description:
              "Web development frameworks comparison and tutorials. React vs Vue vs Angular with performance benchmarks.",
          },
          {
            id: 4,
            tag: "#AIRevolution",
            posts: `${Math.floor(Math.random() * 80) + 10}K`,
            description:
              "How artificial intelligence is transforming industries from healthcare to finance with real-world case studies.",
          },
          {
            id: 5,
            tag: "#RemoteWork",
            posts: `${Math.floor(Math.random() * 45) + 10}K`,
            description:
              "Best practices for remote teams, productivity tools, and how to maintain work-life balance while working from home.",
          },
        ]);
      }, 800); // Simulate network delay
    });
  };

  // Format trends from Twitter API response (example)
  const formatTrends = (apiTrends) => {
    return apiTrends.map((trend, index) => ({
      id: index,
      tag: trend.name,
      posts: trend.tweet_volume
        ? `${Math.round(trend.tweet_volume / 1000)}K`
        : "Trending",
      description:
        trend.promoted_content || `Recent discussions about ${trend.name}`,
    }));
  };

  useEffect(() => {
    fetchTrendingData();

    // Set up refresh interval (e.g., every 5 minutes)
    const intervalId = setInterval(fetchTrendingData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTrendClick = (trend) => {
    setAnimation("fade-out");
    setTimeout(() => {
      setSelectedTrend(trend);
      setAnimation("fade-in");
    }, 200);
  };

  const closeDescription = () => {
    setAnimation("fade-out");
    setTimeout(() => {
      setSelectedTrend(null);
    }, 200);
  };

  const refreshTrends = () => {
    fetchTrendingData();
  };

  return (
    <div className="trending-container">
      <div className="trending-header">
        <div className="header-left">
          <TrendingUp size={24} className="trending-icon" />
          <h2>Trending Today</h2>
        </div>
        <button
          onClick={refreshTrends}
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchTrendingData}>Retry</button>
        </div>
      ) : loading && trends.length === 0 ? (
        <div className="loading-message">
          <p>Loading trends...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : selectedTrend ? (
        <div className={`trend-description ${animation}`}>
          <div className="description-header">
            <h3>{selectedTrend.tag}</h3>
            <button onClick={closeDescription} className="close-btn">
              <X size={18} />
            </button>
          </div>
          <p>{selectedTrend.description}</p>
          <div className="trend-stats">
            <span className="posts-count">
              <Flame size={16} /> {selectedTrend.posts} posts
            </span>
          </div>
          <button className="explore-btn">
            Explore <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="trends-list">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="trend-item"
              onClick={() => handleTrendClick(trend)}
            >
              <div className="trend-tag">
                <Hash size={18} className="hash-icon" />
                <span>{trend.tag}</span>
              </div>
              <div className="trend-posts">
                <Flame size={16} className="flame-icon" />
                <span>{trend.posts}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
