import { getCountries } from "@/service/query/countryQuery";
import React from "react";
import Container from "../ui/container";
import Title from "../ui/Title/Title";
import Link from "next/link";
import { Card } from "@mui/material";

const PopularCountries = async () => {
  const { data } = await getCountries();
  return (
    <Container>
      <div className="mt-6 md:mt-10  px-2">
        <Title firstText="Popular Tour" secondText="Countries" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.slice(0, 8).map((country, _i) => (
            <Link href={`/countries/${country?.id}`} key={_i}>
              <Card sx={{ maxWidth: 345 }}>
                <div className="click">
                  <div
                    className="w-full h-[170px] bg-cover bg-center pt-4 relative group"
                    style={{ backgroundImage: `url(${country?.photo})` }}
                  >
                    <div className="click_class_main">
                      <div className="click_class">
                        <span className="viewbtn px-3">Click to view</span>
                        <h1 className="text-white text-3xl mx-auto">
                          {country?.name}
                        </h1>
                      </div>
                    </div>
                    <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
                      <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
                        {country?.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularCountries;
