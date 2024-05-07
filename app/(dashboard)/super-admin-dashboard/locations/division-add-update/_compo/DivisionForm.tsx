"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { addDivision } from "./addDivision";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updatedDivision } from "./updateDivision";

const DivisionForm = ({ countries, id, division }) => {
  const [countryId, setCountryId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setFormData({
        name: division?.name || "",
        description: division?.description || "",
      });
      setCountryId(division?.countryId || "");
    }
  }, [division?.countryId, division?.description, division?.name, id]);

  const handlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        console.log(formData);
        const response = await updatedDivision({
          id: id[0],
          ...formData,
          countryId: countryId,
        });
        if (response?.data?.id) {
          toast.success("Division updated successfully");
          router.refresh();
        }
      } else {
        setLoading(true);
        const response = await addDivision({
          ...formData,
          countryId: countryId,
        });

        if (response?.data?.id) {
          setLoading(false);
          toast.success("Division created successfully");
          router.refresh();
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
