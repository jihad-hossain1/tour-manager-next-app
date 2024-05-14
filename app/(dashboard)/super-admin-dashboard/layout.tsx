import SuperAdminContext from "@/config/superAdminContext";
import { dashNavData } from "@/constat";
import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <SuperAdminContext>
      <main className="flex gap-2">
        <aside className="bg-slate-50 p-2 shadow-sm border-l border-blue-300 dark">
          <div className="flex flex-col gap-2">
            {dashNavData?.map((item, index) => (
              <Link key={index} href={item?.href} className="link text-nowrap">
                {item?.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className="w-full dark">{children}</div>
      </main>
    </SuperAdminContext>
  );
};



export default Layout;
