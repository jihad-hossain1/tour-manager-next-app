"use client";

import React, { useState } from "react";
import { multipleFiles } from "./multipleFile";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import Image from "next/image";

const MultipleImageUploader = ({
  multiLink,
  setmultiLink,
  multiImage,
  setMultiImage,
}) => {
  const [loading, setloading] = useState(false);
  const [toggleSeeGallary, settoggleSeeGallary] = useState(false);

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      let arr = [];
      for (let i = 0; i < multiImage?.length; i++) {
        const data = await multipleFiles(multiImage[i]);

        let image = {
          image: data?.url,
        };

        arr.push(image);
      }
      setmultiLink(arr);

      setloading(false);

      toast.success("multiple image upload successfull");
      toast.success("check show upload button click");
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleImageSubmit}
        className="flex items-center gap-4"
      >
        <div className="mb-3">
          <label htmlFor="image">Multiple Image Uplaod</label>
          <br />
          <input
            required
            className="border border-gray-400"
            type="file"
            name=""
            accept="image/*"
            id="image"
            multiple={true}
            onChange={(e) => setMultiImage(e.target.files)}
          />
        </div>
        <div>
          <Button variant="outlined" color="success" type="submit">
            {loading ? "uploading..." : "Upload"}
          </Button>
        </div>
      </form>

      <div className="mt-8 ">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => settoggleSeeGallary(!toggleSeeGallary)}
        >
          show uploaded photo
        </Button>
        <div className="grid grid-cols-2 my-3">
          {toggleSeeGallary &&
            multiLink?.map((item, index: number) => (
              <div key={index} className=" w-fit">
                <Image
                  width={300}
                  height={300}
                  src={item?.image}
                  className="max-w-[300px] object-cover "
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MultipleImageUploader;
