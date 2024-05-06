import PageContainer from "@/components/ui/pageContainer";
import { getCountries } from "@/service/query/countryQuery";
import React from "react";
import DivisionForm from "../_compo/DivisionForm";

const AddUpadtePage = async ({ params }) => {
  const id = params.id;

  const countries = await getCountries();

  return (
    <PageContainer>
      <DivisionForm countries={countries?.data} id={id} />
    </PageContainer>
  );
};

export default AddUpadtePage;
