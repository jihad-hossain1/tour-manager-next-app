'use client'

import React, { useState } from "react";
import { Avatar, Button, Rating, Typography, TextField } from "@mui/material";

// /x-date-pickers/internals/demo

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CiClock2, CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";

const MessageTourGuide = () => {
  const [people, setpeople] = useState("");
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setpeople(event.target.value);

  };

  return (
    <div className="border border-zinc-200 p-4 min-w-[390px] rounded-lg shadow-md">
      <div className="flex gap-3 items-center">
        <Avatar src="" alt="guide image" />
        <div>
          <Typography gutterBottom variant="h5" component="div">
            <span className="text-blue-900">Rababe E.</span>
          </Typography>
          <div className="flex gap-1 items-center text-xs">
            <div className="w-fit flex items-center gap-1">
              <Rating readOnly value={5} />
              <span className="font-semibold"> {`${5.0}/5`}</span>
            </div>
            <div className="w-fit font-bold">{`(${1} reviews)`}</div>
          </div>
        </div>
      </div>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <div className="flex flex-col gap-4">
        <TextField type="date" name="data" fullWidth />


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>





        <div>
          <FormControl sx={{ m: 0, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-controlled-open-select-label">
              People
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={people}
              placeholder="People"
              label="People"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <Button
        fullWidth
        style={{
          paddingBottom: "13px",
          paddingTop: "13px",
          borderRadius: "20px",
        }}
        variant="contained"
        color="info"
      >
        Message Rabebe E.
      </Button>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <div className="flex items-center gap-5">
        <CiLocationOn size={22} />
        <div>
          <h4 className="font-bold">Available Areas</h4>
          <h4 className="text-gray-600">Tangier {`(Living)`} </h4>
        </div>
      </div>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <div className="flex items-center gap-5">
        <LuMessagesSquare size={22} />
        <div>
          <h4 className="font-bold">Languages</h4>
          <h4 className="text-gray-600">
            English, French, {`Arabic (Native)`}{" "}
          </h4>
        </div>
      </div>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <div className="flex items-center gap-5">
        <CiClock2 size={22} />
        <div>
          <h4 className="font-bold">Response Time</h4>
          <h4 className="text-gray-600"> {`${5} `}hours on average </h4>
        </div>
      </div>
      <hr className="h-[1px] bg-slate-200 w-full my-4" />
      <div className="flex items-center gap-5">
        <CiCalendarDate size={22} />
        <div>
          <h4 className="font-bold">Availability Updated</h4>
          <h4 className="text-gray-600"> {`_ _ _ _ `} </h4>
        </div>
      </div>
    </div>
  );
};

export default MessageTourGuide;
