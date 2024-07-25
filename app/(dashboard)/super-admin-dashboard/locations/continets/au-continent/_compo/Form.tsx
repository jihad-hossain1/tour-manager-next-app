
'use client'

import { Button,TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
// import { createCountry, updateCountry } from '@/service/mutation/countryMutation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from "axios";
import Image from "next/image";
import FileUploader from "@/utils/fileUploader/FileUploader";
import { addContinent } from './server-action'

const ContinentForm = ({ id, continent }) => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    img: "",
  });
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setFormData({
        name: continent?.name || "",
        code: continent?.code || "",
        img: continent?.img || "",
      });
      setIsEdit(true);
      setimage(continent?.img);
    }
  }, [
    continent?.code,
    continent?.name,
    continent?.img,
    id,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        // setLoading(true);
        // const result = await updatedCountry({
        //   ...formData,
        //   continentId,
        //   id: id[0],
        //   photo: photo,
        // });

        // setLoading(false);

        // if (result?.data?.id) {
        //   setLoading(false);
        //   router.refresh();
        //   toast.success("Country update successfully");
        // } else {
        //   setLoading(false);
        //   console.log(result);
        //   toast.error(result?.error);
        // }
      } else {
        setLoading(true);
        const result = await addContinent({
         name: formData?.name,
         code: formData?.code,
          img: photo,
        });

        if (result?.data?.id) {
          router.refresh();
          setLoading(false);
          toast.success("Country created successfully");
        } else {
          setLoading(false);
          // console.log(result);
          let error_message = result?.data?.split(":")[0].trim() as any;
          toast.error(error_message);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      let error_message = error?.data?.split(":")[0] as any;
      toast.error(error_message);
    }
  };

  function handleClear() {
    setFormData({
      name: "",
      code: "",
      img: "",
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" min-w-[400px] max-w-[600px] m-auto my-20 min-h-[40vh]"
      >
        <h1 className="text-2xl font-bold mb-4">Add Country</h1>

        <div className="flex flex-col gap-4">
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            type="text"
            label="Code"
            multiline
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
         
          <div>
            <div className="my-5">
              {image && (
                <Image
                  src={image || ""}
                  alt="image"
                  width={200}
                  height={200}
                  className="mt-4"
                />
              )}
            </div>
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
          </div>

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

export default ContinentForm