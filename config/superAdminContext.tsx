"use client";

import UnAuthenticate from "@/components/auth/UnAuthenticate";
import UnAuthorized from "@/components/auth/UnAuthorized";
import LoadingDiv from "@/components/loading/LoadingDiv";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuperAdminContext = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const clientRole = session?.user?.role == "client";
  const adminRole = session?.user?.role == "admin";
  const userRole = session?.user?.role == "user";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (userRole || clientRole) {
    return <UnAuthorized path={"/"} />;
  }
  if (status === "loading") {
    return <LoadingDiv />;
  }
  if (status === "unauthenticated") {
    return <UnAuthenticate path={"/"} />;
  }
  if (adminRole) {
    return <>{children}</>;
  }
};

export default SuperAdminContext;
