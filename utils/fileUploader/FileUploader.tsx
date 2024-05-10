"use client";

import { Button, styled } from "@mui/material";
import { LuUploadCloud } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploader = ({
  image,
  setimage,
  handleOnFileUpload,
  photo,
  formData,
}) => {
  // const [video, setVideo] = useState(null);
  return (
    <>
      <div className="flex gap-4 items-center">
        <Button
          component="label"
          variant="outlined"
          startIcon={<LuUploadCloud />}
          className="w-fit"
          color="warning"
        >
          select a photo
          <VisuallyHiddenInput
            type="file"
            name=""
            accept="image/*"
            id="image"
            onChange={(e) => setimage((prev) => e.target.files[0])}
          />
        </Button>
        <Button color="success" variant="outlined" onClick={handleOnFileUpload}>
          upLoad
        </Button>

        <div>
          {photo && (
            <div className="flex items-center gap-4">
              <Image
                src={photo}
                alt=""
                className="w-20"
                height={300}
                width={300}
              />
              <div className="w-fit p-2 rounded border shadow flex flex-col gap-2 items-center">
                <IoMdCheckmarkCircleOutline
                  size={25}
                  className="text-green-600"
                />
                <p className="text-sm">Upload Successfull</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="my-6">
        {formData?.photo && (
          <Image
            src={formData?.photo}
            className="w-30"
            height={300}
            width={300}
            alt={""}
          />
        )}
      </div>
    </>
  );
};

export default FileUploader;
