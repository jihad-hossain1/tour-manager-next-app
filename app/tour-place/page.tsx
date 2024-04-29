import SingleContinent from "@/components/SingleComponents/SingleContinent";
import Title from "@/components/ui/Title/Title";
import PageContainer from "@/components/ui/pageContainer";
import { getAllContinents } from "@/service/query/continentQuery";
import React from "react";

const TourPlacepage = async () => {
  const { data } = await getAllContinents();

  return <PageContainer><div className="mt-6 md:mt-10  px-2">
    <Title firstText="Tour By" secondText="Continents" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.map((continent, _i) => (
        <SingleContinent key={_i} index={_i} continent={continent} />
      ))}
    </div>
  </div></PageContainer>;
};

export default TourPlacepage;
