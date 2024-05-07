import Table from "@/components/ui/table/table";
import { getDivisions } from "@/service/query/divisionQuery";
import React from "react";

const Divisionspage = async () => {
  const { data: divisions } = await getDivisions();

  const createLink = "/super-admin-dashboard/locations/division-add-update";
  const updateLink = "/super-admin-dashboard/locations/division-add-update";
  const tableHeadValue = [
    { tableName: "No." },
    { tableName: "Name" },
    { tableName: "Country Id" },
    { tableName: "Action" },
  ];
  const tableRow = [
    { tableName: "name" },
    { tableName: "countryId" },
    { tableName: "Action" },
  ];
  return (
    <div>
      <Table
        createLink={createLink}
        updateLink={updateLink}
        title={"Divisions"}
        datas={divisions}
        tableHeadValue={tableHeadValue}
        loading={false}
        tableRow={tableRow}
      />
    </div>
  );
};

export default Divisionspage;
