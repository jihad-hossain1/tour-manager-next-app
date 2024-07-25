import Table from '@/components/ui/table/table';
import { getAllContinents } from '@/service/query/continentQuery';
import React from 'react'

const ContientPage =async () => {
    const { data: continents } = await getAllContinents();
    const createLink = "/super-admin-dashboard/locations/continets/au-continent";
    const updateLink = "/super-admin-dashboard/locations/continets/au-continent";

    const tableHeadValue = [
      { tableName: "No." },
      { tableName: "Name" },
      { tableName: "Code" },
      { tableName: "Action" },
    ];
    
    const tableRow = [
      { tableName: "name" },
      { tableName: "code" },
      { tableName: "Action" },
    ];
    return (
      <div>
        <Table
          datas={continents}
          tableHeadValue={tableHeadValue}
          loading={false}
          tableRow={tableRow}
          createLink={createLink}
          updateLink={updateLink}
          title={"Continent"}
        />
      </div>
    );
  };

export default ContientPage