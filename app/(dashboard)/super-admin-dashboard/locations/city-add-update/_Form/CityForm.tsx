"use client";

import PageContainer from "@/components/ui/pageContainer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCity } from "./addCity";
import { updatedCity } from "./updatedCity";
import FileUploader from "@/utils/fileUploader/FileUploader";
import axios from "axios";
import Image from "next/image";

const CityForm = ({ divisions, countries, id, city }) => {
  const router = useRouter();
  const [divisionId, setDivisionId] = useState("");
  const [countryId, setCountryId] = useState("");
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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(image);
    try {
      if (id) {
        setLoading(true);
        const result = await updatedCity({
          ...formData,
          divisionId,
          countryId,
          photo: photo,
          id: id[0],
        });

        setLoading(false);

        if (result?.updateCity?.id) {
          setLoading(false);
          router.refresh();
          toast.success("City updated successfully");
        }

        if (result?.error) {
          console.log(result);
          setLoading(false);
          toast.error(result?.error);
        }
        setLoading(false);
      } else {
        setLoading(true);

        const result = await addCity({
          ...formData,
          divisionId,
          countryId,
          photo: photo,
        });

        if (result?.data?.id) {
          setLoading(false);
          router.refresh();
          toast.success("City added successfully");
        }
        if (result?.error) {
          console.log(result);
          setLoading(false);
          toast.error(result?.error);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      let error_message = error.message.split(":")[0].trim();
      console.log(error_message);
      toast.error(error_message);
    }
  };

  const divisionFilter = (cid: string) => {
    let result = divisions?.filter((item) => item?.countryId == cid);
    return result;
  };

  useEffect(() => {
    if (id) {
      setFormData({
        name: city?.name,
        description: city?.description,
        photo: city?.photo,
      });
      setimage(city?.photo);
      setDivisionId(city?.divisionId);
      setCountryId(city?.countryId);
    }
  }, [
    city?.countryId,
    city?.description,
    city?.divisionId,
    city?.name,
    city?.image,
    id,
    city?.photo,
  ]);

  function handleClear() {
    setFormData({
      name: "",
      description: "",
      photo: "",
    });
    setDivisionId("");
    setCountryId("");
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-center my-6">
          {id ? "Update" : "Add"} City
        </h1>
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
            <InputLabel id="dem2">Select Country</InputLabel>
            <Select
              labelId="dem2"
              id="dem2"
              label="Select Country"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <MenuItem value="" disabled>
                Select Country
              </MenuItem>
              {countries?.map((country) => (
                <MenuItem key={country?.id} value={country?.id}>
                  {country?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="dem1">Select Divisions</InputLabel>
            <Select
              labelId="dem1"
              id="dem1"
              label="Select Divisions"
              value={divisionId}
              onChange={(e) => setDivisionId(e.target.value)}
            >
              {countryId === "" ? (
                <MenuItem disabled>Select Country First</MenuItem>
              ) : divisionFilter(countryId)?.length === 0 ? (
                <MenuItem disabled>No Division Found</MenuItem>
              ) : (
                <MenuItem value="" disabled>
                  Select Divisions
                </MenuItem>
              )}
              {divisionFilter(countryId)?.map((division) => (
                <MenuItem key={division?.id} value={division?.id}>
                  {division?.name}
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
    </PageContainer>
  );
};

export default CityForm;
