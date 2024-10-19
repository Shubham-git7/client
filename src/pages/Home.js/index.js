import React from "react";
import Header from "../../components/Header";
import Intro from "../Intro";
import About from "./About";
import Experinces from "./Experinces";
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "./Footer";
import LLeftSider from "./LLeftSider";
import { useSelector } from "react-redux";
// import Loader from "../../components/Loader";
// import sectionTitle from "../../components/sectionTitle";
const Home = () => {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className="px-40 bg-primary sm:px-5">
          <Intro />
          <About />
          <Experinces></Experinces>
          <Projects />
          <Courses />
          <Contact />
          <Footer />
          <LLeftSider />
          {/* <Loader /> */}
        </div>
      )}  
    </div>
  );
};
export default Home;
