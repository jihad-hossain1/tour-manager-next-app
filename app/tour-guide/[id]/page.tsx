import PageContainer from "@/components/ui/pageContainer";
import { Avatar, Rating, Typography } from "@mui/material";
import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import ImageGellary from "@/components/tourGuide/ImageGellary";
import SingleTourGuidePerson from "@/components/tourGuide/SingleTourGuidePerson";
import ShareTourGuidePerson from "@/components/tourGuide/ShareTourGuidePerson";
import TourGuiderReview from "@/components/tourGuide/TourGuiderReview";
import MessageTourGuide from "@/components/tourGuide/MessageTourGuide";
import { getTourGuideDetails } from "@/service/query/tourGuideQuery";
import { TTourGuide } from "@/helpers/guideType";

const SingleTourGuidepage = async ({ params }) => {
  const { id } = params;
  const splitId = id?.split("%3D")[1];
  const guideDetails: TTourGuide = await getTourGuideDetails(splitId);
  console.log("🚀 ~ SingleTourGuidepage ~ guideDetails:", guideDetails);

  const _images = guideDetails?.data?.images;
  const _review = guideDetails?.data?.guideReview;
  const tourGuideReserve = guideDetails?.data?.tourGuideReserve;
  const tourGuideContribution = guideDetails?.data?.tourGuideContribution;
  const clientInfo = guideDetails?.data?.clientInfo;

  return (
    <PageContainer>
      <section className="max-w-screen-xl mx-auto px-3 ">
        <div className="my-4 py-2 bg-blue-100/25 rounded">
          <ShareTourGuidePerson />
        </div>
        <ImageGellary images={_images} />
        {/* <div className="w-full bg-slate-400 h-1"></div> */}
        <section className="flex gap-10 my-12 ">
          {/* details section  */}
          <main className="relative flex flex-col gap-6 lg:gap-10 lg:w-[60%]">
            {/* tour guider avater with information */}
            <div className="flex gap-3 items-center">
              <Avatar src={clientInfo?.image} alt="guide image" />
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  <span className="text-blue-900">{clientInfo?.name}</span>
                </Typography>
                <div className="flex gap-1 items-center text-xs">
                  <div className="w-fit flex items-center gap-1">
                    <Rating readOnly value={5} />
                    <span className="font-semibold"> {`${0}/5`}</span>
                  </div>
                  <div className="w-fit font-bold">{`(${0} reviews)`}</div>
                </div>
              </div>
            </div>
            {/* Tour Categories */}
            <div className="flex flex-col gap-10">
              <h4 className="text-3xl ">
                <span className="border-b-[3px] pb-1 border-blue-600 w-fit">
                  Tour
                </span>{" "}
                Categories
              </h4>

              <div className="w-fit flex flex-col gap-4 items-center">
                <div className="bg-gray-300 p-4 rounded-full">
                  <IoFastFoodOutline size={23} />
                </div>
                <h4 className="text-sm text-blue-800">
                  {" "}
                  {guideDetails?.data?.type}{" "}
                </h4>
              </div>
            </div>
            {/* About Tour Guide */}
            <div className="flex flex-col gap-10">
              <h4 className="text-3xl ">
                <span className="border-b-[3px] pb-1 border-blue-600 w-fit">
                  About
                </span>{" "}
                Tour Guide {clientInfo?.name}
              </h4>

              <div className="w-fit ">
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: guideDetails?.data?.description || "<p></p>",
                  }}
                />
              </div>
            </div>
            {/* Important */}
            <div className="flex flex-col gap-10">
              <h4 className="text-3xl ">
                <span className="border-b-[3px] pb-1 border-blue-600 w-fit">
                  Important
                </span>{" "}
              </h4>

              <div className="w-fit ">
                <p>{"important notice..."}</p>
              </div>
            </div>
            {/* Tours */}
            <SingleTourGuidePerson
              tourGuideContribution={tourGuideContribution}
            />
            {/* Tour Reviews */}
            <TourGuiderReview />
          </main>

          {/* message section  */}
          <aside className="sticky top-20">
            <MessageTourGuide />
          </aside>
        </section>
      </section>
    </PageContainer>
  );
};

export default SingleTourGuidepage;
