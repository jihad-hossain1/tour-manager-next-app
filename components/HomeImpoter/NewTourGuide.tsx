'use client'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Title from '../ui/Title/Title';
import Container from '../ui/container';
import React from 'react';
import { getTourGuides, TTGuideResponse } from '@/service/query/tourGuideQuery';
import Link from 'next/link';

const NewTourGuides = () => {
    const [loading, setLoading] = React.useState(true)
    const [tourGuides, setTourGuides] = React.useState([]);

    React.useEffect(() => {
        const fetchTourGuides = async () => {
            try {
                setLoading(true);
                const res = await getTourGuides() as unknown as [TTGuideResponse]
                setLoading(false)
                // console.log(res)
                setTourGuides(res);
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        };
        fetchTourGuides();
    }, [])
    return (
        <Container>
            <Title firstText="New" secondText="Tour Guides" />
            {loading ? <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    [...Array(8)].map((_, index) => <div className="h-[200px] w-[300px] bg-slate-200 animate-pulse" key={index} />)
                }
            </div> :
                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {tourGuides?.slice()?.reverse()?.slice(0, 8)?.map((guides, index) => (<Card key={index} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <Link href={`/tour-guide/${guides?.slug}`} >
                            <CardMedia
                                component="img"
                                className='h-52'
                                image={guides?.clientInfo?.image ? guides?.clientInfo?.image : "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1704075698/images/ji7dcjbb3uglsqfmfkd8.jpg"}
                                alt="green iguana"
                            />
                            </Link>
                            <CardContent>
                                <Typography gutterBottom variant='h6' component="div" className='text-xl font-medium mb-2 '>
                                    {guides?.clientInfo?.name}
                                </Typography>
                                <Typography gutterBottom variant="h4" component="span" className='inline-block bg-gray-200 bg-opacity-70 text-gray-600 rounded px-3 py-1 text-xs mr-2' >
                                    {guides?.city?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {guides?.about?.length > 200
                                        ? `${guides?.about?.slice(0, 200)}...`
                                        : guides?.about}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>))}
                </div>

            }
        </Container>
    );
};

export default NewTourGuides;