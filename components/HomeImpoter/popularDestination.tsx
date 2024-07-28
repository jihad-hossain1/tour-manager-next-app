import { getCities } from "@/service/query/cityQuery";
import React from "react";
import Link from "next/link";
import Title from "@/components/ui/Title/Title";
import Container from "../ui/container";
import Image from "next/image";
import cityPhoto from '@/public/Images/city/city.jpg'

const PopularDestination = async () => {
  const { data } = await getCities();

  return (
    <Container>
      <Title firstText="Popular" secondText="Tour Destinations" />
      <section className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-3 gap-4">
        {data?.slice(0, 8)?.map((city) => (
          <Link href={`/countries/cities/${city?.slug}`} key={city?.id} >
            <div className="max-w-[300px] relative shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded">
              <div>
                <Image src={city?.photo ? city?.photo : cityPhoto} width={1000} height={300} className="max-w-[300px] h-[180px] rounded" alt="city" />
              </div>
              <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
                <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px] uppercase ">
                  {city?.name}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Container>
  );
};

export default PopularDestination;
