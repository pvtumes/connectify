import "./App.css";
import LoginAsUser from "./components/LoginAsAUser/LoginAsAUser";
import LandingPage from "./components/LandingPage/LandingPage"
import StudentSection from "./components/StudnetSection/StudentSection";
import ConnectifyCodingPlatfom from "./components/CodingPlatform/ConnectifyCodingPlatfom"
import CodingPlatform from "./components/CodingPlatform/CodingPlatform";
import HomeSecionEvents from "./components/Events/HomeSecionEvents/HomeSecionEvents";
import EditProfile from "./components/ProfileSection/EditProfile"
// import ProfileSection from "./components/ProfileSection/ProfileSection";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModalLoginSignup from "./components/LandingPage/ModalLoginSignup";
import Navbar from "./components/LandingPage/Navbar";
import MainCourseFile from "./components/Courses/MainCourseFile";

function App() {
  return (
    // <>
    //   {/* <ProfileSection></ProfileSection> */}
    //   {/* <EditProfile></EditProfile> */}
    //   <LandingPage></LandingPage>
    //   {/* <HomeSecionEvents></HomeSecionEvents> */}
    //   <LoginAsUser></LoginAsUser>
    //   {/* <ConnectifyCodingPlatfom></ConnectifyCodingPlatfom>
    //   <CodingPlatform></CodingPlatform> */}

    //   <br></br>
    // </>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LoginAsUser />} />
        {/*<Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
