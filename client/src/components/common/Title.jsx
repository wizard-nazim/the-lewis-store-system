import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col gap-1 items-center mb-3">
      <p className="text-black">
        {text1} <span className="text-red-600 font-medium">{text2}</span>
      </p>
      <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
    </div>
  );
};

export default Title;
