import TourSpotReviewsSection from '@/components/tourSpots/TourSpotReviewsSection';
import PageContainer from '@/components/ui/pageContainer';
import { getTourSpotDetails } from '@/service/query/tourSpotQuery';
import Image from 'next/image';
import React from 'react'
import { SiGooglemaps } from 'react-icons/si'

const TourSpot = async ({params}) => {
  const { slug } = params as { slug: string }
    const { data } = await getTourSpotDetails(slug);
    return (
        <PageContainer>
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
        </PageContainer>
    )
}

export default TourSpot


// import NoData from "@/components/ui/NoData";
// import PageContainer from "@/components/ui/pageContainer";
// import { getContinent } from "@/service/query/continentQuery";
// import { Card } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Continentpage = async ({ params }) => {
//     const { id } = params;
//     const { data } = await getContinent(id);
//     const countries = data[0];

//     return (
//       <PageContainer>
//         <div className="py-20">
//           {countries?.length > 0 ? (
//             <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {countries?.map((item, _i) => (
//                 <Link
//                   key={_i}
//                   href={`/tour-place/single-tour-place/${item?.id}=${id}`}
//                 >
//                   <Card className=" h-96 relative overflow-hidden">
//                     {/* <Image width={300} height={300} alt="continent image" src={item?.photo} /> */}
//                     <h4>{item?.name}</h4>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <NoData title="No Tour Spot Found" LinkUrl="/tour-place" />
//           )}
//         </div>
//       </PageContainer>
//     );
// };

// export default Continentpage;
