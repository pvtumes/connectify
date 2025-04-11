import React from "react";
import "./StudentHome.css";
import {
  Bell,
  MessageSquare,
  Search,
  BookOpen,
  Award,
  Users,
  Calendar,
  ChevronDown,
} from "lucide-react";
import AddPost from "../AddPost/AddPost";
import PostFeed from "../PostFeed/PostFeed";
import ProfileCard from "../ProfileCard/ProfileCard";
import Trending from "../Trending/Trending";
import UpcomingDeadlines from "../UpcomingDeadlines/UpcomingDeadlines";
import StudentSectionFooter from "../StudentSectionFooter/StudentSectionFooter";


const StudentHome = () => {
  return (
    <div className="sh-container">
      {/* Profile Card - Left Section */}
      <div className="sh-profile-card">
        <ProfileCard />
      </div>

      {/* Feed Section - Middle */}
      <div className="sh-feed-section">
        <AddPost />

        {/* Feed Posts */}
        <PostFeed />
      </div>

      {/* Trending & Footer - Right Section */}
      <div className="sh-trending-footer">
        <Trending />
        <UpcomingDeadlines />
        <StudentSectionFooter /> {/* Use the StudentSectionFooter component */}
      </div>
    </div>
  );
};

export default StudentHome;
