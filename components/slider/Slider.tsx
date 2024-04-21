"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import "./Slider.css";
import Image from "next/image";

const Slider = () => {
  const [timeRunning] = useState(500);
  const [timeAutoNext] = useState(9000);

  let runTimeOut: string | number | NodeJS.Timeout;
  let runNextAuto: string | number | NodeJS.Timeout;

  const showSlider = (type) => {
    const carouselDom = document.querySelector(".carousel");
    const SliderDom = document.querySelector(".carousel .list");
    const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
    const SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
    const thumbnailItemsDom = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );

    if (type === "next") {
      SliderDom.appendChild(SliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      carouselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  };

  useEffect(() => {
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(runNextAuto);
      clearTimeout(runTimeOut);
    };
  }, []);
  return (
    <div className="carousel w-[100%] md:w-full lg:w-full">
      <div className="list">
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/3SDRgg5/img-1.webp"
          />
          <div className="content max-w-[70%] md:max-w-[80%] lg:max-w-[70%]">
            <div className="title">OUR POPULAR DESTINATIONS</div>
            <div className="topic">INDEA</div>
            <div className="des">
              India, a South Asian nation, is known for its rich history,
              diverse culture, and vibrant traditions. With a population of over
              1.3 billion people, its the worlds second-most populous country.
              India boasts a parliamentary democratic system, and its economy
              has witnessed significant growth. Renowned for landmarks like the
              Taj Mahal and diverse landscapes, from the Himalayas to coastal
              areas, India is a mosaic of languages, religions, and traditions.
            </div>
            <div className="buttons">
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/wrmwNH3/img-2.webp"
          />
          <div className="content max-w-[70%] md:max-w-[80%] lg:max-w-[70%] w">
            <div className="title">OUR POPULAR DESTINATIONS</div>
            <div className="topic">EGYPT</div>
            <div className="des">
              Egypt, situated in northeastern Africa, is renowned for its
              ancient civilization, particularly the pyramids and Sphinx in
              Giza. The country has a rich history spanning thousands of years,
              with significant contributions to art, science, and culture. The
              Nile River, the longest in Africa, has been a lifeline for
              Egyptian civilization. Modern Egypt is a mix of ancient wonders
              and a growing urban landscape, making it a fascinating blend of
              tradition and progress.
            </div>
            <div className="buttons">
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/gjrZJv1/img-3.webp"
          />
          <div className="content max-w-[70%] md:max-w-[80%] lg:max-w-[70%] w">
            <div className="title">OUR POPULAR DESTINATIONS</div>
            <div className="topic">NEPAL</div>
            <div className="des">
              Nepal, a landlocked country in South Asia, is nestled between
              China and India, home to the majestic Himalayas, including the
              worlds highest peak, Mount Everest. Known for its diverse
              landscapes, from the plains of the Terai to the towering
              mountains, Nepal is culturally rich with a blend of Hindu and
              Buddhist traditions. Kathmandu, the capital, holds ancient temples
              and palaces, reflecting the countrys deep historical and spiritual
              significance.
            </div>
            <div className="buttons">
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/HHPfq62/img-4.webp"
          />
          <div className="content max-w-[70%] md:max-w-[80%] lg:max-w-[70%] w">
            <div className="title">OUR POPULAR DESTINATIONS</div>
            <div className="topic">ITALI</div>
            <div className="des">
              Italy, located in Southern Europe, is renowned for its rich
              cultural heritage, historical landmarks, and culinary excellence.
              The country, with a diverse landscape ranging from the Alps to the
              Mediterranean, is famous for iconic cities like Rome, Florence,
              and Venice. Italy played a pivotal role in shaping Western art,
              architecture, and literature. Its cuisine, celebrated globally,
              includes pasta, pizza, and a variety of regional dishes. Italy is
              a hub of art, history, and gastronomy.
            </div>
            <div className="buttons">
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>

      <div className="thumbnail left-[40%] lg:left-[40%]">
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/3SDRgg5/img-1.webp"
          />
          <div className="content">
            <div className="title">Name Slider</div>
            <div className="description">Description</div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/wrmwNH3/img-2.webp"
          />
          <div className="content">
            <div className="title">Name Slider</div>
            <div className="description">Description</div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/gjrZJv1/img-3.webp"
          />
          <div className="content">
            <div className="title">Name Slider</div>
            <div className="description">Description</div>
          </div>
        </div>
        <div className="item">
          <Image
            height={300}
            width={1000}
            className="w-full h-full"
            alt="photo"
            src="https://i.ibb.co/HHPfq62/img-4.webp"
          />
          <div className="content">
            <div className="title">Name Slider</div>
            <div className="description">Description</div>
          </div>
        </div>
      </div>

      <div className="arrows ml-[5%] lg:ml-[10%]">
        <button
          className=" w-14 h-14"
          onClick={() => showSlider("prev")}
          id="prev"
        >
          {"<"}
        </button>
        <button
          className="w-14 h-14"
          onClick={() => showSlider("next")}
          id="next"
        >
          {">"}
        </button>
      </div>

      <div className="time"></div>
    </div>
  );
};

export default Slider;
