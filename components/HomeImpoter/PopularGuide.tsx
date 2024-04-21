import * as React from "react";
import Card from "@mui/material/Card";
import Title from "../ui/Title/Title";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "../ui/container";
const PopularGuide = () => {
  return (
    <Container>
      <Title firstText="Popular" secondText="Tour Guides" />
      <div className="flex flex-col items-center md:grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((guide, index) => (
          <Link href={`/tour-guide/${index}`} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                className="h-[200px]"
                image="https://res.cloudinary.com/dqfi9zw3e/image/upload/v1704075698/images/ji7dcjbb3uglsqfmfkd8.jpg"
              />

              <CardContent className="flex flex-col gap-2">
                <Typography gutterBottom variant="h5" component="div">
                  Rababe E.
                </Typography>
                <div className="flex gap-1 items-center text-xs">
                  <div className="w-fit flex items-center gap-1">
                    <Rating value={5} />
                    <span className="font-semibold"> {`${5.0}/5`}</span>
                  </div>
                  <div className="w-fit font-bold">{`(${1} reviews)`}</div>
                </div>
                <div className="w-fit bg-gray-200 px-3 rounded-md text-sm">{`Morocco`}</div>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default PopularGuide;
