import Table from "@/components/ui/table/table";
import { getCities } from "@/service/query/cityQuery";
import React from "react";

const Citiespage = async () => {
  const { data: cities } = await getCities();

  const tableHeadValue = [
    { tableName: "No." },
    { tableName: "Name" },
    { tableName: "Division Id" },
    { tableName: "Action" },
  ];
  const tableRow = [
    { tableName: "name" },
    { tableName: "divisionId" },
    { tableName: "Action" },
  ];

  const createLink = "/super-admin-dashboard/locations/city-add-update";
  const updateLink = "/super-admin-dashboard/locations/city-add-update";
  return (
    <>
      <div>
        <Table
          title={"Cities"}
          datas={cities}
          tableHeadValue={tableHeadValue}
          loading={false}
          tableRow={tableRow}
          updateLink={updateLink}
          createLink={createLink}
        />
      </div>
    </>
  );
};

export default Citiespage;
