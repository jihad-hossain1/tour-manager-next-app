"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useRef } from "react";
import Image from "next/image";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Slider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        style={{ position: "relative", margin: "0px" }}
      >
        {[
          {
            src: "https://i.ibb.co/3SDRgg5/img-1.webp",
            title: "OUR POPULAR DESTINATIONS",
            topic: "INDIA",
            description:
              "India, a South Asian nation, is known for its rich history, diverse culture, and vibrant traditions. With a population of over 1.3 billion people, it's the world's second-most populous country. India boasts a parliamentary democratic system, and its economy has witnessed significant growth. Renowned for landmarks like the Taj Mahal and diverse landscapes, from the Himalayas to coastal areas, India is a mosaic of languages, religions, and traditions.",
          },
          {
            src: "https://i.ibb.co/wrmwNH3/img-2.webp",
            title: "OUR POPULAR DESTINATIONS",
            topic: "EGYPT",
            description:
              "Egypt, situated in northeastern Africa, is renowned for its ancient civilization, particularly the pyramids and Sphinx in Giza. The country has a rich history spanning thousands of years, with significant contributions to art, science, and culture. The Nile River, the longest in Africa, has been a lifeline for Egyptian civilization. Modern Egypt is a mix of ancient wonders and a growing urban landscape, making it a fascinating blend of tradition and progress.",
          },
          {
            src: "https://i.ibb.co/gjrZJv1/img-3.webp",
            title: "OUR POPULAR DESTINATIONS",
            topic: "NEPAL",
            description:
              "Nepal, a landlocked country in South Asia, is nestled between China and India, home to the majestic Himalayas, including the world's highest peak, Mount Everest. Known for its diverse landscapes, from the plains of the Terai to the towering mountains, Nepal is culturally rich with a blend of Hindu and Buddhist traditions. Kathmandu, the capital, holds ancient temples and palaces, reflecting the country's deep historical and spiritual significance.",
          },
          {
            src: "https://i.ibb.co/HHPfq62/img-4.webp",
            title: "OUR POPULAR DESTINATIONS",
            topic: "ITALY",
            description:
              "Italy, located in Southern Europe, is renowned for its rich cultural heritage, historical landmarks, and culinary excellence. The country, with a diverse landscape ranging from the Alps to the Mediterranean, is famous for iconic cities like Rome, Florence, and Venice. Italy played a pivotal role in shaping Western art, architecture, and literature. Its cuisine, celebrated globally, includes pasta, pizza, and a variety of regional dishes. Italy is a hub of art, history, and gastronomy.",
          },
        ].map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full">
              <Image
                height={300}
                width={1000}
                className="w-[100%] max-h-[600px] object-cover "
                alt="photo"
                src={item.src}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button swiperRef={swiperRef} />
    </div>
  );
};

const Button = ({ swiperRef }) => {
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-0 z-10">
        <button
          onClick={handlePrev}
          className="bg-blue-100 bg-opacity-20 border border-gray-50/20  p-2 w-12 h-12 rounded-full flex justify-center items-center hover:bg-blue-600 transition duration-300 group"
        >
          <FaArrowAltCircleLeft className="text-gray-50/20 group-hover:text-gray-50 transition duration-500" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 z-10">
        <button
          onClick={handleNext}
          className="bg-blue-100 bg-opacity-20 border border-gray-50/20 p-2 w-12 h-12 rounded-full flex justify-center items-center hover:bg-blue-600 transition duration-300 group"
        >
          {" "}
          <FaArrowAltCircleRight className="text-gray-50/20 group-hover:text-gray-50 transition duration-500" />
        </button>
      </div>
    </>
  );
};

export default Slider;

// "use client";

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-undef */
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Slider.css";
// import Image from "next/image";

// const Slider = () => {
//   const [timeRunning] = useState(500);
//   const [timeAutoNext] = useState(9000);

//   const runTimeOut = useRef<NodeJS.Timeout | null>(null);
//   const runNextAuto = useRef<NodeJS.Timeout | null>(null);

//   const showSlider = useCallback(
//     (type: string) => {
//       const carouselDom = document.querySelector(".carousel");
//       const sliderDom = document.querySelector(".carousel .list");
//       const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
//       const sliderItemsDom = sliderDom?.querySelectorAll(
//         ".carousel .list .item"
//       );
//       const thumbnailItemsDom = document.querySelectorAll(
//         ".carousel .thumbnail .item"
//       );

//       if (
//         !sliderItemsDom ||
//         !thumbnailItemsDom ||
//         !carouselDom ||
//         !sliderDom ||
//         !thumbnailBorderDom
//       )
//         return;

//       if (type === "next") {
//         sliderDom.appendChild(sliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add("next");
//       } else {
//         sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(
//           thumbnailItemsDom[thumbnailItemsDom.length - 1]
//         );
//         carouselDom.classList.add("prev");
//       }

