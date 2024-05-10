import ClientContext from "@/config/clientContext";
import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <ClientContext>
      <main className="flex gap-2 dark:bg-gray-800 dark:text-white">
        <aside className="bg-slate-50 dark:bg-gray-800 dark:text-white p-2 shadow-sm border-l dark:border-r border-blue-300 dark:border-gray-950">
          <div className="flex flex-col gap-2">
            <Link href="/client-dashboard" className="link">
              Dashboard Home
            </Link>
            <Link href="/" className="link">
              home
            </Link>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </main>
    </ClientContext>
  );
};

export default Layout;
