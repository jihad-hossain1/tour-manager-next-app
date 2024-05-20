"use client";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addedTourPlace } from "./addTourPlace";
import TourGuideContributeForm from "./TourGuideContributeForm";
import { updatedTourPlace } from "./updatedTourPlace";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const emptyArray = [];

const Form = ({ id, profile, tourSpots, guidePlaceData }) => {
  const [conDatas, setConDatas] = useState(emptyArray ?? []);
  const [title, setTitle] = useState("");
  const [tourPlaceId, settourplaceid] = useState("");
  const [price, setprice] = useState<number | string>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setTitle(guidePlaceData?.title ?? "");
      settourplaceid(guidePlaceData?.tourPlaceId ?? "");
      setprice(guidePlaceData?.price ?? 0);
      setConDatas(guidePlaceData?.contribute ?? emptyArray);
    }
  }, [
    guidePlaceData?.contribute,
    guidePlaceData?.price,
    guidePlaceData?.title,
    guidePlaceData?.tourPlaceId,
    id,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "") {
      return toast.error("Title are required");
    } else if (tourPlaceId == "") {
      return toast.error("");
    } else if (price == "0" || price == 0) {
      return toast.error("Price are required");
    } else if (conDatas.length < 4) {
      return toast.error(
        "Please Add Minimum 4 Contribure Time with title and relevent content"
      );
    }

    try {
      if (id) {
        setLoading(true);

        const response = await updatedTourPlace({
          title: title,
          tourPlaceId: tourPlaceId,
          price: +price,
          contribute: conDatas,
          clientProfileID: profile?.id,
          id: id[0],
        });

        if (response?.data?.id) {
          setLoading(false);
          toast.success("Tour Place Updated Successfully");
          return;
        }

        setLoading(false);
      } else {
        setLoading(true);
        const result = await addedTourPlace({
          title: title,
          price: +price,
          tourPlaceId: tourPlaceId,
          contribute: conDatas,
          clientProfileID: profile?.id,
        });

        if (result?.data?.id) {
          setLoading(false);
          toast.success("Tour Place Added Successfully");
          return;
        }

        if (result?.data) {
          setLoading(false);
          const data = result?.data as any;
          let res = data?.split(":")[0]?.trim();
          toast.error(res);
          return;
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
    setConDatas([]);
    setTitle("");
    settourplaceid("");
    setprice(0);
    setLoading(false);
    toast.success("Form cleared successfully");
  }
  return (
    <div className="mx-6 my-10">
      <h4 className="my-4 text-center">Add Tour Place</h4>
      <div className="max-w-2xl mx-auto p-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            variant="outlined"
            placeholder="Title"
            label="Title"
            type="text"
            name="title"
            id="any"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            variant="outlined"
            placeholder="price"
            label="price"
            type="number"
            name="price"
            id="any"
            onChange={(e) => setprice(e.target.value)}
            value={price}
          />
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo22">Select Tour Spot</InputLabel>
              <Select
                labelId="demo22"
                id="demo22"
                name="tourPlaceId"
                label="Select Tour Spot"
                value={tourPlaceId}
                onChange={(e) => settourplaceid(e.target.value)}
              >
                {tourSpots?.length == 0 ? (
                  <MenuItem disabled value="">
                    No Tour Spot Found
                  </MenuItem>
                ) : (
                  <MenuItem value="" disabled>
                    Select Tour Spot
                  </MenuItem>
                )}
                {tourSpots?.map((tourSpot: { id: string; name: string }) => (
                  <MenuItem key={tourSpot?.id} value={tourSpot?.id}>
                    {tourSpot?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TourGuideContributeForm
              id={id}
              conDatas={conDatas}
              setConDatas={setConDatas}
            />
          </div>
          <div className="flex justify-end">
            <div className="w-fit flex gap-3 items-center">
              {id ? (
                <Button
                  className="bg-blue-500 text-white"
                  type="submit"
                  color="success"
                  variant="contained"
                  fullWidth
                >
                  {loading ? "Loading..." : "Update"}
                </Button>
              ) : (
                <Button
                  className="bg-blue-500 text-white"
                  type="submit"
                  color="success"
                  variant="contained"
                  fullWidth
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              )}
              <Button
                className="bg-red-500 text-white"
                variant="contained"
                color="error"
                onClick={handleClear}
                type="button"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
