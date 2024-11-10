'use client'

import * as React from "react";
import Card from "@mui/material/Card";
import Title from "../ui/Title/Title";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "../ui/container";
import { getTourGuides, TTGuideResponse } from "@/service/query/tourGuideQuery";



const PopularGuide = () => {
  const [loading, setLoading] = React.useState(false)
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
      <Title firstText="Popular" secondText="Tour Guides" />
      <div>
        {loading ? <div>
          {
            [...Array(8)].map((_, index) => <div className="h-[200px] w-[300px] bg-slate-200 animate-pulse" key={index} />)
          }
        </div> : <div className="grid md:grid lg:grid-cols-4 grid-cols-2 gap-4">
          {
            tourGuides?.map((guide, index) => (
              <Link  href={`/tour-guide/${guide?.slug}`} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    className="h-[200px]"
                    image={
                      guide?.clientInfo?.image ? guide?.clientInfo?.image : "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1704075698/images/ji7dcjbb3uglsqfmfkd8.jpg"
                    }
                  />

                  <CardContent className="flex flex-col gap-2">
                    <Typography gutterBottom variant="h5" component="div" className=" max-sm:text-sm">
                      {guide?.clientInfo?.name}
                    </Typography>
                    <div className="flex gap-1 md:items-center text-xs flex-col md:flex-row ">
                      <div className="w-fit flex items-center gap-1">
                        <Rating readOnly value={5} className=" max-sm:text-sm" />
                        <span className="font-semibold  max-sm:text-sm"> {`${5.0}/5`}</span>
                      </div>
                      <div className="w-fit font-bold max-sm:text-sm">{`(${1} reviews)`}</div>
                    </div>
                    <div className="w-fit bg-gray-200 px-3 rounded-md text-sm">{
                      guide?.city?.name}</div>
                    <Typography variant="body2" color="text.secondary">
                    {guide?.about?.length > 200
                    ? `${guide?.about?.slice(0, 200)}...`
                    : guide?.about}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
          }

        </div>
        }
      </div>
    </Container>
  );
};

export default PopularGuide;
