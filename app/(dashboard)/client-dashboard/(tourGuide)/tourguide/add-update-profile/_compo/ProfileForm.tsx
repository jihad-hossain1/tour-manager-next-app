"use client";

import TextEditor from "@/app/(dashboard)/super-admin-dashboard/tour-spots/add-update/_compo/_form/TextEditor";
import FileUploader from "@/utils/fileUploader/FileUploader";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addedProfile } from "./addProfile";
import { useSession } from "next-auth/react";
import LoadingDiv from "@/components/loading/LoadingDiv";
import { useRouter } from "next/navigation";
import axios from "axios";
import { updatedProfile } from "./updatedProfile";
import Link from "next/link";

const ProfileForm = ({ id, cities, countries, tourGuideProfile }) => {
  console.log("🚀 ~ ProfileForm ~ tourGuideProfile:", tourGuideProfile);
  const { data: session, status } = useSession();
  const clientId = session?.user?.clientId;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);
  const [cityId, setCityId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const [formData, setFormData] = React.useState({
    responseTime: 0,
    type: "",
    languages: ["English", "Bangla", "Arabic"],
  });

  const [uploadTime, setUploadTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  useEffect(() => {
    if (id) {
      setFormData({
        responseTime: tourGuideProfile?.data?.responseTime || "",
        type: tourGuideProfile?.data?.type || "",
        languages: tourGuideProfile?.data?.languages || "",
      });
      setCityId(tourGuideProfile?.data?.cityId || "");
      setCountryId(tourGuideProfile?.data?.countryId || "");
      setDescription(tourGuideProfile?.data?.description || "");
      setPhoto(tourGuideProfile?.data?.profileImage || "");
      setAbout(tourGuideProfile?.data?.about || "");
    }
  }, [
    id,
    tourGuideProfile?.data?.about,
    tourGuideProfile?.data?.cityId,
    tourGuideProfile?.data?.countryId,
    tourGuideProfile?.data?.description,
    tourGuideProfile?.data?.languages,
    tourGuideProfile?.data?.profileImage,
    tourGuideProfile?.data?.responseTime,
    tourGuideProfile?.data?.type,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        setLoading(true);

        const _response = await updatedProfile({
          ...formData,
          description: description,
          profileImage: photo,
          clientId: clientId,
          cityId: cityId,
          countryId: countryId,
          about,
          id: id[0],
        });

        setLoading(false);

        if (_response?.data) {
          setLoading(false);
          router.refresh();
          const { data } = _response as any;
          let res = data?.split(":")[0]?.trim();
          toast.error(res);
          return;
        }

        setLoading(false);
        toast.success("Profile info has saved.");
        router.refresh();
      } else {
        setLoading(true);

        const response = await addedProfile({
          ...formData,
          description: description,
          profileImage: photo,
          clientId: clientId,
          cityId: cityId,
          countryId: countryId,
          about: about,
        });

        setLoading(false);

        if (response) {
          setLoading(false);
          toast.success("Profile info has saved.");
          router.refresh();
          router.push("/client-dashboard");
        }
      }
    } catch (error) {
      setLoading(false);
      let error_message = error.message.split(":")[0].trim();
      // console.log(error_message);
      toast.error(error_message);
    }
  };

  function filterCity(countryId: string) {
    const result = cities?.filter(
      (city: { countryId: string }) => city?.countryId == countryId
    );

    return result;
  }

  function handleClear() {
    setimage(null);
    setPhoto("");
    setFormData({
      responseTime: 0,
      type: "",
      languages: ["English", "Bangla", "Arabic"],
    });
    setCityId("");
    setCountryId("");
    setFileLoading(false);
    setLoading(false);
    toast.success("Profile info has cleared.");
  }

  if (status === "loading") {
    return <LoadingDiv />;
  }

  return (
    <div className="my-10">
      <div>
        <Link
          href={"/client-dashboard/tourguide"}
          className="border p-2 text-sm rounded"
        >
          Back
        </Link>
      </div>
      <h4 className="my-10 text-center text-xl font-bold">
        {id ? "Update" : "Add"} Profile
      </h4>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextEditor formData={description} handleOnChange={setDescription} />
        <TextField
          placeholder="TourGuide Type"
          label="TourGuide Type"
          name="type"
          className=" dark:border-gray-50 dark:bg-transparent dark:placeholder:text-white dark:border-1"
          fullWidth
          variant="outlined"
          type="text"
          value={formData?.type}
          onChange={handleChange}
        />

        <TextField
          value={formData?.responseTime}
          placeholder="responseTime"
          label="responseTime"
          name="responseTime"
          // required
          fullWidth
          variant="outlined"
          type="number"
          onChange={handleChange}
          className=" dark:border-gray-50 dark:bg-transparent dark:placeholder:text-white"
        />
        <TextField
          placeholder="About"
          label="About"
          name="about"
          className=" dark:border-gray-50 dark:bg-transparent dark:placeholder:text-white dark:border-1"
          fullWidth
          variant="outlined"
          type="text"
          multiline
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <FormControl>
          <InputLabel id="cid">Choice Country</InputLabel>
          <Select
            labelId="cid"
            variant="outlined"
            onChange={(e) => setCountryId(e.target.value)}
            value={countryId}
            name="countryId"
            label="Choice Country"
            placeholder="Choice Country"
            className=" dark:border-gray-50 dark:bg-transparent"
          >
            {countries?.map(
              (country: { id: string; name: string }, index: number) => (
                <MenuItem key={index} value={country?.id}>
                  {country?.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="cid">Choice City</InputLabel>
          <Select
            labelId="cid"
            variant="outlined"
            onChange={(e) => setCityId(e.target.value)}
            value={cityId}
            name="cityId"
            label="Choice City"
            placeholder="Choice City"
            className=" dark:border-gray-50 dark:bg-transparent"
          >
            {countryId === "" ? (
              <MenuItem disabled value={""} className="text-red-500">
                Select Country First
              </MenuItem>
            ) : filterCity(countryId)?.length === 0 ? (
              <MenuItem disabled value={""} className="text-red-500">
                No City Found!
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
            )}
            {filterCity(countryId)?.map(
              (city: { id: string; name: string }, index: number) => (
                <MenuItem key={index} value={city?.id}>
                  {city?.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

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

        <div className="flex justify-end">
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

export default ProfileForm;
