import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Intro = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, LastName, welcomeText, description, caption } = intro || {};

  // Define animation variants for each element
  const variants = {
    hidden: { opacity: 0, y: 50, rotate: -10 }, // Start hidden and rotated
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      scale: 1.1 
    },
  };

  return (
    <div className="h-screen bg-primary flex flex-col items-center justify-center gap-6 p-8 relative">
      <motion.h1 
        className="text-white text-3xl sm:text-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {welcomeText}
      </motion.h1>
      <motion.h1 
        className="text-8xl sm:text-5xl text-secondary font-bold text-center"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
      >
        {firstName || ""} {LastName || ""}
      </motion.h1>
      <motion.h2 
        className="text-5xl sm:text-3xl text-white font-semibold text-center"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      >
        {caption || ""}
      </motion.h2>
      <motion.p 
        className="text-white max-w-2xl mt-4 leading-relaxed text-lg sm:text-base text-center"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
      >
        {description || ""}
      </motion.p>
      <motion.a
        href="#contact"
        className="mt-6 mb-6 px-8 py-3 text-white font-medium rounded-lg border-2 border-secondary transition-all 
            bg-gradient-to-r from-tertiary to-tertiary-dark hover:bg-gradient-to-r hover:from-secondary-dark hover:to-secondary-light"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      >
        Get Started
      </motion.a>

      {/* Down Arrow Button */}
      <div className="mt-10">
        <a href="#about" className="text-white flex flex-col items-center">
          <FaChevronDown className="text-4xl animate-bounce" /> {/* Slight bounce for emphasis */}
          <span className="text-sm mt-1">Scroll Down</span>
        </a>
      </div>
    </div>
  );
};

export default Intro;
