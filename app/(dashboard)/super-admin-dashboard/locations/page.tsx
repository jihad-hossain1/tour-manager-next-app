/* eslint-disable react/no-children-prop */

import PageContainer from "@/components/ui/pageContainer";
import React from "react";
import { getCountries } from "@/service/query/countryQuery";
import { getCities } from "@/service/query/cityQuery";
import { getDivisions } from "@/service/query/divisionQuery";
import { TbWorld, TbWorldCog } from "react-icons/tb";
import { MdTour } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { getAllContinents } from "@/service/query/continentQuery";

const LocationPage = async () => {
  const { data } = await getCountries();
  const { data: cities } = await getCities();
  const { data: divisions } = await getDivisions();
  const { data: continents } = await getAllContinents();

  return (
    <PageContainer>
      <main className="my-10">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          <Card
            title="Total Countries"
            subtitle={data?.length || 0}
            href="/super-admin-dashboard/locations/countries"
            Icon={TbWorld}
          />
          <Card
            title="Total Cities"
            subtitle={cities?.length || 0}
            href="/super-admin-dashboard/locations/cities"
            Icon={TbWorldCog}
          />

          <Card
            title="Total Division"
            subtitle={divisions?.length || 0}
            href="/super-admin-dashboard/locations/divisions"
            Icon={MdAccountBalance}
          />
          <Card
            title="Total Continets"
            subtitle={continents?.length || 0}
            href="/super-admin-dashboard/locations/continets"
            Icon={MdTour}
          />
        </div>
      </main>
    </PageContainer>
  );
};
const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white dark"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 dark" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-5xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300 dark">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200  z-0 duration-300 text-3xl relative">
        {subtitle}
      </p>
    </a>
  );
};
export default LocationPage;
