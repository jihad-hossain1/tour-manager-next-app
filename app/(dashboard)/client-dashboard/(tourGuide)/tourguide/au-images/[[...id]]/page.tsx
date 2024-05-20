import { options } from "@/app/api/auth/[...nextauth]/options";
import PageContainer from "@/components/ui/pageContainer";
import {
  getGuideContributions,
  getTourGuideInfoShort,
} from "@/service/query/tourGuideQuery";
import { getServerSession } from "next-auth/next";
import React from "react";
import Form from "../_comp/Form";

const AUImagepage = async ({ params }) => {
  // get client id from session
  const session = await getServerSession(options);
  const clientId = session?.user?.clientId;
  const id = params?.id;

  // get tour guide profile
  const { data: clientProfile } = await getTourGuideInfoShort(clientId);

  const clientProfileID = clientProfile?.id;

  const data = await getGuideContributions(clientProfileID);

  return (
    <PageContainer>
      <Form
        id={id}
        clientId={clientId}
        clientProfileID={clientProfileID}
        guideContribution={data}
      />
    </PageContainer>
  );
};

export default AUImagepage;
