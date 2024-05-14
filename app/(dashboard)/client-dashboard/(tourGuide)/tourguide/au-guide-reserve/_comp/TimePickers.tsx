'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";


const TimePickers = ({ startTime, setstartTime }) => {
  const [timePic, settimePic] = useState<Dayjs>(dayjs());
  const newData = { timePic };

  const handleContributeData = () => {
    if (!timePic) {
      return toast.error("selecet a start time");
    }
    setstartTime([...startTime, newData]);
    toast.success("time added");
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={timePic}
            onChange={(newTime) => settimePic(newTime)} formatDensity={undefined} enableAccessibleFieldDOMStructure={undefined} selectedSections={undefined} onSelectedSectionsChange={undefined} />
        </LocalizationProvider>
        <div className="flex justify-end">
          <button
            type="button"
            className="w-fit rounded-md shadow-sm hover:shadow px-3 border border-green-600 bg-green-600 text-zinc-50"
            onClick={handleContributeData}
          >
            Add
          </button>
        </div>
        <div className="flex items-center gap-2">
          {startTime?.map((item: { pic: string; timePic: string }, index: number) => {
            let pic = JSON.stringify(item?.timePic);
            pic = JSON.parse(pic);
            return (
              <div key={index}>
                <h4>{new Date(pic).toLocaleTimeString()}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimePickers;
