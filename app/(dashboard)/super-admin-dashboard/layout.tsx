"use client";

import PageContainer from "@/components/ui/pageContainer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  const { data } = useSession();
  const clientRole = data?.user?.role == "client";
  const adminRole = data?.user?.role == "admin";

  return (
    <main className="flex gap-2">
      <aside className="bg-slate-50 p-2 shadow-sm border-l border-blue-300">
        <div className="flex flex-col gap-2">
          {clientRole && (
            <>
              <Link href="/client-dashboard" className="link">
                Dashboard Home
              </Link>
            </>
          )}
          {adminRole && (
            <>
              <Link href="/super-admin-dashboard" className="link">
                Dashboard Home
              </Link>
              <Link href="/super-admin-dashboard/locations" className="link">
                Locations
              </Link>
            </>
          )}
        </div>
      </aside>
      <div>{children}</div>
    </main>
  );
};

export default Layout;
