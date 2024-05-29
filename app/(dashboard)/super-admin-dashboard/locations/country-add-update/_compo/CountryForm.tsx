
'use client'

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
// import { createCountry, updateCountry } from '@/service/mutation/countryMutation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { addCountry } from "./addCountry";
import { updatedCountry } from './updateCountry'
import axios from "axios";
import Image from "next/image";
import FileUploader from "@/utils/fileUploader/FileUploader";

const CountryForm = ({ id, continents, country }) => {
  const [loading, setLoading] = useState(false);
  const [continentId, setContinentId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
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
        name: country?.name || "",
        description: country?.description || "",
        photo: country?.photo || "",
      });
      setContinentId(country?.continentId || "");
      setIsEdit(true);
      setimage(country?.photo);
    }
  }, [
    country?.continentId,
    country?.description,
    country?.name,
    country?.photo,
    id,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        setLoading(true);
        const result = await updatedCountry({
          ...formData,
          continentId,
          id: id[0],
          photo: photo,
        });

        setLoading(false);

        if (result?.data?.id) {
          setLoading(false);
          router.refresh();
          toast.success("Country update successfully");
        } else {
          setLoading(false);
          console.log(result);
          toast.error(result?.error);
        }
      } else {
        setLoading(true);
        const result = await addCountry({
          ...formData,
          continentId,
          photo: photo,
        });

        if (result?.data?.id) {
          router.refresh();
          setLoading(false);
          toast.success("Country created successfully");
        } else {
          setLoading(false);
          console.log(result);
          toast.error(result?.error);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function handleClear() {
    setFormData({
      name: "",
      description: "",
      photo: "",
    });
    setContinentId("");
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
            label="Description"
            multiline
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="dem2">Select Continent</InputLabel>
            <Select
              labelId="dem2"
              id="dem2"
              label="Select Continent"
              value={continentId}
              onChange={(e) => setContinentId(e.target.value)}
            >
              <MenuItem value="" disabled>
                Select Continent
              </MenuItem>
              {continents?.map((continent: { id: string; name: string }) => (
                <MenuItem key={continent?.id} value={continent?.id}>
                  {continent?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default CountryForm