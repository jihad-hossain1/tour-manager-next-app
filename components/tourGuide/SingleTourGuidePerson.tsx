'use client'

import OwlCarousel from '@ntegral/react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Card, CardMedia } from "@mui/material";
import Link from "next/link";
const images = [
  { img: "https://i.ibb.co/3Mvr2cx/141344.jpg" },
  { img: "https://i.ibb.co/LrtBvtD/141347.jpg" },
  { img: "https://i.ibb.co/C2LnVJ7/141343.jpg" },
  { img: "https://i.ibb.co/0FHwFPv/141348.jpg" },
  { img: "https://i.ibb.co/PCLcQVt/141345.jpg" },
  { img: "https://i.ibb.co/mFYrB32/141346.jpg" },
  { img: "https://i.ibb.co/y8b22cj/141341.jpg" },
  { img: "https://i.ibb.co/1K2M2Sr/141349.jpg" },
];

const SingleTourGuidePerson = ({ tourGuideContribution }) => {
  const options = {
    items: 1,
    loop: false,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: "slideOutUp",
    dots: false,
    margin: 20,
    responsive: {
      370: {
        items: 1,
        innerHeight: "100%",
        innerWidth: "100%",
      },
    },
  };

  return (
    <div>
      <h4 className="text-3xl">
        <span className="border-b-[3px] pb-1 border-blue-600 w-fit">Tours</span>
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 lg:mt-10">
        {tourGuideContribution?.map((it, _i) => (
          <Link
            href={`/tour-guide/single-guide-review/${it?.id}`}
            className=""
            key={_i}
          >
            <Card key={_i} sx={{ maxWidth: 375 }}>
              <OwlCarousel className="owl-theme" {...options}>
                {images?.map((itm, _i) => (
                  <CardMedia
                    key={_i}
                    component="img"
                    alt="green iguana"
                    className="h-[200px]"
                    image={itm?.img}
                  />
                ))}
              </OwlCarousel>
              <div className="mt-2 p-3 lg:p-4  flex flex-col gap-2">
                <h4 className="font-semibold text-xl">{it?.title}</h4>
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h5 className="w-fit px-3 text-xs bg-black/10 rounded-md py-1">{`Tangier`}</h5>
                    <h5 className="w-fit px-3 text-xs bg-black/10 rounded-md py-1">{`${4} hours ${30} min`}</h5>
                  </div>
                  <p className="text-gray-700 text-sm">
                    This cultural tour is a combination of sightseeing and
                    walking. Start with a drive along Tangiers International
                    districts before heading to Cap Spartel and the Caves
                  </p>
                  <div className="flex items-center gap-1 pb-3">
                    <span className="uppercase text-sm">from</span>
                    <span className="text-xl font-bold">{` $${120} `}</span>
                    <span className="text-sm text-gray-600">{`/ per group`}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleTourGuidePerson;
