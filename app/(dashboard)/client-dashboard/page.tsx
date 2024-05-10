import PageContainer from "@/components/ui/pageContainer";
import Link from "next/link";
import React from "react";

const ClientDashboarpage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Link href={"/client-dashboard/tourguide"} className="link">
          Tour Guide
        </Link>
      </div>
    </PageContainer>
  );
};

export default ClientDashboarpage;
