import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const  {loading ,  portfolioData} = useSelector((state) => state.root);
  const {experiences} = portfolioData;
  // const { experiences = [] } = portfolioData || {};

  
  return (
    <div className="py-10 sm:-mx-12  lg:px-20">
      <SectionTitle title="Experience" />

      <div className="flex gap-10 sm:flex-col">
        {/* Timeline on the left */}
        <div className="flex flex-col gap-10 pl-3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experiences, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                selectedItemIndex === index
                  ? "border-l-2 border-blue-400 bg-blue-800 text-blue-200 py-3 pl-5 pr-2"
                  : "text-white hover:text-blue-200"
              }`}
              onClick={() => setSelectedItemIndex(index)}
            >
              <h1
                className={`text-xl whitespace-nowrap transition-all duration-200 ease-in-out ${
                  selectedItemIndex === index ? "font-bold" : "font-normal"
                }`}
              >
                {experiences.period}
              </h1>
            </div>
          ))}
        </div>

        {/* Experience details on the right */}
        <div className="flex flex-col gap-3 ml-32 sm:ml-0 w-2/3 sm:w-[30rem]">
          <h1 className="text-3xl text-orange-500">
            {experiences[selectedItemIndex]?.title}
          </h1>
          <h2 className="text-lg text-blue-300">
            {experiences[selectedItemIndex]?.company}
          </h2>
          <p className="text-white leading-7">
            {experiences[selectedItemIndex]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experiences;

