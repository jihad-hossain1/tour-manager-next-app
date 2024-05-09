"use client";

import Information from "@/components/auth/Information";
import UnAuthenticate from "@/components/auth/UnAuthenticate";
import UnAuthorized from "@/components/auth/UnAuthorized";
import LoadingDiv from "@/components/loading/LoadingDiv";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClientContext = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const clientRole = session?.user?.role == "client";
  const adminRole = session?.user?.role == "admin";
  const userRole = session?.user?.role == "user";
  const clientType = session?.user?.type == "TourGuide";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client-login");
    }
  }, [router, status]);

  if (userRole || adminRole) {
    return <UnAuthorized path={"/"} />;
  }
  if (status === "loading") {
    return <LoadingDiv />;
  }
  if (status === "unauthenticated") {
    return <UnAuthenticate path={"/client-login"} />;
  }

  if (clientRole) {
    if (clientType) {
      return <>{children}</>;
    } else {
      return <Information />;
    }
  }
};

export default ClientContext;
