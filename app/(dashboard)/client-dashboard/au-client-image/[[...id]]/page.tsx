import PageContainer from "@/components/ui/pageContainer";
import React from "react";
import Form from "../_comp/form";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

const AUClientImagepage = async ({ params }) => {
  const session = await getServerSession(options);
  const clientId = session?.user?.clientId;

  const id = params?.id;

  return (
    <PageContainer>
      <Form id={id} clientId={clientId} />
    
    </PageContainer>
  );
};

export default AUClientImagepage;
