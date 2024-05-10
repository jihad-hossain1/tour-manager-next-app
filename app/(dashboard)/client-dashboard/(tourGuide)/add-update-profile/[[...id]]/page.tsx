import PageContainer from "@/components/ui/pageContainer";
import React from "react";
import ProfileForm from "../_compo/ProfileForm";
import { getCities } from "@/service/query/cityQuery";
import { getCountries } from "@/service/query/countryQuery";

const TourGuideAddUpdateProfilePage = async ({ params }) => {
  const id = params?.id;
  const { data: cities } = await getCities();
  const { data: countries } = await getCountries();

  return (
    <PageContainer>
      <ProfileForm id={id} cities={cities} countries={countries} />
    </PageContainer>
  );
};

export default TourGuideAddUpdateProfilePage;
