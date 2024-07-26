import PageContainer from "@/components/ui/pageContainer";
import { getTourGuides } from "@/service/query/tourGuideQuery";
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";




const TourGuide = async () => {
  const tourGuides = await getTourGuides();

  return (
    <PageContainer>
      <h4 className="text-3xl text-center py-10">Tour Guide</h4>
      <div className="mb-10 flex flex-col items-center md:grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4">
        {tourGuides?.map((_guide, index) => (
          <Link
            href={`/tour-guide/${_guide?.slug}`}
            key={index}
            className="dark"
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                className="h-[200px]"
                image={
                  _guide?.clientInfo?.image ||
                  "https://res.cloudinary.com/dqfi9zw3e/image/upload/v1704075698/images/ji7dcjbb3uglsqfmfkd8.jpg"
                }
              />

              <CardContent className="flex flex-col gap-2">
                <Typography gutterBottom variant="h5" component="div">
                  {_guide?.clientInfo?.name}
                </Typography>
                <div className="flex gap-1 items-center text-xs">
                  <div className="w-fit flex items-center gap-1">
                    <Rating readOnly value={5} />
                    <span className="font-semibold"> {`${5.0}/5`}</span>
                  </div>
                  <div className="w-fit font-bold">{`(${1} reviews)`}</div>
                </div>
                <div className="w-fit bg-gray-200 dark px-3 rounded-md text-sm">
                  {_guide?.city?.name}
                </div>
                <Typography variant="body2" color="text.secondary">
                  {_guide?.about?.length > 200
                    ? `${_guide?.about?.slice(0, 200)}...`
                    : _guide?.about}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};

export default TourGuide;
