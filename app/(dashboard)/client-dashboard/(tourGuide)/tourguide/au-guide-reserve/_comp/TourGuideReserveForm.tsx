'use client';


import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";
import PersonPickers from "./PersonPickers";
import TimePickers from "./TimePickers";
import { addedGuideResrve } from "./addGuideResrve";
import { updateReserve } from "./updateReserve";
import { useRouter } from "next/navigation";


const TourGuideReserveForm = ({
  clientProfileID,
  id,
  guideContributions,
  guideReserveData
}) => {

  const [open, setOpen] = useState(false);
  const [startTime, setstartTime] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [guideContribute, setGuideContribute] = useState('')
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const router = useRouter()

  // const maxAdults = 14;
  let totalPerson = adults + children + infants;

  let personPic = {
    adult: adults,
    children: children,
    infant: infants,
    totalPerson: totalPerson,
  };


  useEffect(() => {
    if (id) {
      setstartTime(guideReserveData?.startTime || []);
      setGuideContribute(guideReserveData?.guideContribution || '')
      setInfants(guideReserveData?.personPic?.infant || 0)
      setChildren(guideReserveData?.personPic?.children || 0)
      setAdults(guideReserveData?.personPic?.adult || 0)
    }
  }, [guideReserveData?.guideContribution, guideReserveData?.personPic?.adult, guideReserveData?.personPic?.children, guideReserveData?.personPic?.infant, guideReserveData?.startTime, id])

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (id) {
        setLoading(true);

        const response = await updateReserve({ clientProfileID, personPic, startTime, guideContribution: guideContribute, id: id[0] })

        setLoading(false)

        if (response?.data?.id) {
          setLoading(false);
          toast.success('Guide Reserve data updated')
        } else {
          setLoading(false);
          let error_message = response?.data?.split(":")[0].trim() as any
          toast.error(error_message);
        }
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
      className="my-20 max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h4 className="text-center my-10 text-xl">
          <span>{id ? "Update" : "Add"}</span>
          Guide Reserve
        </h4>
        <PersonPickers
          adults={adults}
          setAdults={setAdults}
          // eslint-disable-next-line react/no-children-prop
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
          previousTotal={guideReserveData?.personPic?.totalPerson}

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
              // onClick={handleClear}
              type="button"
            >
              Clear
            </Button>
          </div>
        </div>

      </form>

    </div>

  );
};

export default TourGuideReserveForm;
