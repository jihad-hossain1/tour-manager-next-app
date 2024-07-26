import PageContainer from "@/components/ui/pageContainer";
import React from "react";

const Cities = ({ params }) => {
  return <PageContainer>Cities slug: {params.slug}</PageContainer>;
};

export default Cities;
