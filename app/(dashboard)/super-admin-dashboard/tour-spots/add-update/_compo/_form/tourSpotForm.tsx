"use client";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addTourSpot } from "../addTourSpot";
import { useRouter } from "next/navigation";
import TextEditor from "./TextEditor";
import { updatedTourSpot } from "../updateTourSpot";

const TourSpotForm = ({ id, countries, divisions, cities, tourSpot }) => {
  const router = useRouter();
  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [cityId, setCityId] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setFormData({
        name: tourSpot?.name || "",
      });
      setCityId(tourSpot?.cityId || "");
      setCountryId(tourSpot?.countryId || "");
      setDivisionId(tourSpot?.divisionId || "");
      setPhoto(tourSpot?.photo || "");
      setDescription(tourSpot?.description || "");
    }
  }, [
    id,
    tourSpot?.cityId,
    tourSpot?.countryId,
    tourSpot?.description,
    tourSpot?.divisionId,
    tourSpot?.name,
    tourSpot?.photo,
  ]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id) {
        setLoading(true);

        const response = await updatedTourSpot({
          ...formData,
          countryId: countryId,
          description: description,
          cityId: cityId,
          divisionId: divisionId,
          photo: photo,
          id: id[0],
        });

        setLoading(false);

        if (response) {
          setLoading(false);
          toast.success("TourSpot update done");
          router.refresh();
        }
        setLoading(false);
      } else {
        setLoading(true);

        const response = await addTourSpot({
          ...formData,
          countryId: countryId,
          divisionId: divisionId,
          cityId: cityId,
          description: description,
        });

        if (response?.data?.id) {
          setLoading(false);
          router.refresh();
          toast.success("Tour Spot created successfully");
          handleClear();
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      let error_message = error.message.split(":")[0].trim();
      console.log(error_message);
      toast.error(error_message);
    }
  }

  function handleClear() {
    setCountryId("");
    setDivisionId("");
    setCityId("");
    setPhoto("");
    setFormData({
      name: "",
    });
    setDescription("");
  }

  function selectDivisions(countryId: string) {
    let filteredDivisions = divisions?.filter(
      (division: { countryId: string }) => division?.countryId === countryId
    );
    return filteredDivisions;
  }

  function selectCity(divisionId: string) {
    let filteredCities = cities?.filter(
      (city: { divisionId: string }) => city?.divisionId == divisionId
    );
    return filteredCities;
  }

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold my-10">
        {id ? "Update" : "Add"} Tour Spot
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          onChange={handleOnChange}
          value={formData?.name}
          label="TourSpot Name"
          sx={{ minWidth: 290 }}
        />

        <TextEditor formData={description} handleOnChange={setDescription} />

        <FormControl sx={{ minWidth: 290 }}>
          <InputLabel id="demot">Select Country</InputLabel>
          <Select
            onChange={(e) => setCountryId(e.target.value)}
            labelId="demot"
            id="demot"
            label="Select Country"
            value={countryId}
          >
            {countries?.length === 0 ? (
              <MenuItem disabled value={""}>
                No Country Found!
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select Country
              </MenuItem>
            )}

            {countries?.map((country: { id: string; name: string }) => {
              return (
                <MenuItem key={country?.id} value={country?.id}>
                  {country?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 290 }}>
          <InputLabel id="demot">Select Division</InputLabel>
          <Select
            onChange={(e) => setDivisionId(e.target.value)}
            labelId="demot"
            id="demot"
            label="Select Division"
            value={divisionId}
          >
            {countryId === "" ? (
              <MenuItem disabled value={""} className="text-red-500">
                Select Country First
              </MenuItem>
            ) : selectDivisions(countryId)?.length === 0 ? (
              <MenuItem disabled value={""} className="text-red-500">
                No Division Found!
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select Division
              </MenuItem>
            )}

            {selectDivisions(countryId)?.map(
              (division: { id: string; name: string }) => {
                return (
                  <MenuItem key={division?.id} value={division?.id}>
                    {division?.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 290 }}>
          <InputLabel id="demot">Select City</InputLabel>
          <Select
            onChange={(e) => setCityId(e.target.value)}
            labelId="demot"
            id="demot"
            label="Select City"
            value={cityId}
          >
            {divisionId === "" ? (
              <MenuItem disabled value={""} className="text-red-500">
                Select Division First
              </MenuItem>
            ) : selectCity(divisionId)?.length === 0 ? (
              <MenuItem disabled value={""} className="text-red-500">
                No City Found!
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
            )}

            {selectCity(divisionId)?.map(
              (city: { id: string; name: string }) => {
                return (
                  <MenuItem key={city?.id} value={city?.id}>
                    {city?.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>

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
      </form>
    </div>
  );
};

export default TourSpotForm;
