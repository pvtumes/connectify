import React, { useState, useRef, useEffect } from "react";
import "./CommentSection.css";
import {
  ThumbsUp,
  Image as ImageIcon,
  Smile,
  X,
  ChevronUp,
  Reply,
  Trash2,
} from "lucide-react";

const CommentSection = ({
  comments: initialComments,
  onCommentSubmit,
  onClose,
  currentUserAvatar,
  currentUserId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [commentImagePreview, setCommentImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [replyingTo, setReplyingTo] = useState(null);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Update comments when initialComments prop changes
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() && !commentImagePreview) return;

    if (replyingTo) {
      // Handle reply submission
      const reply = {
        id: Date.now().toString(),
        user: {
          id: currentUserId,
          avatar: currentUserAvatar,
          name: "You",
          role: "User",
        },
        content: newComment,
        image: commentImagePreview,
        time: "Just now",
        likes: 0,
        liked: false,
        parentId: replyingTo,
      };

      // Find the parent comment and add the reply
      const updatedComments = comments.map((comment) => {
        if (
          comment.id === replyingTo ||
          comment.replies?.some((reply) => reply.id === replyingTo)
        ) {
          const newReplies = [...(comment.replies || []), reply];
          return { ...comment, replies: newReplies };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      // Handle new comment submission
      onCommentSubmit(newComment, commentImagePreview);
    }

    setNewComment("");
    setCommentImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCommentImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setCommentImagePreview(null);

  const addEmoji = (emoji) => {
    setNewComment((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        // Check main comments
        if (comment.id === commentId) {
          const newLikes = comment.liked
            ? comment.likes - 1
            : comment.likes + 1;
          return { ...comment, likes: newLikes, liked: !comment.liked };
        }

        // Check replies
        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              const newLikes = reply.liked ? reply.likes - 1 : reply.likes + 1;
              return { ...reply, likes: newLikes, liked: !reply.liked };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      })
    );
  };

  const handleDelete = (commentId) => {
    setComments((prevComments) => {
      // First try to find and delete from main comments
      const filteredComments = prevComments.filter(
        (comment) => comment.id !== commentId
      );

      // If the comment wasn't found in main comments, check replies
      if (filteredComments.length === prevComments.length) {
        return prevComments.map((comment) => {
          if (comment.replies) {
            const filteredReplies = comment.replies.filter(
              (reply) => reply.id !== commentId
            );
            return { ...comment, replies: filteredReplies };
          }
          return comment;
        });
      }

      return filteredComments;
    });
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    // Focus the input field
    setTimeout(() => {
      const input = document.querySelector(".comment-input-container input");
      if (input) input.focus();
    }, 0);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const renderComment = (comment, isReply = false) => {
    const isCurrentUser = comment.user.id === currentUserId;

    return (
      <div key={comment.id} className={`comment ${isReply ? "reply" : ""}`}>
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="comment-avatar"
        />
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-user">{comment.user.name}</span>
            {comment.user.role && (
              <span className="comment-role">{comment.user.role}</span>
            )}
            <span className="comment-time">{comment.time}</span>
          </div>
          <p className="comment-text">{comment.content}</p>
          {comment.image && (
            <div className="comment-image-container">
              <img
                src={comment.image}
                alt="Comment"
                className="comment-image"
              />
            </div>
          )}
          <div className="comment-actions">
            <button
              className={`comment-like ${comment.liked ? "liked" : ""}`}
              onClick={() => handleLike(comment.id)}
            >
              <ThumbsUp size={14} />
              <span>{comment.likes}</span>
            </button>
            <button
              className="comment-reply"
              onClick={() => handleReply(comment.id)}
            >
              <Reply size={14} />
              <span>Reply</span>
            </button>
            {isCurrentUser && (
              <button
                className="comment-delete"
                onClick={() => handleDelete(comment.id)}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            )}
          </div>

          {/* Reply form when this comment is being replied to */}
          {replyingTo === comment.id && (
            <div className="reply-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={`Replying to ${comment.user.name}...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="reply-buttons">
                  <button type="button" onClick={cancelReply}>
                    Cancel
                  </button>
                  <button type="submit" disabled={!newComment.trim()}>
                    Reply
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Render replies if they exist */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies-container">
              {comment.replies.map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h4>Recent comments</h4>
        <button onClick={onClose} className="collapse-comments">
          <ChevronUp size={18} />
        </button>
      </div>

      {comments.map((comment) => renderComment(comment))}

      <form className="add-comment" onSubmit={handleSubmit}>
        <img
          src={currentUserAvatar}
          alt="Your profile"
          className="comment-avatar"
        />
        <div className="comment-input-container">
          <input
            type="text"
            placeholder={
              replyingTo ? "Write your reply..." : "Add a comment..."
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(e)
            }
          />
          {replyingTo && (
            <div className="replying-to-indicator">
              Replying to{" "}
              {comments.find((c) => c.id === replyingTo)?.user.name ||
                "comment"}
              <button type="button" onClick={cancelReply}>
                <X size={14} />
              </button>
            </div>
          )}
          <div className="comment-actions-bar">
            <button
              type="button"
              className="comment-action-button"
              onClick={() => fileInputRef.current.click()}
            >
              <ImageIcon size={18} />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </button>
            <button
              type="button"
              className="comment-action-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={18} />
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker" ref={emojiPickerRef}>
                {["😊", "👍", "❤️", "😂", "🔥"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          {commentImagePreview && (
            <div className="comment-image-preview">
              <img src={commentImagePreview} alt="Preview" />
              <button
                type="button"
                className="remove-image-button"
                onClick={removeImage}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="comment-submit-button"
          disabled={!newComment.trim() && !commentImagePreview}
        >
          {replyingTo ? "Reply" : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
