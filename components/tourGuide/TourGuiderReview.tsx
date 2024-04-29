import React from "react";
import { Avatar, Card, Paper, Rating } from "@mui/material";

const TourGuiderReview = () => {
  return (
    <div>
      <h4 className="text-3xl ">
        <span className="border-b-[3px] pb-1 border-blue-600 w-fit">
          Rababe E.
        </span>{" "}
        Morocco Tour Reviews
      </h4>
      <div className="mt-16 flex flex-col gap-6 lg:gap-10">
        {[1, 2, 3].map((review, _i) => (
          <div key={_i} className="">
            <Card style={{ padding: "14px", borderRadius: "12px" }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar src="" alt="review user" />
                  <h4 className="text-blue-800 ">{`Matjaz K`}</h4>
                  <Rating size="small" value={4} />
                  <span className="text-sm font-semibold">{`${5}/${5} `}</span>
                </div>
                <div className="text-sm">Dec 29, 2023</div>
              </div>
              <hr className="h-[1px] bg-zinc-700 my-5" />
              <h4 className="font-semibold text-xl">{`“ Best Travel Experience of our Life ”`}</h4>
              <p className="text-sm my-3">
                Our sightseeing trip in and around the outskirts of Tangier was
                truly made memorable by Rababe. She is an outstanding private
                guide with an impressive grasp of local culture and history. She
                added depth to every destination without overwhelming us. It is
                important to note that her warmth and friendliness created a
                personal touch, making each moment feel special. We felt
                comfortable and welcome. Overall,
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuiderReview;
