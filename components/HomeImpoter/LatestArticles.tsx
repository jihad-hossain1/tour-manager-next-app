import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import Divider from '@mui/material/Divider';
import { latestArticles } from '../AllDemoDataImporter/AllDemoDataImporter';
import Title from '../ui/Title/Title';
import Container from '../ui/container';



const LatestArticles = () => {
    return (
        <Container>
            <Title firstText="Latest" secondText="Articles" />
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {latestArticles.map((tourSpot, index) => (<Card key={index} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className='h-52'
                            image={tourSpot?.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h6' component="div" className='text-xl font-medium mb-2 '>
                                {tourSpot?.title.length > 20 ? `${tourSpot.title.slice(0, 39)} ...` : tourSpot?.title}
                            </Typography>
                            <div className='space-x-5'>
                                <Typography gutterBottom variant="h4" component="span" className='inline-block bg-gray-200 bg-opacity-70 text-gray-600 rounded px-3 py-1 text-xs mr-2' >
                                    {tourSpot?.city}
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary" className='my-10'>
                                {tourSpot?.description.length > 100 ? `${tourSpot.description.slice(0, 100)}...` : tourSpot?.description}
                            </Typography>

                        </CardContent>
                        <Divider light />
                        <CardActions className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <span className='text-blue-500 text-lg font-base'>Travis Howard</span>
                            </div>
                            <span className='text-gray-700 text-xs font-semibold opacity-70'>Dec 27, 2023</span>
                        </CardActions>
                    </CardActionArea>
                </Card>))}
            </div>
            <div className='text-center my-10'>
                <button className='text-gray-500 border border-gray-500 p-3 text-sm hover:text-gray-900 font-semibold rounded inherit'>View More New Articles</button>
            </div>
        </Container>
    );
};

export default LatestArticles;