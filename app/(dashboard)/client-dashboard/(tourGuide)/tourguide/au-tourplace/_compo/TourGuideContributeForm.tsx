import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TourGuideContributeForm = ({ conDatas, setConDatas, id }) => {
  const [contributeTitle, setContributeTitle] = useState("");
  const [content, setContent] = useState("");
  const [picTime, setpicTime] = useState<dayjs.Dayjs | string>(dayjs());
  const [editIndex, setEditIndex] = useState(false);
  const router = useRouter();
  const [isIndexSet, setIsIndexSet] = useState(null);

  const newData = {
    picTime,
    contributeTitle,
    content,
  };

  const handleContributeData = () => {
    if (contributeTitle == "") {
      return toast.error("Contribute Title are required");
    } else if (picTime == "") {
      return toast.error("Time Field are required");
    } else if (content == "") {
      return toast.error("Content are required");
    }

    setConDatas([...conDatas, newData]);

    setContributeTitle("");
    setContent("");
    setpicTime("");
    toast.success("contribute add on array");
  };

  const removeFromArray = (index: number) => {
    const newConDatas = [...conDatas];
    newConDatas.splice(index, 1);
    setConDatas(newConDatas);
    toast.success("contribute remove from contribute data");
  };

  const updateSingleIndex = (index: number) => {
    setIsIndexSet(index);
    setEditIndex(true);
    setContributeTitle(conDatas[index].contributeTitle);
    setContent(conDatas[index].content);
    setpicTime(conDatas[index].picTime);
  };

  const updateData = (index) => {
    if (contributeTitle == "") {
      return toast.error("Contribute Title are required");
    } else if (picTime == "") {
      return toast.error("Time Field are required");
    } else if (content == "") {
      return toast.error("Content are required");
    }
    const newConDatas = [...conDatas];
    newConDatas[index] = {
      ...newConDatas[index],
      picTime,
      contributeTitle,
      content,
    };
    setConDatas(newConDatas);
    setEditIndex(false);
    setContributeTitle("");
    setContent("");
    setpicTime("");
    toast.success("contribute update done");
  };
  return (
    <>
      <div className="flex items-center gap-3 pb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Time Picker"
            // value={picTime}
            onChange={(newTime) => setpicTime(newTime)}
          />
        </LocalizationProvider>

        <FormControl>
          <TextField
            value={contributeTitle}
            type="text"
            variant="outlined"
            placeholder="Contribute Tittle"
            name="contributeTitle"
            onChange={(e) => setContributeTitle(e.target.value)}
          />
        </FormControl>
      </div>

      <TextField
        multiline
        label="Guide Content"
        placeholder="Guide Content"
        name="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="w-full bg-transparent border border-gray-900"
        id=""
        rows={10}
      />
      <div className="mt-3">
        {editIndex ? (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            type="button"
            onClick={() => updateData(isIndexSet)}
          >
            update
          </Button>
        ) : (
          <Button
            type="button"
            variant="outlined"
            color="success"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleContributeData}
          >
            add contribute
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-3 my-5">
        {conDatas?.map(
          (
            item: { contributeTitle: string; content: string; picTime: string },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                <h4 className="font-thin bg-blue-700 text-white w-fit px-3 rounded-md shadow">
                  {new Date(item?.picTime).toLocaleTimeString()}
                </h4>
                <h4>{item?.contributeTitle}</h4>
                <p>{item?.content}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSingleIndex(index)}
                  type="button"
                  className="text-blue-500"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => removeFromArray(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default TourGuideContributeForm;
