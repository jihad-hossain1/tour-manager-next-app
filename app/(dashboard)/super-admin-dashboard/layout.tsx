import SuperAdminContext from "@/config/superAdminContext";
import Link from "next/link";
import React from "react";
import { FaHome, FaMapMarked, FaMapMarkedAlt } from "react-icons/fa";

const Layout = ({ children }) => {

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
        <aside className="bg-slate-800  shadow-sm border-l border-gray-800 text-white absolute z-10 h-screen">
          <div className="flex flex-col gap-2">
            {dashNavData?.map((item, index) => (
              <Link key={index} href={item?.href} className="hover:bg-gray-700 py-2 px-[26px] transition duration-300 text-nowrap text-[16px] flex items-center gap-6 ">
              {item?.icon}  {item?.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className="w-full min-h-screen ml-[200px]">{children}</div>
      </main>
    </SuperAdminContext>
  );
};



export default Layout;
