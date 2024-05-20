"use client";

import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import MultipleImageUploader from "@/utils/fileUploader/MultipleImageUploader";
import { addImages } from "./addImages";
import { errorResponse } from "@/utils/errorResponse";

const Form = ({ id, clientProfileID, clientId, guideContribution }) => {
  const [multiImage, setMultiImage] = useState([]);
  const [multiLink, setmultiLink] = useState([]);
  const [title, setTitle] = useState("");
  const [contributionId, setcontributionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (multiLink.length == 0) {
      return toast.error("Please select images and upload");
    } else if (title == "") {
      return toast.error("Please fill title input");
    }

    try {
      if (id) {
        //
      } else {
        setLoading(false);

        const response = await addImages({
          clientId,
          clientProfileID,
          contributionId,
          title,
          urls: multiLink,
        });

        if (response?.data?.id) {
          setLoading(false);
          toast.success("Images Added Successfully");
        } else {
          setLoading(false);
          errorResponse(response);
        }

        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast.error(error.message);
    }
  };

  return (
    <main className="my-20">
      <div className="flex flex-col gap-3">
        <form onSubmit={handleImageSubmit} className="flex flex-col gap-3">
          <div className="max-w-lg">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              color="success"
              variant="contained"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
          <TextField
            variant="outlined"
            placeholder="Image Title"
            label="Image Title"
            type="text"
            name=""
            id="any"
            className="max-w-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <FormControl>
            <InputLabel id="2label">Contributions</InputLabel>
            <Select
              className="max-w-lg"
              id="2label"
              label="Contributions"
              value={contributionId}
              onChange={(e) => setcontributionId(e.target.value)}
            >
              {guideContribution?.length == 0 ? (
                <MenuItem disabled>No Contributions found!</MenuItem>
              ) : (
                <MenuItem value="" disabled>
                  Select Contributions
                </MenuItem>
              )}
              {guideContribution?.map(
                (contribute: { id: string; title: string }) => (
                  <MenuItem key={contribute?.id} value={contribute?.id}>
                    {contribute?.title}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </form>
        <MultipleImageUploader
          multiLink={multiLink}
          setmultiLink={setmultiLink}
          multiImage={multiImage}
          setMultiImage={setMultiImage}
        />
      </div>
    </main>
  );
};

export default Form;
