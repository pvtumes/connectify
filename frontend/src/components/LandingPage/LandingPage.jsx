import Home from "./Home";
import Navbar from "./Navbar";
import Features from "./Feature";
import Benifits from "./Benifits";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import LoginSignup from "./LoginSignup";
import ModalLoginSignup from "./ModalLoginSignup";

function LandingPage() {
  return (
    <>
      <div className="custom-responsive-container">
        <Navbar></Navbar>
        <Home></Home>
        <Features></Features>
        <Benifits></Benifits>
      </div>
      <Testimonials></Testimonials>
      <div className="custom-responsive-container">
        <Contact></Contact>
        <Footer></Footer>
      </div>

      <ModalLoginSignup></ModalLoginSignup>
    </>
  );
}

export default LandingPage;
