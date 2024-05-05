"use client";

import PageContainer from "@/components/ui/pageContainer";
import { getCountries } from "@/service/query/countryQuery";
import { getDivisions } from "@/service/query/divisionQuery";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CityForm = ({ divisions, countries, id }) => {
  // const [divisions, setDivisions] = useState([]);
  // const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [divisionId, setDivisionId] = useState("");
  const [countryId, setCountryId] = useState("");
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
  };

  // useEffect(() => {
  //   async function fetchDivisions() {
  //     const response = await getDivisions();
  //     setDivisions(response?.data);
  //   }
  //   fetchDivisions();
  // }, []);

  // useEffect(() => {
  //   async function fetchCountry() {
  //     const response = await getCountries();
  //     setCountries(response?.data);
  //   }

  //   fetchCountry();
  // }, []);

  const divisionFilter = (cid: string) => {
    let result = divisions?.filter((item) => item?.countryId == cid);
    return result;
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add City</h1>
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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

          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        </div>
      </form>
    </PageContainer>
  );
};

export default CityForm;
