import React from "react";
import { FaStar } from "react-icons/fa";

const TourReviwBox = () => {
  return (
    <>
      <div className="md:flex justify-between items-center">
        <div>
          {/* count review  */}
          <div className="flex justify-center items-center flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" size={25} />
              <h4 className="text-4xl w-fit font-bold">{`${5}/${5}`}</h4>
            </div>
            <h4 className="font-semibold text-2xl">{`Excellent`}</h4>
            <h4>{`(${3} reviews)`}</h4>
          </div>
        </div>
        <hr className="h-20 hidden md:block w-[1px] bg-slate-500" />
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <label htmlFor="Excellent">Excellent</label>
            <input value={100} className="border " readOnly type="range" />
            <span>{`${4}`}</span>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="Very Good">Very Good</label>
            <input value={0} className="border " readOnly type="range" />
            <span>{`${0}`}</span>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="Very Good">Very Good</label>
            <input value={0} className="border " readOnly type="range" />
            <span>{`${0}`}</span>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="Poor">Poor</label>
            <input value={0} className="border " readOnly type="range" />
            <span>{`${0}`}</span>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="Terrible">Terrible</label>
            <input value={0} className="border " readOnly type="range" />
            <span>{`${0}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourReviwBox;
