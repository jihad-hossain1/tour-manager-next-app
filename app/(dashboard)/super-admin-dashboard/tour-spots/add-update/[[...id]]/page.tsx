import { getCities } from "@/service/query/cityQuery";
import { getCountries } from "@/service/query/countryQuery";
import { getDivisions } from "@/service/query/divisionQuery";
import React from "react";
import TourSpotForm from "../_compo/_form/tourSpotForm";
import PageContainer from "@/components/ui/pageContainer";
import { getTourSpot } from "@/service/query/tourSpotQuery";

const AddUpdatepage = async ({ params }) => {
  const id = params.id;

  const { data: countries } = await getCountries();
  const { data: cities } = await getCities();
  const { data: divisions } = await getDivisions();

  let initialData;
  if (id) {
    const { data: tourSpot } = await getTourSpot(id[0]);
    initialData = tourSpot;
  }

  return (
    <PageContainer>
      <TourSpotForm
        id={id}
        countries={countries}
        divisions={divisions}
        cities={cities}
        tourSpot={initialData}
      />
    </PageContainer>
  );
};

export default AddUpdatepage;
