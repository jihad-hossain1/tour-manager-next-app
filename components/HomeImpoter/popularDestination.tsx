import { getCities } from "@/service/query/cityQuery";
import React from "react";
import { Card } from "@mui/material";
import Link from "next/link";
import Title from "@/components/ui/Title/Title";
import Container from "../ui/container";

const PopularDestination = async () => {
  const { data } = await getCities();

  return (
    <Container>
      <Title firstText="Popular" secondText="Tour Destinations" />
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.slice(0, 8).map((city) => (
          <Link href={`/countries/cities/${city?.id}`} key={city?.id}>
            <Card>
              <div className="click">
                <div
                  className="w-full h-[170px] bg-cover bg-center pt-4 relative group"
                  style={{ backgroundImage: `url(${city?.photo})` }}
                >
                  <div className="click_class_main">
                    <div className="click_class">
                      <button className="bg-yellow-500 text-white px-[6px] p-[2px] rounded-md">
                        Click to view
                      </button>
                      <h1 className="text-white text-3xl mx-auto">
                        {city.name}
                      </h1>
                    </div>
                  </div>
                  <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
                    <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
                      {city?.name}
                    </h4>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </Container>
  );
};

export default PopularDestination;
