"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TimePickers = ({ startTime, setstartTime }) => {
  const [timePic, setTimePic] = useState<Dayjs>(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleContributeData = () => {
    if (!timePic) {
      return toast.error("Select a start time");
    }
    setstartTime([...startTime, { timePic }]);
    toast.success("Time added");
    setTimePic(dayjs()); // Reset the picker after adding
  };

  const updateTimePic = (time: Dayjs, index: number) => {
    setTimePic(dayjs(time));
    setIsEdit(true);
    setEditIndex(index);
  };

  const updateContributionTime = () => {
    if (editIndex === null || !timePic) {
      return;
    }
    const updatedStartTime = [...startTime];
    updatedStartTime[editIndex] = { timePic };
    setstartTime(updatedStartTime);
    setIsEdit(false);
    setEditIndex(null);
    toast.success("Time updated");
    setTimePic(dayjs()); // Reset the picker after updating
  };

  const removeContributeTime = (index: number) => {
    const newConDatas = [...startTime];
    newConDatas.splice(index, 1);
    setstartTime(newConDatas);
    toast.success("Time removed from contribute data");
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={timePic}
            onChange={(newTime) => setTimePic(newTime)}
          />
        </LocalizationProvider>
        <div className="flex justify-end">
          {isEdit ? (
            <button
              onClick={updateContributionTime}
              type="button"
              className="link-btn"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleContributeData}
              type="button"
              className="link-btn"
            >
              Add
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {startTime?.map((item: { timePic: Dayjs }, index: number) => {
            return (
              <div key={index} className="flex gap-2">
                <h4>{dayjs(item.timePic).format("hh:mm A")}</h4>
                <div>
                  <button
                    onClick={() => updateTimePic(item.timePic, index)}
                    type="button"
                    className="link-btn"
                  >
                    Up
                  </button>
                  <button
                    onClick={() => removeContributeTime(index)}
                    type="button"
                    className="btn-dlt"
                  >
                    del
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimePickers;
