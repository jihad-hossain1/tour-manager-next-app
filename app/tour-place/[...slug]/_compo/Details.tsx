'use client'

import TourSpotReviewsSection from '@/components/tourSpots/TourSpotReviewsSection';
import BackButton from '@/components/ui/BackButton';
import Image from 'next/image';
import React from 'react'
import { SiGooglemaps } from 'react-icons/si'
import './styles.css'
import tourSpotImage from '@/public/Images/tourspot/spot.webp'

const Details = ({ data }) => {
    return (
        <React.Fragment>
            <div className='my-2 flex justify-end lg:justify-start'>
                <BackButton />
            </div>
            <section className="grid grid-cols-1 xl:flex gap-5 lg:gap-10">
                <main className="relative flex-1 break-inside-auto">
                    {/* tour details section */}
                    <div className='flex flex-col gap-2 lg:gap-4'>
                        <Image
                            height={300}
                            width={1000}
                            src={data?.photo ? data?.photo : tourSpotImage}
                            className="rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.25)] w-full h-full"
                            alt="Tour spot image"
                        />
                        <div className="w-fit lg:my-6 flex items-center gap-2 bg-zinc-200 rounded-md shadow-sm px-2">
                            <p>{data?.city?.name}</p>
                            <SiGooglemaps className="text-gray-600" />
                        </div>
                        <h4 className="font-semibold text-xl md:text-3xl  ">
                            {data?.name}
                        </h4>
                        
                        <div id='details' dangerouslySetInnerHTML={{ __html: data?.description }} />
                    </div>
                    {/* review section  */}
                    <TourSpotReviewsSection
                        reviews={data?.reviews}
                        id={data?.id}
                    />
                </main>
                <aside className="sticky-custome top-20 bg-zinc-100/30 rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.25)] max-lg:w-full min-w-[330px] mx-auto min-h-[100px] max-h-[650px]">
                    {/* new tour place section */}
                    {/* <NewToursPlace /> */}
                </aside>
            </section>
        </React.Fragment>
    )
}

export default Details
