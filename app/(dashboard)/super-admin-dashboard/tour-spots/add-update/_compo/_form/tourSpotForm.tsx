"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const TourSpotForm = ({ id, countries, divisions, cities }) => {
  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [cityId, setCityId] = useState("");
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });

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
    console.log(filteredCities);
    return filteredCities;
  }

  return (
    <div>
      <h1>{id ? "Update" : "Add"} Tour Spot</h1>
      <form className="flex flex-col gap-4">
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
            ) : selectCity(cityId)?.length === 0 ? (
              <MenuItem disabled value={""} className="text-red-500">
                No City Found!
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
            )}

            {selectCity(cityId)?.map((city: { id: string; name: string }) => {
              return (
                <MenuItem key={city?.id} value={city?.id}>
                  {city?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default TourSpotForm;
