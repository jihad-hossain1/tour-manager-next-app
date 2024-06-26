"use client";

import Image from "next/image";
import React from "react";

const ImageGellary = ({ images }) => {
  const flatData = images?.flatMap((item) =>
    item?.urls?.map((url) => ({
      parentId: item?.id,
      title: item?.title,
      urlId: url?.id,
      img: url?.image,
    }))
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="my-2">
        {flatData?.slice(0, 1).map((img, index) => (
          <div key={index}>
            <Image
              height={300}
              width={300}
              className="h-[400px] w-full rounded-xl"
              src={img?.img}
              alt="tour guide image"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 ">
          {flatData?.slice(1, 3).map((img, index) => (
            <div key={index}>
              <Image
                height={300}
                width={300}
                className="h-[200px] w-[320px] rounded-xl"
                src={img?.img}
                alt="tour guide image"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 ">
          {flatData?.slice(3, 5).map((img, index) => (
            <div key={index}>
              <Image
                height={300}
                width={300}
                className="h-[200px] w-[320px] rounded-xl"
                src={img?.img}
                alt="tour guide image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGellary;
