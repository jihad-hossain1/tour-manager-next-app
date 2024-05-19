import React, { useState } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import toast from "react-hot-toast";
import { uptoPeople_prefix } from "@/constat";

const PersonPickers = ({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  previousTotal
}) => {
  const [totalPeople, setTotalPeople] = useState(0);

  const incrementCount = (type) => {
    if (type === "adults" && adults < uptoPeople_prefix) {
      setAdults(adults + 1);
      updateTotalPeople(adults + 1, children, infants);
    } else if (type === "children") {
      setChildren(children + 1);
      updateTotalPeople(adults, children + 1, infants);
    } else if (type === "infants") {
      setInfants(infants + 1);
      updateTotalPeople(adults, children, infants + 1);
    }
  };

  const decrementCount = (type) => {
    if (type === "adults" && adults > 0) {
      setAdults(adults - 1);
      updateTotalPeople(adults - 1, children, infants);
    } else if (type === "children" && children > 0) {
      setChildren(children - 1);
      updateTotalPeople(adults, children - 1, infants);
    } else if (type === "infants" && infants > 0) {
      setInfants(infants - 1);
      updateTotalPeople(adults, children, infants - 1);
    }
  };

  const updateTotalPeople = (newAdults, newChildren, newInfants) => {
    const total = newAdults + newChildren + newInfants;
    if (total <= uptoPeople_prefix) {
      setTotalPeople(total);
    } else {
      toast.error(
        "Total number of people exceeds the maximum capacity for adults."
      );
    }
  };

  const isAdultsFull = totalPeople >= uptoPeople_prefix;

  return (
    <div>
      <h2>Person choice</h2>
      <div className="flex items-center gap-4">
        <p>Total People: {previousTotal || totalPeople}</p>
        <p>Max People {uptoPeople_prefix} </p>
      </div>
      <section className="flex items-center gap-4">
        <h4>Adults: </h4>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => incrementCount("adults")}
            disabled={isAdultsFull}
          >
            <CiSquarePlus size={25} />
          </button>
          <p>{adults}</p>
          <button
            type="button"
            onClick={() => decrementCount("adults")}
            disabled={adults === 0}
          >
            <CiSquareMinus size={25} />
          </button>
        </div>
        <h4>Children: </h4>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => incrementCount("children")}
            disabled={isAdultsFull}
          >
            <CiSquarePlus size={25} />
          </button>
          <p>{children}</p>
          <button
            type="button"
            onClick={() => decrementCount("children")}
            disabled={children === 0}
          >
            <CiSquareMinus size={25} />
          </button>
        </div>
        <h4>Infants: </h4>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => incrementCount("infants")}
            disabled={isAdultsFull}
          >
            <CiSquarePlus size={25} />
          </button>
          <p> {infants}</p>
          <button
            type="button"
            onClick={() => decrementCount("infants")}
            disabled={infants === 0}
          >
            <CiSquareMinus size={25} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PersonPickers;

// export default PersonPickers;
