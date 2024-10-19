import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const About = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about || null;

  return (
    <div className="-mt-8 px-4">
      <div className="sm:text-2xl sm:w-full">
        <SectionTitle title="About Us" />
      </div>
      <div className="flex w-full items-center sm:flex-col sm:-mt-10">
        <div className="h-[70vh] w-1/2 sm:w-full sm:h-[30vh]">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col w-1/2 sm:w-full gap-5">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white sm:w-full">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5 mt-8">
        <h1 className="text-[#93C5FD] text-2xl mb-4">
          Here are a few technologies I've been working with recently :)
        </h1>
        <div className="flex flex-wrap gap-3 justify-start">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white text-sm flex items-center justify-between px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0.5, y: 10 }} // Start with opacity at 0.5
              animate={{
                opacity: [0.5, 1, 0.5], // Cycle through opacity values
                y: [0, -5, 0], // Bounce effect
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <i className="fas fa-code text-lg mr-2"></i>
              <span className="text-xs font-semibold">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
