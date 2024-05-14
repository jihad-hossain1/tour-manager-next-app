'use client';


import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";
import PersonPickers from "./PersonPickers";
import TimePickers from "./TimePickers";
import { addedGuideResrve } from "./addGuideResrve";


const TourGuideReserveForm = ({
  clientProfileID,
  id,
  guideContributions
}) => {

  const [open, setOpen] = useState(false);
  const [startTime, setstartTime] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [guideContribute, setGuideContribute] = useState('')
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // const maxAdults = 14;
  let totalPerson = adults + children + infants;

  let personPic = {
    adult: adults,
    children: children,
    infant: infants,
    totalPerson: totalPerson,
  };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (id) {
        //
      } else {
        setLoading(true)

        const response = await addedGuideResrve({ clientProfileID, personPic, startTime, guideContribution: guideContribute });

        if (response?.data?.id) {
          setLoading(false);
          toast.success('Guide Reserve data added')
        } else {
          setLoading(false);
          let error_message = response?.data?.split(":")[0].trim() as any
          toast.error(error_message);
        }


        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      let error_message = error.message.split(":")[0].trim();
      toast.error(error_message);
    }

    setOpen(false);
  };



  // console.log(addTourGuideRes);
  return (

    <div
      className="my-20"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PersonPickers
          adults={adults}
          setAdults={setAdults}
          // eslint-disable-next-line react/no-children-prop
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
        />
        <TimePickers startTime={startTime} setstartTime={setstartTime} />


        <FormControl>
          <InputLabel id="lb1"> Select Contribution area</InputLabel>
          <Select id="lb1" label={"Select Contribution area"} onChange={(e) => setGuideContribute(e.target.value)} value={guideContribute} >

            <MenuItem disabled value='#'>
              Select Contribution area
            </MenuItem>
            {
              guideContributions?.map((item: { title: string; id: string }, index: number) => <MenuItem key={index} value={item?.id}>
                {item?.title}
              </MenuItem>)
            }
          </Select>
        </FormControl>

        <div className="flex justify-start">
          <Button variant="contained" color="success" className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-950 dark:hover:bg-gray-900 dark:text-white" type="submit">
            {loading ? "loading..." : "Submit"}
          </Button>
        </div>
      </form>


    </div>

  );
};

export default TourGuideReserveForm;
