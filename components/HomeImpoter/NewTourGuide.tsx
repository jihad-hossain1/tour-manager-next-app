import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Title from '../ui/Title/Title';
import { newTourGuides } from '../AllDemoDataImporter/AllDemoDataImporter';
import Container from '../ui/container';

const NewTourGuides = () => {
    return (
        <Container>
            <Title firstText="New" secondText="Tour Guides" />
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {newTourGuides?.map((guides, index) => (<Card key={index} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className='h-52'
                            image={guides?.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h6' component="div" className='text-xl font-medium mb-2 '>
                                {guides?.name}
                            </Typography>
                            <Typography gutterBottom variant="h4" component="span" className='inline-block bg-gray-200 bg-opacity-70 text-gray-600 rounded px-3 py-1 text-xs mr-2' >
                                {guides?.country}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {guides?.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>))}
            </div>
        </Container>
    );
};

export default NewTourGuides;