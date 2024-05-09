import Table from "@/components/ui/table/table";
import { getAllTourSpots } from "@/service/query/tourSpotQuery";
import React from "react";

const TourSpotpage = async () => {
  const { data: tourSpots } = await getAllTourSpots();
  const createLink = "/super-admin-dashboard/tour-spots/add-update";
  const updateLink = "/super-admin-dashboard/tour-spots/add-update";
  const tableHeadValue = [
    { tableName: "No." },
    // { tableName: "Image" },
    { tableName: "Name" },
    { tableName: "Action" },
  ];
  const tableRow = [
    // { tableName: "photo" },
    { tableName: "name" },
    { tableName: "Action" },
  ];

  return (
    <div>
      <Table
        datas={tourSpots}
        tableHeadValue={tableHeadValue}
        loading={false}
        tableRow={tableRow}
        createLink={createLink}
        updateLink={updateLink}
        title={"Tour Spots"}
      />
    </div>
  );
};

export default TourSpotpage;
