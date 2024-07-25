import PageContainer from '@/components/ui/pageContainer';
import { getTourSpotDetails } from '@/service/query/tourSpotQuery';
import React from 'react'
import Details from './_compo/Details';

const TourSpot = async ({params}) => {
  const { slug } = params as { slug: string }
    const { data } = await getTourSpotDetails(slug);
    return (
        <PageContainer>
            <Details data={data} />
        </PageContainer>
    )
}

export default TourSpot

