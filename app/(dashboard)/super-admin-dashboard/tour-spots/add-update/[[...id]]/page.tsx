import { getCities } from "@/service/query/cityQuery";
import { getCountries } from "@/service/query/countryQuery";
import { getDivisions } from "@/service/query/divisionQuery";
import React from "react";
import TourSpotForm from "../_compo/_form/tourSpotForm";
import PageContainer from "@/components/ui/pageContainer";

const AddUpdatepage = async ({ params }) => {
  const id = params.id;
  const { data: countries } = await getCountries();
  const { data: cities } = await getCities();
  const { data: divisions } = await getDivisions();

  return (
    <PageContainer>
      <TourSpotForm
        id={id}
        countries={countries}
        divisions={divisions}
        cities={cities}
      />
    </PageContainer>
  );
};

export default AddUpdatepage;
