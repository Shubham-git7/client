import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Courses = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const courses = portfolioData?.courses || [];

  // Ensure the selectedItemIndex is valid
  const currentCourse = courses[selectedItemIndex] || null;

  return (
    <div className="mt-20">
      <SectionTitle title="Courses or Certificate" />

      <div className="flex gap-10 sm:flex-col">
        {/* Timeline on the left */}
        <div className="flex flex-col gap-10 pl-3 sm:flex-row sm:overflow-x-scroll sm:w-full ">
          {courses.map((course, index) => (
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
                {course.title || "No title available"}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center sm:flex-col">
          {/* Show selected course details only if the currentCourse is valid */}
          {currentCourse ? (
            <div className="flex flex-col gap-3 ml-10 pb-10 sm:ml-0 w-2/3 sm:w-[30rem] sm:pt-20">
              <h1 className="text-3xl text-orange-500">
                {currentCourse.title || "No title available"}
              </h1>

              <p className="text-white leading-7">
                {currentCourse.description || "No description available"}
              </p>
            </div>
          ) : (
            <p className="text-white">No course selected or available</p>
          )}

          {currentCourse?.image && (
            <img
              src={currentCourse.image}
              alt="Course"
              className="h-60 pb-10 mt-10 ml-5 w-72"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
