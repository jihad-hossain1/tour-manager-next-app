'use client'

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

import { Pagination, Navigation } from "swiper/modules";
import Title from "../../ui/Title/Title";
import { imageArray, newPrivateTours } from "../../../components/AllDemoDataImporter/AllDemoDataImporter";
import Container from "@/components/ui/container";
import Image from "next/image";

const NewPrivateTours = () => {
  return (
    <Container>
      <Title firstText="New" secondText="Private Tours" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {newPrivateTours.map((tourSpot, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {imageArray.map((images, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      height={300}
                      width={300}
                      src={images}
                      alt=""
                    />
                  </SwiperSlide>))}
              </Swiper>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-xl font-medium mb-2 h-16"
                >
                  {tourSpot?.title}
                </Typography>
                <div className="space-x-5">
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="span"
                    className="inline-block bg-gray-200 bg-opacity-70 text-gray-600 rounded px-3 py-1 text-xs mr-2"
                  >
                    {tourSpot?.city}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="span"
                    className="inline-block bg-gray-200 bg-opacity-70 text-gray-600 rounded px-3 py-1 text-xs mr-2"
                  >
                    {tourSpot?.duration} hours
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="my-10 h-20"
                >
                  {tourSpot?.description.length > 50 && `${tourSpot?.description.slice(0, 100)}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="my-10"
                >
                  From{" "}
                  <span className="text-xl font-bold text-black">
                    ${tourSpot?.price}
                  </span>{" "}
                  /per group
                </Typography>
              </CardContent>
              <Divider light />
              <CardActions sx={{ p: 2 }}>
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="grid gap-1">
                  <span className="text-blue-500 text-lg font-medium truncate w-44">
                    {tourSpot?.name}
                  </span>
                </div>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default NewPrivateTours;
