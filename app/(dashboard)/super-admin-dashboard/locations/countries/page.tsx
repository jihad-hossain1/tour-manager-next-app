import Table from "@/components/ui/table/table";
import { getCountries } from "@/service/query/countryQuery";
import React from "react";

const Countriespage = async () => {
  const { data: countries } = await getCountries();
  const createLink = "/super-admin-dashboard/locations/country-add-update";
  const updateLink = "/super-admin-dashboard/locations/country-add-update";
  const tableHeadValue = [
    { tableName: "No." },
    { tableName: "Name" },
    { tableName: "Continent Id" },
    { tableName: "Action" },
  ];
  const tableRow = [
    { tableName: "name" },
    { tableName: "continentId" },
    { tableName: "Action" },
  ];
  return (
    <div>
      <Table
        datas={countries}
        tableHeadValue={tableHeadValue}
        loading={false}
        tableRow={tableRow}
        createLink={createLink}
        updateLink={updateLink}
        title={"Countries"}
      />
    </div>
  );
};

export default Countriespage;
