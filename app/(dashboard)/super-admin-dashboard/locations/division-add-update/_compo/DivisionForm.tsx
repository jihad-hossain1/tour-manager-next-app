"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { addDivision } from "./addDivision";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DivisionForm = ({ countries, id }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [countryId, setCountryId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        console.log(formData);
      } else {
        setLoading(true);
        const response = await addDivision({
          ...formData,
          countryId: countryId,
        });

        if (!response?.data) {
          setLoading(false);
          toast.error("Something went wrong");
        }

        if (response?.data) {
          setLoading(false);
          toast.success("Division created successfully");
          router.refresh();
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleClear() {
    setFormData({
      name: "",
      description: "",
    });
    setCountryId("");
  }

  return (
    <div>
      <form onSubmit={handlSubmit}>
        <h1 className="text-2xl font-bold my-10">
          {id ? "Update" : "Add"} Division
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
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="dem3">Select Country</InputLabel>
            <Select
              name="countryId"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              labelId="dem3"
              id="dem3"
              label="Select Country"
            >
              <MenuItem value="" disabled>
                Select Country
              </MenuItem>
              {countries?.map((country: { id: string; name: string }) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
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

export default DivisionForm;
