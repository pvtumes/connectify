import React, { useState } from "react";
import "./PostPreview.css";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Send,
  X,
  Image as ImageIcon,
  Smile,
  Video,
} from "lucide-react";

// Sample posts data with varying numbers of media items
const samplePosts = [
  {
    id: 1,
    company: "SecureKloud Infosolutions",
    followers: "674 followers",
    time: "1d • Edited • 🌐",
    title: "AI: The Driving Force Behind DevRev's Ecosystem",
    content: `When we talk about #efficiency, it goes beyond just speed. It's about making #workflows smarter, driving seamless collaboration, and turning everyday #operations into opportunities for innovation.`,
    media: [
      { type: "image", url: "https://picsum.photos/600/400?random=1" },
      { type: "image", url: "https://picsum.photos/600/400?random=2" },
      { type: "image", url: "https://picsum.photos/600/400?random=3" },
      { type: "video", url: "https://www.example.com/video1.mp4" },
    ],
    reactions: "Harshal Gawargur and 23 others",
    reposts: 1,
  },
  {
    id: 2,
    company: "TechVision AI",
    followers: "1.2K followers",
    time: "3h • 🌐",
    title: "Revolutionizing Customer Support with NLP",
    content: `Our new #NLP models are transforming how businesses handle #customersupport. See how we're using #AI to understand customer intent and provide instant solutions.`,
    media: [{ type: "image", url: "https://picsum.photos/600/400?random=4" }],
    reactions: "Priya Sharma and 42 others",
    reposts: 5,
  },
  {
    id: 3,
    company: "DataSphere Analytics",
    followers: "3.8K followers",
    time: "5d • Edited • 🌐",
    title: "Big Data Insights for Retail",
    content: `#Retail analytics just got smarter! Our latest platform helps retailers optimize inventory, predict trends, and personalize shopping experiences using #BigData.`,
    media: [
      { type: "image", url: "https://picsum.photos/600/400?random=5" },
      { type: "image", url: "https://picsum.photos/600/400?random=6" },
      { type: "video", url: "https://www.example.com/video2.mp4" },
      { type: "image", url: "https://picsum.photos/600/400?random=7" },
      { type: "image", url: "https://picsum.photos/600/400?random=8" },
      { type: "image", url: "https://picsum.photos/600/400?random=9" },
    ],
    reactions: "Raj Patel and 87 others",
    reposts: 12,
  },
  {
    id: 4,
    company: "CloudNova Solutions",
    followers: "5.6K followers",
    time: "2d • 🌐",
    title: "Hybrid Cloud Deployment Strategies",
    content: `Balancing #onprem and #cloud infrastructure? Our hybrid approach gives you the best of both worlds with seamless #integration and #security.`,
    media: [
      { type: "video", url: "https://www.example.com/video3.mp4" },
      { type: "image", url: "https://picsum.photos/600/400?random=10" },
    ],
    reactions: "Anika Gupta and 31 others",
    reposts: 3,
  },
  {
    id: 5,
    company: "Quantum Computing Labs",
    followers: "8.9K followers",
    time: "1w • Edited • 🌐",
    title: "Breaking Barriers in Quantum Algorithms",
    content: `Our research team has achieved a breakthrough in #quantumcomputing algorithms that could revolutionize drug discovery and materials science. #innovation`,
    media: [
      { type: "image", url: "https://picsum.photos/600/400?random=11" },
      { type: "image", url: "https://picsum.photos/600/400?random=12" },
      { type: "image", url: "https://picsum.photos/600/400?random=13" },
      { type: "image", url: "https://picsum.photos/600/400?random=14" },
      { type: "video", url: "https://www.example.com/video4.mp4" },
      { type: "image", url: "https://picsum.photos/600/400?random=15" },
      { type: "image", url: "https://picsum.photos/600/400?random=16" },
      { type: "image", url: "https://picsum.photos/600/400?random=17" },
      { type: "image", url: "https://picsum.photos/600/400?random=18" },
      { type: "video", url: "https://www.example.com/video5.mp4" },
    ],
    reactions: "Dr. Chen and 156 others",
    reposts: 28,
  },
];

