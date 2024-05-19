'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const TimePickers = ({ startTime, setstartTime }) => {
  const [timePic, settimePic] = useState<Dayjs>(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter()

  const newData = { timePic };

  const handleContributeData = () => {
    if (!timePic) {
      return toast.error("selecet a start time");
    }
    setstartTime([...startTime, newData]);
    toast.success("time added");
  };

  function updteTimePic(timePic) {
    // settimePic(timePic);
    let pic = JSON.stringify(timePic);
    pic = JSON.parse(pic);
    settimePic(dayjs(pic));

    setIsEdit(true);
  }

  function updateContributeData() {
    if (!timePic) {
      return toast.error("selecet a start time");
    }

    let pic = JSON.stringify(timePic);
    pic = JSON.parse(pic);

    setstartTime(startTime.map((item: { timePic: string; }) => item?.timePic == pic ? { timePic: timePic } : item));

    setIsEdit(false);
    settimePic(dayjs());
    router.refresh()
    toast.success("time updated");
  }
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
          {isEdit ? <button onClick={updateContributeData} type="button" className="link-btn">Update</button> : <button onClick={handleContributeData} type="button" className="link-btn">Add</button>}
        </div>
        <div className="flex flex-col gap-3">
          {startTime?.map((item: { pic: string; timePic: string }, index: number) => {
            let pic = JSON.stringify(item?.timePic);
            pic = JSON.parse(pic);
            return (
              <div key={index} className="flex  gap-2">
                <h4>{new Date(pic).toLocaleTimeString()}</h4>
                <div>
                  <button onClick={() => updteTimePic(pic)} type="button" className="link-btn">Up</button>
                  <button type="button" className="btn-dlt">del</button>
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
