import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
const Contact = () => {
  // const user = {
  //   name: "Shubham Narendra Gulhane",
  //   age: "null",
  //   gender: "Male",
  //   email: "gullhane383@gmail.com",
  //   country: "INDIA",
  // };
  const  {loading ,  portfolioData} = useSelector((state) => state.root);
  const Contact = portfolioData?.Contact;
  return (
    <div className="mt-5 ">
      <SectionTitle title="Say Hello..." />
      <div className="flex text-lg ">
        <div className="flex flex-col  gap-1">
          <h1 className="text-blue-300">{"{"}</h1>
          {Object.keys(Contact).map((key) => (
            key !=='_id' &&
            <h1 className="ml-7">
              <span className="text-blue-100">{key} : </span>
              <span className="text-blue-300">{Contact[key]}</span>
            </h1>
          ))}
          <h1 className="text-white">{"}"}</h1>
        </div>
        <div className="h-[300px]   w-[700px] -mt-[35px] ml-10 ">
           

          <dotlottie-player
            src="https://lottie.host/70a9f439-b178-4f51-847c-bdc6561b6c51/wRolZZoo7T.json"
            background="transparent"
            speed="1"
           
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
};

export default Contact;