//       clearTimeout(runTimeOut.current as NodeJS.Timeout);
//       runTimeOut.current = setTimeout(() => {
//         carouselDom.classList.remove("next");
//         carouselDom.classList.remove("prev");
//       }, timeRunning);

//       clearTimeout(runNextAuto.current as NodeJS.Timeout);
//       runNextAuto.current = setTimeout(() => {
//         showSlider("next");
//       }, timeAutoNext);
//     },
//     [timeRunning, timeAutoNext]
//   );

//   useEffect(() => {
//     runNextAuto.current = setTimeout(() => {
//       showSlider("next");
//     }, timeAutoNext);

//     return () => {
//       clearTimeout(runNextAuto.current as NodeJS.Timeout);
//       clearTimeout(runTimeOut.current as NodeJS.Timeout);
//     };
//   }, [showSlider, timeAutoNext]);

//   return (
//     <div className="carousel w-[100%] md:w-full lg:w-full">
//       <div className="list">
//         {[
//           {
//             src: "https://i.ibb.co/3SDRgg5/img-1.webp",
//             title: "OUR POPULAR DESTINATIONS",
//             topic: "INDIA",
//             description:
//               "India, a South Asian nation, is known for its rich history, diverse culture, and vibrant traditions. With a population of over 1.3 billion people, it's the world's second-most populous country. India boasts a parliamentary democratic system, and its economy has witnessed significant growth. Renowned for landmarks like the Taj Mahal and diverse landscapes, from the Himalayas to coastal areas, India is a mosaic of languages, religions, and traditions.",
//           },
//           {
//             src: "https://i.ibb.co/wrmwNH3/img-2.webp",
//             title: "OUR POPULAR DESTINATIONS",
//             topic: "EGYPT",
//             description:
//               "Egypt, situated in northeastern Africa, is renowned for its ancient civilization, particularly the pyramids and Sphinx in Giza. The country has a rich history spanning thousands of years, with significant contributions to art, science, and culture. The Nile River, the longest in Africa, has been a lifeline for Egyptian civilization. Modern Egypt is a mix of ancient wonders and a growing urban landscape, making it a fascinating blend of tradition and progress.",
//           },
//           {
//             src: "https://i.ibb.co/gjrZJv1/img-3.webp",
//             title: "OUR POPULAR DESTINATIONS",
//             topic: "NEPAL",
//             description:
//               "Nepal, a landlocked country in South Asia, is nestled between China and India, home to the majestic Himalayas, including the world's highest peak, Mount Everest. Known for its diverse landscapes, from the plains of the Terai to the towering mountains, Nepal is culturally rich with a blend of Hindu and Buddhist traditions. Kathmandu, the capital, holds ancient temples and palaces, reflecting the country's deep historical and spiritual significance.",
//           },
//           {
//             src: "https://i.ibb.co/HHPfq62/img-4.webp",
//             title: "OUR POPULAR DESTINATIONS",
//             topic: "ITALY",
//             description:
//               "Italy, located in Southern Europe, is renowned for its rich cultural heritage, historical landmarks, and culinary excellence. The country, with a diverse landscape ranging from the Alps to the Mediterranean, is famous for iconic cities like Rome, Florence, and Venice. Italy played a pivotal role in shaping Western art, architecture, and literature. Its cuisine, celebrated globally, includes pasta, pizza, and a variety of regional dishes. Italy is a hub of art, history, and gastronomy.",
//           },
//         ].map((item, index) => (
//           <div key={index} className="item">
//             <Image
//               height={300}
//               width={1000}
//               className="w-full h-[400px] object-cover"
//               alt="photo"
//               src={item.src}
//             />
//             <div className="content max-w-[70%] md:max-w-[80%] lg:max-w-[70%]">
//               <div className="title">{item.title}</div>
//               <div className="topic">{item.topic}</div>
//               <div className="des">{item.description}</div>
//               <div className="buttons">
//                 <button>SEE MORE</button>
//                 <button>SUBSCRIBE</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="thumbnail left-[40%] lg:left-[40%]">
//         {[
//           "https://i.ibb.co/3SDRgg5/img-1.webp",
//           "https://i.ibb.co/wrmwNH3/img-2.webp",
//           "https://i.ibb.co/gjrZJv1/img-3.webp",
//           "https://i.ibb.co/HHPfq62/img-4.webp",
//         ].map((src, index) => (
//           <div key={index} className="item">
//             <Image
//               height={300}
//               width={1000}
//               className="w-full h-full"
//               alt="photo"
//               src={src}
//             />
//             <div className="content">
//               <div className="title">Name Slider</div>
//               <div className="description">Description</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="arrows ml-[5%] lg:ml-[10%]">
//         <button
//           className="w-14 h-14"
//           onClick={() => showSlider("prev")}
//           id="prev"
//         >
//           {"<"}
//         </button>
//         <button
//           className="w-14 h-14"
//           onClick={() => showSlider("next")}
//           id="next"
//         >
//           {">"}
//         </button>
//       </div>

//       <div className="time"></div>
//     </div>
//   );
// };

// export default Slider;
