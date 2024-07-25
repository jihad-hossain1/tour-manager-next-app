'use client'

import SuperAdminContext from "@/config/superAdminContext";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaHome, FaMapMarked, FaMapMarkedAlt } from "react-icons/fa";
import { FiAlignLeft, FiCrosshair } from "react-icons/fi";
import { TfiControlBackward } from "react-icons/tfi";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);


  const dashNavData = [
    {
      icon: <FaHome />,
      name: "Dashboard",
      href: "/super-admin-dashboard",
    },
    {
      name: "Locations",
      href: "/super-admin-dashboard/locations",
      icon: <FaMapMarked />
    },
    {
      name: "Tour Spots",
      href: "/super-admin-dashboard/tour-spots",
      icon: <FaMapMarkedAlt />
    },
  ];
  return (
    <SuperAdminContext>
      <main className="flex gap-2 relative">
        
        <div className="max-h-20 w-full absolute top-0 z-10 bg-slate-300 shadow p-2 flex justify-between items-center">
        
          <button
          onClick={() => setOpen(true)}
          className="p-2"
        >
         <FiAlignLeft className="text-3xl" />
        </button>
        <Link href={'/'} className="flex gap-2 items-center"> <FaHome /> Home</Link>
        </div>
        <aside className={open ? "bg-slate-800  shadow-sm border-l border-gray-800 text-white absolute z-50 h-screen" : "hidden"}>
          <div className="relative ">
              <div onClick={() => setOpen(false)} className="absolute -right-7 top-0 bg-slate-800 text-white px-3 py-1 shadow rounded-br-md" >
              <TfiControlBackward className=" text-3xl cursor-pointer" />
              </div>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            {dashNavData?.map((item, index) => (
              <Link key={index} href={item?.href} className="hover:bg-gray-700 py-2 px-[26px] transition duration-300 text-nowrap text-[16px] flex items-center gap-6 ">
              {item?.icon}  {item?.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className={open ? "w-full min-h-screen ml-[200px] mt-28" : "w-full min-h-screen mt-28"}>{children}</div>
      </main>
    </SuperAdminContext>
  );
};



export default Layout;
