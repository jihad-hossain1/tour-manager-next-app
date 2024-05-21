import PageContainer from "@/components/ui/pageContainer";
import React from "react";
import Form from "../_compo/Form";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { getTourGuideInfoShort } from "@/service/query/tourGuideQuery";

const AUProfileImagepage = async ({ params }) => {
  const session = await getServerSession(options);
  const clientId = session?.user?.clientId;

  const clientProfile = await getTourGuideInfoShort(clientId);

  const clientProfileID = clientProfile?.data?.id;

  console.log(clientProfileID);

  const id = params?.id;

  let initialData;

  if (id) {
    initialData = clientProfile?.data?.profileImage;
  }

  return (
    <PageContainer>
      <Form
        id={id}
        clientProfileID={clientProfileID}
        profileImage={initialData}
      />
    </PageContainer>
  );
};

export default AUProfileImagepage;
