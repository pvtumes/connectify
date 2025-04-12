import React, { useState } from "react";
import MainCourseFile from "../Courses/MainCourseFile";
import StudentHome from "../StudnetSection/StudentHome/StudentHome";
import StudentNavbar from "../StudnetSection/StudentNavbar/StudentNavbar";
import ConnectifyPlatform from "../CodingPlatform/ConnectifyCodingPlatfom";
import HomeSecionEvents from "../Events/HomeSecionEvents/HomeSecionEvents";
import NotifiCationSection from "../NotifiCationSection/NotifiCationSection";
import OpportunityListings from "../Opportunities/OpportunityListings";
// import ProfileSection from "../Profile/ProfileSection";
import ProfileSection from "../ProfileSection/ProfileSection"

const LoginAsAUser = () => {
  const [activeView, setActiveView] = useState("home");

  const handleNavigation = (view) => {
    setActiveView(view);
  };

  return (
    <div>
      <StudentNavbar onNavigate={handleNavigation} />
      <div className="student-section">
        {activeView === "home" && <StudentHome />}
        {activeView === "courses" && <MainCourseFile />}
        {activeView === "codeOfTheDay" && <ConnectifyPlatform />}
        {activeView === "events" && <HomeSecionEvents />}
        {activeView === "notifications" && <NotifiCationSection />}
         {activeView === "opportunities" && <OpportunityListings />}
        {activeView === "profile" && <ProfileSection />} 
      </div>
    </div>
  );
};

export default LoginAsAUser;
