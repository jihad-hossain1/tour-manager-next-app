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

// import required modules
// import { Pagination, Navigation } from "swiper/modules";
import Title from "../../ui/Title/Title";
import { popularPrivateTours } from "../../../components/AllDemoDataImporter/AllDemoDataImporter";
import Container from "@/components/ui/container";
import Image from "next/image";


const PopularPrivateTours = () => {
  return (
    <Container>
      <Title firstText="Popular" secondText="Private Tours" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {popularPrivateTours.map((tourSpot, index) => (
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
                // modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://plus.unsplash.com/premium_photo-1679865372673-8d1655a73b50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://images.unsplash.com/photo-1619120238346-978e07731e77?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-xl font-medium mb-2 "
                >
                  {tourSpot?.title.length > 20 && `${tourSpot?.title.slice(0, 40)} ... `}
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
                    {tourSpot?.duration}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="my-10"
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
              <CardActions>
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="grid gap-1">
                  <span className="text-blue-500 text-lg font-medium truncate w-44">
                    {tourSpot?.name}
                  </span>
                  <span className="text-black">
                    ⭐⭐⭐⭐ {tourSpot?.stars} / 5
                  </span>
                  <span className="underline text-blue-500 font-bold">
                    ({tourSpot?.reviews} reviews)
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

export default PopularPrivateTours;
