import { options } from "@/app/api/auth/[...nextauth]/options";
import PageContainer from "@/components/ui/pageContainer";
import {
  getGuidePlace,
  getTourGuideInfoShort,
} from "@/service/query/tourGuideQuery";
import { getServerSession } from "next-auth/next";
import React from "react";
import Form from "../_compo/Form";
import { getTourSpotByCountryId } from "@/service/query/tourSpotQuery";

const AUTourPlacepage = async ({ params }) => {
  // get client id from session
  const session = await getServerSession(options);
  const clientId = session?.user?.clientId;
  const id = params?.id;

  // get tour guide profile
  const { data: clientProfile } = await getTourGuideInfoShort(clientId);
  const countryId = clientProfile?.countryId;

  // get tourspots by countryid
  const { data: tourSpots } = await getTourSpotByCountryId(countryId);

  // set initial value for dynamic form with update tour place
  let initial;
  if (id) {
    const data = await getGuidePlace(id[0]);
    initial = data;
  }
  console.log("🚀 ~ AUTourPlacepage ~ initial:", initial);
  return (
    <PageContainer>
      <Form
        id={id}
        profile={clientProfile}
        tourSpots={tourSpots[0]}
        guidePlaceData={initial}
      />
    </PageContainer>
  );
};


export default AUTourPlacepage;
