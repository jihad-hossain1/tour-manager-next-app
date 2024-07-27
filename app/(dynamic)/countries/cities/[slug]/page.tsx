"use client";

import { getCityWithTourSpots } from "@/service/query/cityQuery";
import Image from "next/image";
import React, { useEffect } from "react";
import tourImage from "@/public/Images/tourspot/spot.webp";
import cityImage from "@/public/Images/city/city.jpg"
import Link from "next/link";

const Cities = ({ params }) => {
  const [cityInfo, setCityInfo] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function fetchCityInfo() {
      try {
        setLoading(true);
        const response = await getCityWithTourSpots(params.slug);
        setLoading(false);
        setCityInfo(response?.getCityWithTourSpots);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchCityInfo();
  }, [params.slug]);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <Image
          src={cityInfo?.photo ? cityInfo?.photo : cityImage}
          alt="city photo"
          width={1000}
          height={400}
          className="w-full h-[600px] max-sm:h-[400px]"
        />
        <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="text-center bg-black opacity-60 text-white flex flex-col gap-4 justify-center items-center p-12 max-sm:p-5 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold lg:text-4xl uppercase">
              {cityInfo?.name}
            </h4>
            <p className="text-sm">{cityInfo?.description}</p>
          </div>
        </div>
      </div>
      <section className="py-10 px-3 container mx-auto">
        {cityInfo?.totalTourSpots?.length > 0 ? (
          <div className="grid max-sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cityInfo?.totalTourSpots?.map((tourSpot, index: number) => (
                <div key={index} className="bg-white w-fit shadow group">
                  <div className="relative flex flex-col gap-2 max-sm:gap-1 border">
                    <Link href={`/tour-place/${tourSpot?.slug}`}>
                      <Image
                        alt="tour spot"
                        height={200}
                        width={1000}
                        className="w-[350px]"
                        src={tourSpot?.photo ? tourSpot?.photo : tourImage}
                      />
                    </Link>
                    <div className="p-2">
                      <h4 className="lg:font-semibold max-sm:text-sm">
                        {tourSpot?.name?.length > 35
                          ? `${tourSpot?.name?.slice(0, 35)}...`
                          : tourSpot?.name}
                      </h4>
                    </div>
                    <div className="lg:group-hover:block absolute hidden z-10 bottom-0 w-full bg-blue-600 py-3 text-white text-center group-hover:transition duration-500">
                      <Link href={`/tour-place/${tourSpot?.slug}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h4 className="text-2xl font-bold">No Tour Spots Found.</h4>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cities;
