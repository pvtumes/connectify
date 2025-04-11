import React, { useState } from "react";
import MainCourseFile from "../Courses/MainCourseFile";
import StudentHome from "../StudnetSection/StudentHome/StudentHome";
import StudentNavbar from "../StudnetSection/StudentNavbar/StudentNavbar";

const LoginAsAUser = () => {
  const [activeView, setActiveView] = useState("home");

  const handleNavigation = (view) => {
    setActiveView(view);
  };

  return (
    <div>
      <StudentNavbar onNavigate={handleNavigation} />
      {activeView === "home" && <StudentHome />}
      {activeView === "courses" && <MainCourseFile />}
    </div>
  );
};

export default LoginAsAUser;
