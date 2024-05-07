import Link from "next/link";
import React from "react";

const UnAuthorized = ({ path }) => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="text-center flex flex-col gap-2">
        <h4 className="text-green-500 text-xl ">
          You are not authorized to access this page
        </h4>
        <h4>Leave this page</h4>
        <Link
          href={path}
          className="bg-blue-50 text-blue-500 shadow-sm hover:shadow px-3 py-1 rounded"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
