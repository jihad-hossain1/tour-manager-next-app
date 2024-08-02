import { getCountryWithTourSpot } from "@/service/query/countryQuery";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Countries = async ({ params }: {params: {slug: string[]}}) => {
  const data = await getCountryWithTourSpot(params.slug[0]);
  
  let countryInfo:any ;
  if(data){
    countryInfo = data?.data
  }

  return <>
     <div className="relative">
        <Image
          src={countryInfo?.photo ? countryInfo?.photo : 'https://res.cloudinary.com/dqfi9zw3e/image/upload/v1721961491/images_preset/dyoees5dmsqwmnard5y5.jpg'}
          alt="city photo"
          width={1000}
          height={400}
          className="w-full h-[400px] object-cover max-sm:h-[350px]"
        />
        <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="text-center bg-black opacity-60 text-white flex flex-col gap-4 justify-center items-center p-12 max-sm:p-5 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold lg:text-4xl uppercase">
              {countryInfo?.name}
            </h4>
            <p className="text-sm">{countryInfo?.description}</p>
          </div>
        </div>
      </div>

      <section className="py-10 px-3 container mx-auto">
        {countryInfo?.touristSpots?.length > 0 ? (
          <div className="grid max-sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {countryInfo?.touristSpots?.map((tourSpot, index: number) => (
                <div key={index} className="bg-white w-fit shadow group">
                  <div className="relative flex flex-col gap-2 max-sm:gap-1 border">
                    <Link href={`/tour-place/${tourSpot?.country?.name}/${tourSpot?.division?.name}/${tourSpot?.city?.name}/${tourSpot?.slug}`}>
                      <Image
                        alt="tour spot"
                        height={200}
                        width={1000}
                        className="w-[350px]"
                        src={tourSpot?.photo ? tourSpot?.photo : 'https://res.cloudinary.com/dqfi9zw3e/image/upload/v1721961491/images_preset/dyoees5dmsqwmnard5y5.jpg'}
                      />
                    </Link>
                    <div className="p-2">
                      <h4 className="lg:font-semibold max-sm:text-sm">
                        {tourSpot?.name?.length > 35
                          ? `${tourSpot?.name?.slice(0, 35)}...`
                          : tourSpot?.name}
                      </h4>
                    </div>
                    <Link href={`/tour-place/${tourSpot?.country?.name}/${tourSpot?.division?.name}/${tourSpot?.city?.name}/${tourSpot?.slug}`}>
                    <div className="lg:group-hover:block absolute hidden z-10 bottom-0 w-full bg-blue-600 py-3 text-white text-center group-hover:transition duration-500">
                        Read More
                    </div>
                    </Link>
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
  </>;
};

export default Countries;
