import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="max-w-screen-xl m-auto px-4 min-h-[70vh]">{children}</div>
  );
};

export default PageContainer;
