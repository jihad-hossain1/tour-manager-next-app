import { getTourSpotDetails } from '@/service/query/tourSpotQuery';
import React from 'react'
import Details from './_compo/Details';

const TourSpot = async ({params}: {params: {slug: string[]} }) => {
    const data  = await getTourSpotDetails(params?.slug[3]);
    return (
        <div className='max-w-[1280px] px-4 mx-auto'>
            <Details data={data?.data} />
        </div>
    )
}

export default TourSpot

