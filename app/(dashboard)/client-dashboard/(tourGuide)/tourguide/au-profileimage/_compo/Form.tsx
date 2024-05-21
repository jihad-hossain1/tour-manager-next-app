"use client";

import { errorResponse } from "@/utils/errorResponse";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { addGuideProfileImage } from "./addGuideProfileImage";
import FileUploader from "@/utils/fileUploader/FileUploader";
import { Button } from "@mui/material";
import Image from "next/image";

const Form = ({ id, clientProfileID, profileImage }) => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleOnFileUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "images_preset");
      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;

      setUploadTime(Date.now());
      setFileLoading(true);
      const res = await axios.post(api, data);

      let _up = await res?.data?.secure_url;

      setUploadTime(null);
      //   setTimer(null);
      setFileLoading(false);
      setPhoto(_up);
    } catch (error) {
      setFileLoading(false);
      console.log(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        setLoading(true);

        const response = await addGuideProfileImage({
          profileImage: photo,
          id: id[0],
        });

        if (response) {
          setLoading(false);
          toast.success("Image updated successfully");
          return;
        } else {
          setLoading(false);
          errorResponse(response);
        }
        setLoading(false);
      } else {
        setLoading(true);

        const response = await addGuideProfileImage({
          profileImage: photo,
          id: clientProfileID,
        });

        setLoading(false);

        if (response) {
          toast.success("Image added successfully");
        } else {
          errorResponse(response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
      errorResponse(error);
    }
  };

  const handleClear = () => {
    setimage(null);
    setPhoto("");
  };
  return (
    <div className="my-20">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FileUploader
          fileLoading={fileLoading}
          image={Image}
          setimage={setimage}
          handleOnFileUpload={handleOnFileUpload}
          photo={photo}
          formData={undefined}
          uploadTime={uploadTime}
          setTimer={setTimer}
          timer={timer}
        />

        {profileImage ? (
          <Image
            sizes="100vw"
            src={profileImage}
            alt="profile"
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        ) : null}

        <div className="flex justify-end">
          <div className="flex gap-4">
            {id ? (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                className=" bg-blue-500 hover:bg-blue-600"
                type="submit"
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                className=" bg-blue-500 hover:bg-blue-600"
                type="submit"
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            )}

            <Button
              variant="contained"
              color="error"
              className=" bg-red-500 hover:bg-red-600"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
