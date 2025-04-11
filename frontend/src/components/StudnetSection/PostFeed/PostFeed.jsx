import React, { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import CommentSection from "./CommentSection";
import "./PostFeed.css";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Send,
  ChevronUp,
  Heart,
  Loader,
  X,
  Share2,
  Bookmark,
} from "lucide-react";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const feedRef = useRef(null);

  // Fetch posts from API
  const fetchPosts = async (pageNum) => {
    setLoading(true);
    try {
      // Using JSONPlaceholder API as an example - replace with your actual API
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
      );
      const data = await response.json();

      // Transform API data to match our post structure
      const transformedPosts = data.map((post, index) => ({
        id: post.id,
        user: {
          name: `User ${post.userId}`,
          avatar: `https://i.pravatar.cc/150?img=${post.userId}`,
          role: `Role ${post.userId}`,
          connection: index % 3 === 0 ? "1st" : index % 3 === 1 ? "2nd" : "3rd",
        },
        time: `${index + 1} ${index === 0 ? "hour" : "hours"} ago`,
        content: post.body,
        images: [
          `https://picsum.photos/800/600?random=${post.id}`,
          ...(index % 2 === 0
            ? [`https://picsum.photos/800/600?random=${post.id + 100}`]
            : []),
        ],
        reactions: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        reposts: Math.floor(Math.random() * 50),
        recentComments: [
          {
            id: post.id * 100 + 1,
            user: {
              name: `Commenter ${post.id}`,
              avatar: `https://i.pravatar.cc/150?img=${post.id + 20}`,
              role: `Commenter Role ${post.id}`,
            },
            content: "This is a sample comment on the post.",
            time: `${Math.floor(Math.random() * 60)} minutes ago`,
            likes: Math.floor(Math.random() * 10),
          },
        ],
      }));

      setPosts((prev) => [...prev, ...transformedPosts]);
      setHasMore(data.length === 10); // If we got less than 10 items, no more data
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts(page);
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        feedRef.current &&
        window.innerHeight + window.scrollY >=
          feedRef.current.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isPreviewOpen &&
        e.target.classList.contains("post-preview-overlay")
      ) {
        closePostPreview();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPreviewOpen]);

  // Lock body scroll when preview is open
  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreviewOpen]);

  const openPostPreview = (post) => {
    setSelectedPost(post);
    setIsPreviewOpen(true);
  };

  const closePostPreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div className="post-feed-container" ref={feedRef}>
      <div className="post-feed">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onClick={() => openPostPreview(post)}
          />
        ))}
        {loading && (
          <div className="loading-posts">
            <Loader className="spin" size={24} />
            <span>Loading more posts...</span>
          </div>
        )}
        {!hasMore && !loading && (
          <div className="no-more-posts">
            You've reached the end of the feed
          </div>
        )}
      </div>

      {/* Post Preview Modal */}
      {selectedPost && (
        <div
          className={`post-preview-overlay ${
            isPreviewOpen ? "open" : "closing"
          }`}
        >
          <div
            className={`post-preview-container ${
              isPreviewOpen ? "open" : "closing"
            }`}
          >
            <button className="close-preview-button" onClick={closePostPreview}>
              <X size={24} />
            </button>
            <PostPreview post={selectedPost} onClose={closePostPreview} />
          </div>
        </div>
      )}
    </div>
  );
};

