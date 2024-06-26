import NoData from "@/components/ui/NoData";
import PageContainer from "@/components/ui/pageContainer";
import { TourSpotType } from "@/helpers/types";
import { getTourSpotByCountryId } from "@/service/query/tourSpotQuery";
import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTourPlacepage = async ({ params }) => {
  const { id } = params;
  const splitId = id?.split("%3D")[0];
  const splitPreviousParamId = id?.split("%3D")[1];
  const { data } = await getTourSpotByCountryId(splitId);
  const tourSpots = data[0];
  return (
    <PageContainer>
      <div className="py-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tourSpots?.length > 0 &&
          tourSpots?.map((item: TourSpotType, _i: number) => (
            <Link
              key={_i}
              href={`/tour-place/single-tour-place/detail/${item?.id}`}
            >
              <Card className=" h-96 relative overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  alt="continent image"
                  src={item?.photo || ""}
                />
                <h4>{item?.name}</h4>
              </Card>
            </Link>
          ))}
      </div>
      <div>
        {tourSpots?.length == 0 && (
          <NoData
            title={"No Tour Place Found."}
            LinkUrl={`/tour-place/${splitPreviousParamId}`}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default SingleTourPlacepage;
