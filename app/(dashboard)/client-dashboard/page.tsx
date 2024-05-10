import PageContainer from "@/components/ui/pageContainer";
import Link from "next/link";
import React from "react";

const ClientDashboarpage = () => {
  return (
    <PageContainer>
      <Link href={"/client-dashboard/add-update-profile"} className="link">
        Add Profile Info.
      </Link>
    </PageContainer>
  );
};

export default ClientDashboarpage;
