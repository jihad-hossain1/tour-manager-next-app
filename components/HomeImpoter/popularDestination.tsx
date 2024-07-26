import { getCities } from "@/service/query/cityQuery";
import React from "react";
import { Card } from "@mui/material";
import Link from "next/link";
import Title from "@/components/ui/Title/Title";
import Container from "../ui/container";
import Image from "next/image";

const PopularDestination = async () => {
  const { data } = await getCities();

  return (
    <Container>
      <Title firstText="Popular" secondText="Tour Destinations" />
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.slice(0, 8)?.map((city) => (
          <Link href={`/countries/cities/${city?.id}`} key={city?.id} className="max-w-[300px] relative">
            <div>
              <Image src={city?.photo} width={1000} height={300} className="w-[300px]" alt="city" />
            </div>
            <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
              <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
                {city?.name}
              </h4>
            </div>
          </Link>
        ))}
      </section>
    </Container>
  );
};

export default PopularDestination;
