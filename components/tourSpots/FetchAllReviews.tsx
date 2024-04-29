import { ReviewType } from "@/helpers/types";
import { timeFormate } from "@/utils/timeFormate";
import { Avatar, Button, Rating } from "@mui/material";
import React from "react";
import { SlLike } from "react-icons/sl";


const FetchAllReviews = ({ reviews, tid }) => {

  return (
    <section className="flex flex-col gap-5">
      {reviews
        ?.slice()
        .reverse()
        .map((review: ReviewType) => (
          <div key={review?.id}  >
            {/* review section  */}
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Avatar src={review?.img} alt="user image" />
                <div>
                  <h4 className="font-semibold text-sm">{review?.name}</h4>
                  <span className="text-xs">{timeFormate(review?.createdAt)}</span>
                  <Rating
                    size="small"
                    name="half-rating-read"
                    value={review?.rating}
                    readOnly
                  />
                </div>
              </div>
              <div className="relative flex items-center ">
                <Button
                  color="info"
                  variant="text"
                  className="flex items-center gap-1"
                >
                  <SlLike />
                  <span>{2}</span>
                </Button>
                {/* review delete section start */}
                {/* <ManageReview rid={review?.id} review={review} id={id} /> */}
                {/* review delete section end */}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-xl">{review?.title}</h4>
              <p>{review?.content}</p>
            </div>

            <section
              className={`ml-10 md:ml-20   rounded-md flex flex-col gap-3 transition-all duration-500`}
            >
              {
                review?.replies
                  ?.slice()
                  .reverse()
                  .map((reply) => (
                    <div
                      key={reply?.id}
                      className="p-2 flex flex-col gap-2 shadow-sm  "
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <Avatar src={reply?.img} alt="user image" />
                          <div>
                            <h4 className="font-semibold text-lg">
                              {reply?.name}
                            </h4>
                            <span className="text-sm">
                              {timeFormate(reply?.createdAt)}
                              {/* {console.log(reply?.createdAt)} */}
                            </span>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <Button
                            color="info"
                            variant="text"
                            className="flex items-center gap-1"
                          >
                            <SlLike />
                            <span>{0}</span>
                          </Button>
                          {/* review delete section start */}
                          {/* <ManageReply reply={reply} id={id} /> */}
                          {/* review delete section end */}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 pb-3">
                        {/* <h4 className="font-semibold text-xl">{reply?.title}</h4> */}
                        <p>{reply?.content}</p>
                      </div>
                    </div>
                  ))}
            </section>
          </ div>
        ))}
    </section>
  );
};

export default FetchAllReviews;
