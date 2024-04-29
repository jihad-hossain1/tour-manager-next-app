import PageContainer from '@/components/ui/pageContainer';
import { getContinent } from '@/service/query/continentQuery';
import { Card, CardActionArea } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Continentpage = async ({ params }) => {
    const { id } = params;
    const { data } = await getContinent(id);
    const countries = data[0]

    return (
        <PageContainer>
            <div className='py-20 grid grid-cols-2 lg:grid-cols-4 gap-4'>

                {
                    countries?.map((item, _i) => (
                        <Link key={_i} href={`/tour-place/single-tour-place/${item?.id}`}>
                            <Card className=" h-96 relative overflow-hidden">
                                {/* <Image width={300} height={300} alt="continent image" src={item?.photo} /> */}
                                <h4>{item?.name}</h4>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </PageContainer>
    )
}

export default Continentpage