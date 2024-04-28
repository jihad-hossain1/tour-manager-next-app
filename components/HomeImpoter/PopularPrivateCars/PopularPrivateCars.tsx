'use client'

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { popularPrivateCars } from "../../../components/AllDemoDataImporter/AllDemoDataImporter";
import Title from "../../ui/Title/Title";
import Image from "next/image";
import Container from "@/components/ui/container";

const PopularPrivateCars = () => {
  return (
    <Container>
      <Title firstText="Popular" secondText="Private Cars" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {popularPrivateCars.map((tourSpot, index) => (
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
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://images.unsplash.com/photo-1474471981552-e3084590b868?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://images.unsplash.com/photo-1706117948319-b076f0433fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={300}
                    height={300}
                    src="https://images.unsplash.com/photo-1635939364889-324dbe6d9cfc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="text-xl font-medium mb-2 "
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
                    {tourSpot?.duration}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="my-10"
                >
                  {tourSpot?.description}
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
                  <span className="text-blue-500 text-lg font-medium">
                    Travis Howard
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

export default PopularPrivateCars;
