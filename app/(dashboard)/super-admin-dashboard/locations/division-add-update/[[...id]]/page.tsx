import PageContainer from "@/components/ui/pageContainer";
import { getCountries } from "@/service/query/countryQuery";
import React from "react";
import DivisionForm from "../_compo/DivisionForm";
import { getDivision } from "@/service/query/divisionQuery";

const AddUpadtePage = async ({ params }) => {
  const id = params.id;

  const countries = await getCountries();

  let initialData;
  if (id) {
    const response = await getDivision(id[0]);
    initialData = response;
  }

  return (
    <PageContainer>
      <DivisionForm
        countries={countries?.data}
        id={id}
        division={initialData}
      />
    </PageContainer>
  );
};

export default AddUpadtePage;
