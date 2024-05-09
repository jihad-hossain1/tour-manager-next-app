"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Information = () => {
  const { data: session } = useSession();

  const type = session?.user?.type;

  return (
    <main className="flex justify-center items-center h-[70vh]">
      <div className="text-center">
        <h4 className="text-2xl flex flex-col gap-1">
          Ops, Sorry For That , You are
          <span className="font-bold">{` ${type} `}</span>
        </h4>
        <div className="text-center mt-6">
          <Link
            href={"/"}
            className="text-blue-700  font-semibold border p-2 rounded-md shadow-sm hover:shadow hover:bg-slate-100 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Information;
