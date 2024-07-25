import ClientContext from "@/config/clientContext";
import Link from "next/link";
import React from "react";
import { FaHome, FaHouseDamage, FaUser } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <ClientContext>
      <main className="flex gap-2 ">
        <aside className="bg-slate-50  p-2 shadow-sm border-l  border-blue-300 ">
          <div className="flex flex-col gap-2 text-nowrap text-[20px]">
            <Link
              href={"/client-dashboard/tourguide"}
              className="link flex items-center gap-2"
            >
              <FaUser /> Profile
            </Link>
            <Link
              href="/client-dashboard"
              className="link flex gap-2 items-center"
            >
              <FaHome /> Home
            </Link>
            <Link href="/" className="link flex items-center gap-2">
              <FaHouseDamage /> Go home
            </Link>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </main>
    </ClientContext>
  );
};

export default Layout;
