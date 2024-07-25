'use client'

import PageContainer from "@/components/ui/pageContainer";
import { getPaginatatedTourSpots } from "@/service/query/tourSpotQuery";
import React, { useEffect, useState } from "react";
import tourImage from '@/public/Images/tourspot/spot.webp'
import Image from "next/image";
import Link from "next/link";

const TourPlacepage = () => {
  const [tourSpots, setTourSpots] = useState([]);
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchTourSpots() {
      try {
        setLoading(true)
        const response = await getPaginatatedTourSpots(search, limit, page);
        setLoading(false)
        if (response?.data) {
          setTourSpots(response?.data)
        }
      } catch (error) {
        console.error(error?.message)
      }
    }
    fetchTourSpots()
  }, [search,limit,page])

  return (
    <div className=" bg-slate-100 min-h-screen">
      <div className=" px-2 container mx-auto">
        <h4 className="text-3xl text-center py-10">Tour Place</h4>
    <div>
      <input className="border p-2 w-1/3 " type="search" name="" onChange={(e)=>setSearch(e.target.value)} value={search} id="" />
    </div>
        {
          !loading && tourSpots?.length > 0 && <div className="grid lg:grid-cols-4 gap-3 ">
            {
              tourSpots?.map((tourSpot, index) => <div key={index} className=" bg-white w-fit shadow group">
                <div className="relative flex flex-col gap-2 border">
                <Image alt="tour spot" height={200} width={1000} className="w-[300px]" src={tourSpot?.photo ? tourSpot?.photo : tourImage} />
                <div className="p-2">
                <h4 className="font-semibold">
                  {
                    tourSpot?.name?.length > 35 ? `${tourSpot?.name?.slice(0,35)}...` : tourSpot?.name
                  }
                </h4>
                
                </div>
                <div className="group-hover:block absolute hidden z-10 bottom-0 w-full bg-blue-600 py-3 text-white text-center group-hover:transition duration-500 ">
                  <Link className="" href={`/tour-place/${tourSpot?.slug}`}>Read More</Link>
                </div>
                </div>
              </div>)
            }
          </div>
        }
      </div>
    </div>
  );
};

export default TourPlacepage;
