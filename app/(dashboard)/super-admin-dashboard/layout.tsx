import SuperAdminContext from "@/config/superAdminContext";
import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <SuperAdminContext>
      <main className="flex gap-2">
        <aside className="bg-slate-50 p-2 shadow-sm border-l border-blue-300">
          <div className="flex flex-col gap-2">
            <Link href="/super-admin-dashboard" className="link">
              Dashboard Home
            </Link>
            <Link href="/super-admin-dashboard/locations" className="link">
              Locations
            </Link>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </main>
    </SuperAdminContext>
  );
};

export default Layout;
