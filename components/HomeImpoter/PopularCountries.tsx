import { getCountries } from "@/service/query/countryQuery";
import React from "react";
import Container from "../ui/container";
import Title from "../ui/Title/Title";
import Link from "next/link";
import Image from "next/image";

const PopularCountries = async () => {
  const data  = await getCountries();
  return (
    <Container>
      <div className="mt-6 md:mt-10  px-2">
        <Title firstText="Popular Tour" secondText="Countries" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.data?.slice(0, 8)?.map((country, _i) => (
            <Link href={`/countries/${country?.slug}`} key={_i} className="max-w-[300px] relative">
              <div>
                <Image
                  width={1000}
                  height={300}
                  alt="continent image"
                  src={country?.photo}
                  className="w-[300px] object-cover"
                />
              </div>
              <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
                      <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
                        {country?.name}
                      </h4>
                    </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularCountries;
