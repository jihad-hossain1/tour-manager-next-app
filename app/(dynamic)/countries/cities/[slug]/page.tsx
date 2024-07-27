'use client'

import PageContainer from "@/components/ui/pageContainer";
import { getCityWithTourSpots } from "@/service/query/cityQuery";
import Image from "next/image";
import React, { useEffect } from "react";

const Cities = ({ params }) => {
  const [cityInfo, setCityInfo] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  useEffect(()=>{
    async function fetchCityInfo(){
      try {
        setLoading(true)
        const response = await getCityWithTourSpots(params.slug);
        setLoading(false)
        setCityInfo(response?.getCityWithTourSpots)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    fetchCityInfo()
  },[])
  return <div className="relative">
    <div className="">
        <Image src={cityInfo?.photo} alt="city photo" width={1000} height={400} className="w-full h-[400px] max-sm:h-[300px]" />
    </div>
  </div>;
};

export default Cities;