const Post = ({ post, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [reactionCount, setReactionCount] = useState(post.reactions);
  const [showComments, setShowComments] = useState(false);
  const [commentAnimation, setCommentAnimation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [comments, setComments] = useState(post.recentComments);
  const optionsRef = useRef(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!liked) {
      setLikeAnimation(true);
      let count = reactionCount;
      const interval = setInterval(() => {
        count += 1;
        setReactionCount(count);
        if (count >= reactionCount + 1) {
          clearInterval(interval);
        }
      }, 50);
      setTimeout(() => setLikeAnimation(false), 600);
    } else {
      setReactionCount(reactionCount - 1);
    }
    setLiked(!liked);
  };

  const toggleComments = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
    setCommentAnimation(true);
    setTimeout(() => setCommentAnimation(false), 300);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setLoadingOptions(true);
    setShowOptions(!showOptions);
    setTimeout(() => {
      setLoadingOptions(false);
    }, 200);
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (commentText, commentImage) => {
    const newCommentObj = {
      id: Date.now(),
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=32&q=60",
        role: "Current User",
      },
      content: commentText,
      time: "Just now",
      likes: 0,
      image: commentImage,
    };

    setComments([newCommentObj, ...comments]);
  };

  const renderContent = () => {
    const maxLength = 200;
    if (post.content.length <= maxLength || expanded) {
      return post.content;
    }
    return (
      <>
        {post.content.substring(0, maxLength)}...
        <button className="read-more" onClick={toggleExpand}>
          Read more
        </button>
      </>
    );
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to ${post.user.name}'s profile`);
  };

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-header">
        <a href="#" onClick={navigateToProfile} className="profile-link">
          <div className="avatar-container">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="post-avatar"
            />
          </div>
        </a>
        <div className="post-user-info">
          <a href="#" onClick={navigateToProfile} className="profile-link">
            <div className="user-name-container">
              <h4>{post.user.name}</h4>
              {post.user.connection && (
                <span className="connection-badge">{post.user.connection}</span>
              )}
            </div>
            <p className="user-role">{post.user.role}</p>
          </a>
          <p className="post-time">
            {post.time} • <span className="visibility">🌎 Public</span>
          </p>
        </div>
        <div className="post-options-container" ref={optionsRef}>
          <button
            className={`post-options-button ${showOptions ? "active" : ""}`}
            onClick={toggleOptions}
          >
            <MoreHorizontal size={20} />
          </button>
          <Dropdown
            show={showOptions}
            loading={loadingOptions}
            onClose={() => setShowOptions(false)}
          />
        </div>
      </div>
      <div className="post-content-container">
        <p className="post-content">
          {renderContent()}
          {expanded && (
            <button className="read-less" onClick={toggleExpand}>
              Show less
            </button>
          )}
        </p>
        {post.images.length > 0 && (
          <div
            className={`post-images ${
              post.images.length > 1 ? "multi-image" : ""
            }`}
          >
            <img
              src={post.images[0]}
              alt="Post"
              className="post-main-image"
              style={{ height: post.images.length > 1 ? "300px" : "auto" }}
            />
            {post.images.length > 1 && (
              <div className="image-grid">
                {post.images.slice(1, 4).map((img, index) => (
                  <div key={index} className="grid-image-container">
                    <img
                      src={img}
                      alt={`Post ${index + 2}`}
                      style={{ height: "150px" }}
                    />
                    {index === 2 && post.images.length > 4 && (
                      <div className="remaining-count">
                        +{post.images.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-stats">
        <div className="reactions-count">
          <div className="reaction-icons">
            <div className="reaction-icon-container">
              <div className="reaction-icon like">
                <ThumbsUp size={12} fill="white" />
              </div>
              <div className="reaction-icon heart">
                <Heart size={12} fill="white" />
              </div>
            </div>
            <span className="count">{reactionCount.toLocaleString()}</span>
          </div>
          {(post.comments > 0 || post.reposts > 0) && (
            <button
              className="comments-count"
              onClick={(e) => {
                e.stopPropagation();
                toggleComments(e);
              }}
            >
              {post.comments > 0 ? `${post.comments} comments` : ""}
              {post.comments > 0 && post.reposts > 0 ? " • " : ""}
              {post.reposts > 0 ? `${post.reposts} reposts` : ""}
            </button>
          )}
        </div>
      </div>
      <div className="post-actions">
        <button
          className={`action-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
          <span>{liked ? "Liked" : "Like"}</span>
          {likeAnimation && (
            <div className="like-effect">
              <span className="like-burst">+1</span>
              <div className="like-circle"></div>
            </div>
          )}
        </button>
        <button
          className={`action-button ${showComments ? "active" : ""} ${
            commentAnimation ? "pulse" : ""
          }`}
          onClick={toggleComments}
        >
          <MessageSquare size={18} />
          <span>Comment</span>
        </button>
        <button className="action-button">
          <Repeat size={18} />
          <span>Repost</span>
        </button>
        <button
          className={`action-button ${isBookmarked ? "bookmarked" : ""}`}
          onClick={toggleBookmark}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          <span>{isBookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>

      {showComments && (
        <CommentSection
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onClose={toggleComments}
          currentUserAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=32&q=60"
        />
      )}
    </div>
  );
};

const PostPreview = ({ post, onClose }) => {
  const [expanded, setExpanded] = useState(true);
  const [liked, setLiked] = useState(false);
  const [reactionCount, setReactionCount] = useState(post.reactions);
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState(post.recentComments);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setReactionCount(reactionCount + 1);
    } else {
      setReactionCount(reactionCount - 1);
    }
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (commentText, commentImage) => {
    const newCommentObj = {
      id: Date.now(),
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=32&q=60",
        role: "Current User",
      },
      content: commentText,
      time: "Just now",
      likes: 0,
      image: commentImage,
    };

    setComments([newCommentObj, ...comments]);
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    console.log(`Navigating to ${post.user.name}'s profile`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="post-preview">
      <div className="preview-content">
        {post.images.length > 0 && (
          <div className="preview-image-container">
            <img
              src={post.images[currentImageIndex]}
              alt={`Post ${currentImageIndex + 1}`}
              className="preview-image"
            />
            {post.images.length > 1 && (
              <>
                <button className="image-nav prev" onClick={prevImage}>
                  ‹
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  ›
                </button>
                <div className="image-dots">
                  {post.images.map((_, index) => (
                    <span
                      key={index}
                      className={`image-dot ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="preview-info">
        <div className="preview-header">
          <a href="#" onClick={navigateToProfile} className="profile-link">
            <div className="avatar-container">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="post-avatar"
              />
            </div>
          </a>
          <div className="post-user-info">
            <a href="#" onClick={navigateToProfile} className="profile-link">
              <div className="user-name-container">
                <h4>{post.user.name}</h4>
                {post.user.connection && (
                  <span className="connection-badge">
                    {post.user.connection}
                  </span>
                )}
              </div>
              <p className="user-role">{post.user.role}</p>
            </a>
            <p className="post-time">
              {post.time} • <span className="visibility">🌎 Public</span>
            </p>
          </div>
        </div>

        <div className="preview-content-text">
          <p className="post-content">{post.content}</p>
        </div>

        <div className="post-stats">
          <div className="reactions-count">
            <div className="reaction-icons">
              <div className="reaction-icon-container">
                <div className="reaction-icon like">
                  <ThumbsUp size={12} fill="white" />
                </div>
                <div className="reaction-icon heart">
                  <Heart size={12} fill="white" />
                </div>
              </div>
              <span className="count">{reactionCount.toLocaleString()}</span>
            </div>
            {(post.comments > 0 || post.reposts > 0) && (
              <span className="comments-count">
                {post.comments > 0 ? `${post.comments} comments` : ""}
                {post.comments > 0 && post.reposts > 0 ? " • " : ""}
                {post.reposts > 0 ? `${post.reposts} reposts` : ""}
              </span>
            )}
          </div>
        </div>

        <div className="post-actions preview-actions">
          <button
            className={`action-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
            <span>{liked ? "Liked" : "Like"}</span>
          </button>
          <button
            className={`action-button ${showComments ? "active" : ""}`}
            onClick={toggleComments}
          >
            <MessageSquare size={18} />
            <span>Comment</span>
          </button>
          <button className="action-button">
            <Repeat size={18} />
            <span>Repost</span>
          </button>
          <button className="action-button">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button
            className={`action-button ${isBookmarked ? "bookmarked" : ""}`}
            onClick={toggleBookmark}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            <span>{isBookmarked ? "Saved" : "Save"}</span>
          </button>
        </div>

        {showComments && (
          <div className="preview-comments">
            <CommentSection
              comments={comments}
              onCommentSubmit={handleCommentSubmit}
              onClose={toggleComments}
              currentUserAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=32&q=60"
              isPreview={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
