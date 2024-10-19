import React from "react";
import SectionTitle from "../../components/SectionTitle";
// import { projects } from "../../resources/projects";
import { useSelector } from "react-redux";

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  
  // Access the nested experiences array
  const { projects } = portfolioData;
  return (

    <div>
      <SectionTitle title="Projects" />

      <div className="flex gap-10 sm:flex-col">
        {/* Timeline on the left */}
        <div className="flex flex-col gap-10  pl-3 sm:flex-row sm:overflow-x-scroll sm:w-full ">
          {projects.map((projects, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                selectedItemIndex === index
                  ? "border-l-2 border-blue-400    bg-blue-800 text-blue-200 py-3 pl-5 pr-2 "
                  : "text-white hover:text-blue-200"
              }`}
              onClick={() => setSelectedItemIndex(index)}
            >
              <h1
                className={`text-xl whitespace-nowrap transition-all duration-200 ease-in-out ${
                  selectedItemIndex === index ? "font-bold" : "font-normal"
                }`}
              >
                {projects.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center sm:flex-col">
            <img src={projects[selectedItemIndex].image} alt="sdf" className="h-60  mt-10 ml-[145px] w-72" />
          <div className="flex flex-col gap-3 ml-20 sm:ml-0 w-2/3 sm:w-[30rem] sm:pt-20">
            <h1 className="text-3xl text-orange-500">
              {projects[selectedItemIndex].title}
            </h1>

            <p className=" text-white leading-7">
              {projects[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
