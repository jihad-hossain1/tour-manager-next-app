import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";

const Table = ({
  datas,
  tableHeadValue,
  loading,
  tableRow,
  createLink,
  updateLink,
  title,
}) => {
  return (
    <div className="my-20">
      <div>
        <h4 className="text-center text-2xl font-bold">{title}</h4>
      </div>
      <table className="min-w-[90%] mx-auto my-6 border shadow">
        <caption className="text-right p-4 border border-gray-300 bg-gray-100">
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            href={createLink}
          >
            Create New
          </Link>
        </caption>
        <thead>
          <tr className="font-lg text-[16px] leading-[24px] uppercase text-blue-400">
            {tableHeadValue?.map((row) => (
              <th
                key={row?.tableName}
                className="py-3 px-6 text-left text-sm md:text-lg text-nowrap w-[39px]"
              >
                {row?.tableName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {datas?.map((item: any, ind: number) => (
            <tr key={ind} className="hover:bg-gray-50 transition duration-300">
              <td className="py-4 px-6  mx-auto text-start">{ind + 1}</td>
              {tableRow?.map((row: any, index: number) => (
                <td key={index} className="py-4 px-6  mx-auto text-start">
                  {row?.tableName == "photo" ? (
                    <>
                      {/* <Image
                        src={item[row?.tableName]}
                        height={300}
                        width={300}
                        alt="image"
                        className="h-20 w-20 rounded-md border p-2"
                      /> */}
                    </>
                  ) : (
                    <td>{item[row?.tableName]}</td>
                  )}
                  {row?.tableName == "Action" && (
                    <td className="flex rounded-md gap-2">
                      <Link href={`${updateLink}/${item?.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 hover:text-gray-50 text-white rounded-full p-2 duration-300">
                          <MdEdit />
                        </button>
                      </Link>
                    </td>
                  )}
                </td>
              ))}
            </tr>
          ))}

          {!loading && datas?.length === 0 && (
            <div className="flex justify-center items-center min-h-[60vh] bg-white px-4">
              <h1 className="uppercase text-xl md:text-2xl font-semibold text-red ">
                No Data Found
              </h1>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
