'use client'

import TourSpotReviewsSection from '@/components/tourSpots/TourSpotReviewsSection';
import BackButton from '@/components/ui/BackButton';
import Image from 'next/image';
import React from 'react'
import { SiGooglemaps } from 'react-icons/si'

const Details = ({ data }) => {
    
    return (
        <>
        <div className='my-2'>
          <BackButton />
        </div>
         <div className="my-10">
            <section className="grid grid-cols-1 lg:flex gap-5 lg:gap-10">
                <main className="relative">
                    {/* tour details section */}
                    <div className='flex flex-col gap-4'>
                        <Image
                            height={300}
                            width={1000}
                            src={data?.photo || ''}
                            className="object-cover rounded-lg shadow-[2px_4px_15px_rgba(0,0,0,0.25)] w-full h-[400px]"
                            alt="Tour spot image"
                        />
                        <div className="w-fit my-6 flex items-center gap-2 bg-zinc-200 rounded-md shadow-sm px-2">
                            <p>{data?.city?.name}</p>
                            <SiGooglemaps className="text-gray-600" />
                        </div>
                        <h4 className="font-semibold text-xl md:text-3xl">
                            {data?.name}
                        </h4>
                        <p className="text_under">
                            <span className="c_underline">Tour Description: </span>

                        </p>
                        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>

                    </div>
                    {/* review section  */}
                    <TourSpotReviewsSection
                        reviews={data?.reviews}
                        id={data?.id}
                    />
                </main>
                <aside className="sticky top-20  bg-zinc-100/30 rounded-md shadow-[2px_5px_7px_rgba(0,0,0,0.25)] min-w-[392px] h-fit mx-auto ">
                    {/* new tour place section  */}
                    {/* <NewToursPlace /> */}
                </aside>
            </section>
            {/* RelatedTourSpots section  */}
            <hr className="h-[1px bg-gray-500]" />
        </div>
        </>
    )
}

export default Details