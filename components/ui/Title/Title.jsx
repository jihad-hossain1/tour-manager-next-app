import React from "react";

const Title = ({ firstText, secondText }) => {
  return (
    <h4 className="text-3xl my-6 lg:my-10">
      <span className="border-b-[3px] pb-1 border-blue-600 w-fit">
        {firstText}
      </span>{" "}
      {secondText}
    </h4>
  );
};

export default Title;