const PostPreview = () => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  const handleAddComment = (postId) => {
    if (newComments[postId]?.trim()) {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComments[postId]],
      }));
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const renderMediaGrid = (media, isExpanded = false) => {
    if (media.length === 1) {
      return media[0].type === "image" ? (
        <img
          src={media[0].url}
          alt="Post media"
          className={isExpanded ? "expanded-post-image" : "post-image"}
        />
      ) : (
        <div className="video-container">
          <Video size={24} />
          <span>Video Content</span>
        </div>
      );
    }

    const visibleMedia = media.slice(0, 4);
    const remainingCount = media.length - 4;

    return (
      <div className={`media-grid ${media.length > 2 ? "multi-media" : ""}`}>
        {visibleMedia.map((item, index) => (
          <div
            key={index}
            className={`grid-item ${
              media.length === 2
                ? "double"
                : media.length === 3 && index === 0
                ? "triple-main"
                : ""
            }`}
          >
            {item.type === "image" ? (
              <img src={item.url} alt={`Media ${index + 1}`} />
            ) : (
              <div className="video-container">
                <Video size={18} />
                <span>Video</span>
              </div>
            )}
            {index === 3 && remainingCount > 0 && (
              <div className="remaining-count">+{remainingCount}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="post-preview-container">
      {samplePosts.map((post) => (
        <div key={post.id} className="post-card">
          {/* Post Header */}
          <div className="post-header">
            <div className="post-author">
              <div className="post-author-avatar">
                <img
                  src={`https://picsum.photos/40/40?random=${post.id}`}
                  alt={post.company}
                />
              </div>
              <div className="post-author-info">
                <div className="post-author-name">
                  {post.company}
                  <span className="post-author-followers">
                    {post.followers}
                  </span>
                </div>
                <div className="post-meta">{post.time}</div>
              </div>
            </div>
            <div className="post-actions">
              <button className="post-more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="post-content" onClick={() => setExpandedPost(post)}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-text">{post.content}</p>
            {renderMediaGrid(post.media)}
          </div>

          {/* Post Engagement */}
          <div className="post-engagement">
            <div className="post-reactions">
              <div className="reaction-icons">
                <span className="reaction-icon thumbs-up">👍</span>
                <span className="reaction-icon heart">❤️</span>
              </div>
              <span className="reaction-names">{post.reactions}</span>
            </div>
            <div className="post-metrics">
              <span>
                {post.reposts} repost{post.reposts !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Post Actions */}
          <div className="post-actions-bar">
            <button className="action-btn">
              <ThumbsUp size={18} />
              <span>Like</span>
            </button>
            <button className="action-btn">
              <MessageSquare size={18} />
              <span>Comment</span>
            </button>
            <button className="action-btn">
              <Repeat size={18} />
              <span>Repost</span>
            </button>
            <button className="action-btn">
              <Send size={18} />
              <span>Send</span>
            </button>
          </div>

          {/* Comment Form */}
          <div className="post-comment-form">
            <div className="comment-avatar">
              <img
                src={`https://picsum.photos/32/32?random=${post.id + 100}`}
                alt="User"
              />
            </div>
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComments[post.id] || ""}
                onChange={(e) =>
                  setNewComments({
                    ...newComments,
                    [post.id]: e.target.value,
                  })
                }
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddComment(post.id)
                }
                className="comment-input"
              />
              <div className="comment-input-actions">
                <button className="comment-emoji-btn">
                  <Smile size={18} />
                </button>
                <button className="comment-photo-btn">
                  <ImageIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Display Comments */}
          {comments[post.id]?.length > 0 && (
            <div className="comments-section">
              {comments[post.id].map((comment, index) => (
                <div key={index} className="comment-item">
                  <img
                    src={`https://picsum.photos/32/32?random=${
                      post.id + index
                    }`}
                    alt="Commenter"
                    className="commenter-avatar"
                  />
                  <div className="comment-text">{comment}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Expanded Post Modal */}
      {expandedPost && (
        <div
          className="expanded-post-overlay"
          onClick={() => setExpandedPost(null)}
        >
          <div className="expanded-post" onClick={(e) => e.stopPropagation()}>
            <div className="expanded-post-header">
              <div className="expanded-post-company">
                <img
                  src={`https://picsum.photos/80/80?random=${expandedPost.id}`}
                  alt={expandedPost.company}
                  className="expanded-company-logo"
                />
                <div className="expanded-company-info">
                  <div className="expanded-company-name">
                    {expandedPost.company}
                    <span className="expanded-company-followers">
                      {expandedPost.followers}
                    </span>
                  </div>
                  <div className="expanded-post-meta">{expandedPost.time}</div>
                </div>
              </div>
              <button
                className="expanded-close-btn"
                onClick={() => setExpandedPost(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="expanded-post-content">
              <h2 className="expanded-post-title">{expandedPost.title}</h2>
              <p className="expanded-post-text">{expandedPost.content}</p>
              {renderMediaGrid(expandedPost.media, true)}
            </div>

            <div className="expanded-post-engagement">
              <div className="expanded-post-reactions">
                <div className="expanded-reaction-icons">
                  <span className="reaction-icon thumbs-up">👍</span>
                  <span className="reaction-icon heart">❤️</span>
                </div>
                <span className="expanded-reaction-names">
                  {expandedPost.reactions}
                </span>
              </div>
              <div className="expanded-post-metrics">
                <span>
                  {expandedPost.reposts} repost
                  {expandedPost.reposts !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="expanded-post-actions-bar">
              <button className="expanded-action-btn">
                <ThumbsUp size={18} />
                <span>Like</span>
              </button>
              <button className="expanded-action-btn">
                <MessageSquare size={18} />
                <span>Comment</span>
              </button>
              <button className="expanded-action-btn">
                <Repeat size={18} />
                <span>Repost</span>
              </button>
              <button className="expanded-action-btn">
                <Send size={18} />
                <span>Send</span>
              </button>
            </div>

            <div className="expanded-post-comment-form">
              <div className="expanded-comment-avatar">
                <img
                  src={`https://picsum.photos/36/36?random=${
                    expandedPost.id + 100
                  }`}
                  alt="User"
                />
              </div>
              <div className="expanded-comment-input-container">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComments[expandedPost.id] || ""}
                  onChange={(e) =>
                    setNewComments({
                      ...newComments,
                      [expandedPost.id]: e.target.value,
                    })
                  }
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddComment(expandedPost.id)
                  }
                  className="expanded-comment-input"
                />
                <div className="expanded-comment-input-actions">
                  <button className="expanded-comment-emoji-btn">
                    <Smile size={18} />
                  </button>
                  <button className="expanded-comment-photo-btn">
                    <ImageIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

            {comments[expandedPost.id]?.length > 0 && (
              <div className="expanded-comments-section">
                {comments[expandedPost.id].map((comment, index) => (
                  <div key={index} className="expanded-comment-item">
                    <img
                      src={`https://picsum.photos/36/36?random=${
                        expandedPost.id + index
                      }`}
                      alt="Commenter"
                      className="expanded-commenter-avatar"
                    />
                    <div className="expanded-comment-text">{comment}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPreview;
