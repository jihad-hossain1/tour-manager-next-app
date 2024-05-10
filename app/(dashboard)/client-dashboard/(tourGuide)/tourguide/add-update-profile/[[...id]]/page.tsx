import PageContainer from "@/components/ui/pageContainer";
import React from "react";
import ProfileForm from "../_compo/ProfileForm";
import { getCities } from "@/service/query/cityQuery";
import { getCountries } from "@/service/query/countryQuery";
import { getTourGuideProfile } from "@/service/query/tourGuideQuery";

const TourGuideAddUpdateProfilePage = async ({ params }) => {
  const id = params?.id;
  const { data: cities } = await getCities();
  const { data: countries } = await getCountries();

  let initialData;

  if (id) {
    const data = await getTourGuideProfile(id[0]);
    initialData = data;
    // console.log(data);
  }

  console.log(initialData);
  return (
    <PageContainer>
      <ProfileForm
        id={id}
        cities={cities}
        countries={countries}
        tourGuideProfile={initialData}
      />
    </PageContainer>
  );
};

export default TourGuideAddUpdateProfilePage;
