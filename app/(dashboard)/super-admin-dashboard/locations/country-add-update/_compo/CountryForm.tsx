
'use client'

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
// import { createCountry, updateCountry } from '@/service/mutation/countryMutation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { addCountry } from "./addCountry";
import { updatedCountry } from './updateCountry'

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
    }
  }, [country?.continentId, country?.description, country?.name, country?.photo, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        setLoading(true);
        const result = await updatedCountry({
          ...formData,
          continentId,
          id: id[0],
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
        const result = await addCountry({ ...formData, continentId });

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