import React, { useState, useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  Smile,
  Image,
  Calendar,
  Gift,
  Users,
  Globe,
  Tag,
  MessageSquare,
  X,
  Plus,
  Video,
  FileText,
  MapPin,
  Clock,
  Cake,
  PartyPopper,
} from "lucide-react";
import "./StartAPost.css";
import Modal from "./Modal";

const StartAPost = () => {
   const [isModalOpen, setIsModalOpen] = useState(true); // Add this state

   // ... all your existing state and functions ...

   const closeModal = () => {
     setIsModalOpen(false);
     // Reset all states when closing
     setPostText("");
     setAttachments([]);
     setCharCount(0);
     setEventDetails({ title: "", date: "", time: "", location: "" });
     setCelebrationDetails({ occasion: "", date: "", message: "" });
     setActiveTool(null);
     setShowEmojiPicker(false);
     setShowAudienceMenu(false);
   };
  const [postText, setPostText] = useState("");
  const [audience, setAudience] = useState("Anyone");
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
    const [posts, setPosts] = useState([]); // State to store all posts
 
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });
  const [celebrationDetails, setCelebrationDetails] = useState({
    occasion: "",
    date: "",
    message: "",
  });

  const fileInputRef = useRef(null);
  const audienceMenuRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null);

  const audienceOptions = [
    {
      label: "Anyone",
      icon: <Globe size={18} />,
      description: "Anyone on or off LinkedIn",
    },
    {
      label: "Connections only",
      icon: <Users size={18} />,
      description: "Connections on LinkedIn",
    },
    {
      label: "Group",
      icon: <Tag size={18} />,
      description: "Select a group to share with",
    },
    {
      label: "Comment control",
      icon: <MessageSquare size={18} />,
      description: "Control who can comment",
    },
  ];

  const emojis = [
    "😊",
    "👍",
    "🎉",
    "❤️",
    "👏",
    "🔥",
    "💡",
    "✅",
    "⭐",
    "🚀",
    "🌟",
    "💯",
    "😍",
    "🙌",
    "🤩",
    "🎯",
    "📢",
    "📈",
    "🤝",
    "🏆",
    "✨",
    "🌍",
    "💼",
    "📚",
  ];

 const occasionOptions = [
   { value: "birthday", label: "Birthday", icon: <Cake size={18} /> },
   {
     value: "anniversary",
     label: "Work Anniversary",
     icon: <Gift size={18} />,
   },
   { value: "promotion", label: "Promotion", icon: <PartyPopper size={18} /> },
   { value: "new_job", label: "New Job", icon: <Plus size={18} /> },
 ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        audienceMenuRef.current &&
        !audienceMenuRef.current.contains(event.target)
      ) {
        setShowAudienceMenu(false);
      }

      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAudienceChange = (option) => {
    setAudience(option);
    setShowAudienceMenu(false);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= 3000) {
      setPostText(text);
      setCharCount(text.length);
    }
  };

  const handleInsertEmoji = (emoji) => {
    setPostText((prev) => prev + emoji);
    setCharCount(postText.length + emoji.length);
    setShowEmojiPicker(false);
    textareaRef.current.focus();
  };

   const handleFileUpload = (e, fileType) => {
     const files = Array.from(e.target.files);

     if (files.length > 0) {
       const newAttachments = files
         .map((file) => {
           // Validate file type based on what was clicked
           if (fileType === "image" && !file.type.startsWith("image/")) {
             alert("Please select an image file");
             return null;
           }
           if (fileType === "video" && !file.type.startsWith("video/")) {
             alert("Please select a video file");
             return null;
           }
           if (
             fileType === "document" &&
             ![
               "application/pdf",
               "application/msword",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
             ].includes(file.type)
           ) {
             alert("Please select a PDF or Word document");
             return null;
           }

           return {
             id: Date.now() + Math.random().toString(36).substr(2, 9),
             name: file.name,
             type: file.type,
             previewUrl: file.type.startsWith("image/")
               ? URL.createObjectURL(file)
               : null,
           };
         })
         .filter(Boolean); // Remove null entries from failed validations

       setAttachments([...attachments, ...newAttachments]);
       setActiveTool(null);
     }
   };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter((item) => item.id !== id));
  };

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
    setShowEmojiPicker(false);
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCelebrationChange = (e) => {
    const { name, value } = e.target;
    setCelebrationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const addEventToPost = () => {
    const eventText = `Event: ${eventDetails.title}\nDate: ${eventDetails.date}\nTime: ${eventDetails.time}\nLocation: ${eventDetails.location}`;
    setPostText((prev) => prev + (prev ? "\n\n" : "") + eventText);
    setEventDetails({ title: "", date: "", time: "", location: "" });
    setActiveTool(null);
  };

  const addCelebrationToPost = () => {
    const occasion = occasionOptions.find(
      (opt) => opt.value === celebrationDetails.occasion
    );
    const celebrationText = `Celebrating ${
      occasion?.label || "an occasion"
    }!\nDate: ${celebrationDetails.date}\n${celebrationDetails.message}`;
    setPostText((prev) => prev + (prev ? "\n\n" : "") + celebrationText);
    setCelebrationDetails({ occasion: "", date: "", message: "" });
    setActiveTool(null);
  };

  const handlePost = () => {
    if (!postText.trim() && attachments.length === 0) return;

    setIsPosting(true);

    // Create new post object
    const newPost = {
      id: Date.now(),
      text: postText,
      audience,
      attachments: [...attachments],
      event: eventDetails.title ? { ...eventDetails } : null,
      celebration: celebrationDetails.occasion
        ? { ...celebrationDetails }
        : null,
      timestamp: new Date().toISOString(),
      author: {
        name: "Umesh Prasad",
        avatar: "./profile.png",
      },
    };

    // Simulate API call
    setTimeout(() => {
      // Add the new post to the posts array
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      // Reset form after posting
      setPostText("");
      setAttachments([]);
      setCharCount(0);
      setEventDetails({ title: "", date: "", time: "", location: "" });
      setCelebrationDetails({ occasion: "", date: "", message: "" });
      setIsPosting(false);
      setIsModalOpen(false);

      console.log("New post added:", newPost);
      console.log("All posts:", [...posts, newPost]);
    }, 1500);
  };

  const getAudienceIcon = () => {
    const option = audienceOptions.find((opt) => opt.label === audience);
    return option ? option.icon : <Globe size={18} />;
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="startapost-container">
        <div className="startapost-header">
          <div className="startapost-user-info">
            <div className="startapost-avatar">
              {/* <User size={28} /> */}
              <img
                src="./profile.png"
                alt="Profile"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="startapost-user-text">
              <div className="startapost-username">Umesh Prasad</div>
              <div
                className="startapost-audience-selector"
                onClick={() => setShowAudienceMenu(!showAudienceMenu)}
                ref={audienceMenuRef}
              >
                <div className="startapost-audience-display">
                  {getAudienceIcon()}
                  <span>Post to {audience}</span>
                  <ChevronDown
                    size={18}
                    className={`chevron ${showAudienceMenu ? "open" : ""}`}
                  />
                </div>

                {showAudienceMenu && (
                  <div className="startapost-audience-menu">
                    <div className="startapost-menu-header">
                      <h3>Who can see your post?</h3>
                    </div>
                    {audienceOptions.map((option) => (
                      <div
                        key={option.label}
                        className={`startapost-audience-option ${
                          audience === option.label ? "selected" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAudienceChange(option.label);
                        }}
                      >
                        <div className="startapost-option-icon">
                          {option.icon}
                        </div>
                        <div className="startapost-option-content">
                          <div className="startapost-option-label">
                            {option.label}
                          </div>
                          <div className="startapost-option-description">
                            {option.description}
                          </div>
                        </div>
                        {audience === option.label && (
                          <div className="startapost-option-selected"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="startapost-content">
          <textarea
            ref={textareaRef}
            className="startapost-input"
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={handleTextChange}
          />

          {attachments.length > 0 && (
            <div className="startapost-attachments">
              {attachments.map((file) => (
                <div key={file.id} className="startapost-attachment">
                  {file.previewUrl ? (
                    <div className="startapost-image-preview">
                      <img src={file.previewUrl} alt={file.name} />
                      <button
                        className="startapost-remove-attachment"
                        onClick={() => removeAttachment(file.id)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="startapost-file-preview">
                      <span className="startapost-file-name">{file.name}</span>
                      <button
                        className="startapost-remove-attachment"
                        onClick={() => removeAttachment(file.id)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTool === "media" && (
            <div className="startapost-tool-section">
              <div className="startapost-media-options">
                <div className="startapost-media-option">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "image")}
                    multiple
                  />
                  <label htmlFor="image-upload">
                    <Image size={22} />
                    <span>Photo</span>
                  </label>
                </div>
                <div className="startapost-media-option">
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "video")}
                  />
                  <label htmlFor="video-upload">
                    <Video size={22} />
                    <span>Video</span>
                  </label>
                </div>
                <div className="startapost-media-option">
                  <input
                    type="file"
                    id="document-upload"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "document")}
                  />
                  <label htmlFor="document-upload">
                    <FileText size={22} />
                    <span>Document</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          {activeTool === "event" && (
            <div className="startapost-tool-section">
              <h3>Create an Event</h3>
              <div className="startapost-form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleEventChange}
                  placeholder="What's the event about?"
                />
              </div>
              <div className="startapost-form-row">
                <div className="startapost-form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleEventChange}
                  />
                </div>
                <div className="startapost-form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={eventDetails.time}
                    onChange={handleEventChange}
                  />
                </div>
              </div>
              <div className="startapost-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventDetails.location}
                  onChange={handleEventChange}
                  placeholder="Where is it happening?"
                />
              </div>
              <button
                className="startapost-add-btn"
                onClick={addEventToPost}
                disabled={!eventDetails.title || !eventDetails.date}
              >
                Add Event to Post
              </button>
            </div>
          )}

          {activeTool === "celebration" && (
            <div className="startapost-tool-section">
              <h3>Celebrate an Occasion</h3>
              <div className="startapost-form-group">
                <label>What are you celebrating?</label>
                <select
                  name="occasion"
                  value={celebrationDetails.occasion}
                  onChange={handleCelebrationChange}
                >
                  <option value="">Select an occasion</option>
                  {occasionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="startapost-form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={celebrationDetails.date}
                  onChange={handleCelebrationChange}
                />
              </div>
              <div className="startapost-form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={celebrationDetails.message}
                  onChange={handleCelebrationChange}
                  placeholder="Share your celebration message"
                  rows="3"
                />
              </div>
              <button
                className="startapost-add-btn"
                onClick={addCelebrationToPost}
                disabled={
                  !celebrationDetails.occasion || !celebrationDetails.date
                }
              >
                Add Celebration to Post
              </button>
            </div>
          )}

          {showEmojiPicker && (
            <div className="startapost-emoji-picker" ref={emojiPickerRef}>
              <div className="startapost-emoji-grid">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    className="startapost-emoji"
                    onClick={() => handleInsertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {charCount > 0 && (
            <div className="startapost-char-count">{charCount}/3000</div>
          )}
        </div>

        <div className="startapost-toolbar">
          <div className="startapost-tools">
            <button
              className={`startapost-tool-btn ${
                showEmojiPicker ? "active" : ""
              }`}
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setActiveTool(null);
              }}
            >
              <Smile size={22} />
              <span>Emoji</span>
            </button>

            <button
              className={`startapost-tool-btn ${
                activeTool === "media" ? "active" : ""
              }`}
              onClick={() => handleToolClick("media")}
            >
              <Image size={22} />
              <span>Media</span>
            </button>

            <button
              className={`startapost-tool-btn ${
                activeTool === "event" ? "active" : ""
              }`}
              onClick={() => handleToolClick("event")}
            >
              <Calendar size={22} />
              <span>Event</span>
            </button>

            <button
              className={`startapost-tool-btn ${
                activeTool === "celebration" ? "active" : ""
              }`}
              onClick={() => handleToolClick("celebration")}
            >
              <Gift size={22} />
              <span>Celebrate</span>
            </button>
          </div>

          <button
            className={`startapost-post-btn ${
              postText.trim() || attachments.length > 0 ? "active" : "disabled"
            }`}
            disabled={
              (!postText.trim() && attachments.length === 0) || isPosting
            }
            onClick={handlePost}
          >
            {isPosting ? <div className="startapost-spinner"></div> : "Post"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StartAPost;
