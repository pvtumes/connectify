import React from "react";
import "./StudentSection.css"; // You'll need to create this CSS file
import StudentNavbar from "./StudentNavbar/StudentNavbar";
import StudentHome from "./StudentHome/StudentHome";

const StudentSection = () => {
  return (
    <div id="Student" className="student-section">
      <div className="keepsteady">
        <StudentNavbar></StudentNavbar>
      </div>
      <div className="student-section">
        <StudentHome></StudentHome>
      </div>
    </div>
  );
};

export default StudentSection;
