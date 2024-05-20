"use client";

import FileUploader from "@/utils/fileUploader/FileUploader";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { addClientImage } from "./addClientImage";
import { errorResponse } from "@/utils/errorResponse";
import toast from "react-hot-toast";

const Form = ({ id, clientId }) => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);

  const handleOnFileUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "images_preset");
      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;

      setFileLoading(true);
      const res = await axios.post(api, data);

      let _up = await res?.data?.secure_url;

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

        const response = await addClientImage({
          image: photo,
          id: clientId,
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

        const response = await addClientImage({
          image: photo,
          id: clientId,
        });

        setLoading(false);

        // console.log(response);

        if (response) {
          toast.success("Image added successfully");
        } else {
          errorResponse(response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error?.message);
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
        />

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
