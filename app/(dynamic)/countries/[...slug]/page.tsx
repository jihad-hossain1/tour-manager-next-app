import PageContainer from "@/components/ui/pageContainer";
import React from "react";

const Countries = ({ params }: {params: {slug: string[]}}) => {

  return <PageContainer>Countries id: {params.slug[0]}</PageContainer>;
};

export default Countries;
