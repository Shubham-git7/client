import React from "react";

const LLeftSider = () => {
  return (
    <div>
        <div className="flex fixed px-6 flex-col items-center left-0 bottom-0 sm:static sm:pb-10 ">
      <div className="flex text-blue-200 text-xl flex-col gap-3 sm:flex-row sm:-mt-5  ">
        <a href="https://www.linkedin.com/in/shubham-gulhane-2aa12b247"><i class="ri-linkedin-box-fill"></i></a>
        <a href="https://github.com/Shubham-git7"><i class="ri-github-fill"></i></a>
        <i class="ri-mail-line"></i>
        <i class="ri-instagram-line"></i>
        <i class="ri-discord-line"></i>
      </div>
      <div className="w-[1px] h-[15rem] bg-[#125f63] sm:hidden "></div>
    </div>
    </div>
  );
};

export default LLeftSider;
