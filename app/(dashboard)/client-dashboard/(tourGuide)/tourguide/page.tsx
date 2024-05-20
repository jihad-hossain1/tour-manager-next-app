import { options } from "@/app/api/auth/[...nextauth]/options";
import PageContainer from "@/components/ui/pageContainer";
import { getGuidePlaceImage, getGuideReserves, getTourGuideInfo } from "@/service/query/tourGuideQuery";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React from "react";
import "./styles.css";
import { TGuideReserve } from "@/helpers/types";
import Image from "next/image";
import { client } from "@/service/query/clientQuery";

const TourGuideProfile = async () => {
  const session = await getServerSession(options);

  const clientId = session?.user?.clientId;

  const getClient = await client(clientId);

  console.log(getClient);

  const TourGuideProfile = await getTourGuideInfo(clientId);

  const clientProfileId = TourGuideProfile?.data?.id;

  const guideReserves = await getGuideReserves(clientProfileId);

  const imagesData = await getGuidePlaceImage(clientProfileId);

  return (
    <PageContainer>
      <main className="mx-6 my-10">
        <h4 className="my-10 text-center text-xl font-bold">
          Tour Guide Profile
        </h4>
        <ClientInfo clientData={getClient} />

        <div>
          {clientProfileId ? (
            <>
              {/* guide profile photo  */}
              <GuideProfilePhoto
                TourGuideProfilePhoto={TourGuideProfile?.data?.profileImage}
              />
              {/* guide profile  */}
              <GuideProfile TourGuideProfile={TourGuideProfile} />

              {/* guide tour place section  */}
              <GuidePlace TourGuideProfile={TourGuideProfile} />

              {/* guide reserve section  */}
              {TourGuideProfile?.data?.tourGuideContribution?.length > 0 ? (
                <GuideReserve guideReserves={guideReserves} />
              ) : (
                ""
              )}

              {/* tour guide place images  */}
              <GuideImages imagesData={imagesData} />
            </>
          ) : (
            <Link
              href={"/client-dashboard/tourguide/add-update-profile"}
              className="link-btn"
            >
              Add Profile Info.
            </Link>
          )}
        </div>
      </main>
    </PageContainer>
  );
};

const ClientInfo = ({ clientData }) => {
  return (
    <div>
      <h4>
        <span>Name: </span>
        <span>{clientData?.name}</span>
      </h4>
      <h4>
        <span>Email: </span>
        <span>{clientData?.email}</span>
      </h4>
    </div>
  );
};

const GuideProfilePhoto = ({ TourGuideProfilePhoto }) => {
  return (
    <div className="h-[300px] w-full">
      {TourGuideProfilePhoto ? (
        <div className="relative">
          <Image
            src={TourGuideProfilePhoto || ""}
            alt="tour-guide"
            width={300}
            height={300}
          />

          <div className="absolute bottom-1 right-1">
            <button className="link-btn">Update</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[20vh]">
          <button className="link-btn">Add Profile Image</button>
        </div>
      )}
    </div>
  );
};

const GuideProfile = ({ TourGuideProfile }) => {
  return (
    <>
      <Link
        href={`/client-dashboard/tourguide/add-update-profile/${TourGuideProfile?.data?.id}`}
        className="link-btn"
      >
        Update Profile Info.
      </Link>

      {/* guide profile  */}
      <div className="flex gap-2">
        <h4>Description: </h4>
        <div
          id="description"
          className="danger"
          dangerouslySetInnerHTML={{
            __html: TourGuideProfile?.data?.description,
          }}
          style={{ wordBreak: "break-all" }}
        />
      </div>
    </>
  );
};

const GuideReserve = ({ guideReserves }) => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={"/client-dashboard/tourguide/au-guide-reserve"}
        className="link-btn"
      >
        Add Guide Reserve
      </Link>
      <div className="flex flex-col gap-3">
        {guideReserves?.map((item: TGuideReserve, index: number) => (
          <div
            key={index}
            className="shadow hover:shadow-md rounded-md border border-gray-100 dark:border-gray-950 p-3 relative"
          >
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">{item?.contribution?.title}</h4>
              <h4 className="flex gap-4 items-center">
                <span className="text-green-600 font-semibold">
                  Total Person:{" "}
                </span>
                <span>{item?.personPic?.totalPerson}</span>
                <span>Infant: </span>
                <span>{item?.personPic?.infant || 0}</span>
                <span>Children: </span>
                <span>{item?.personPic?.children || 0}</span>
                <span>Adult: </span>
                <span>{item?.personPic?.adult}</span>
              </h4>
              <div className="flex items-center gap-6">
                <h4>Start Time: </h4>

                <div className="flex items-center gap-5">
                  {item?.startTime?.map(
                    (ite: { id: string; timePic: string }, ind: number) => (
                      <div key={ind}>
                        <h4>
                          <span>
                            {new Date(ite?.timePic).toLocaleTimeString()}
                          </span>
                        </h4>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="absolute z-10 bottom-1 right-1">
              <Link
                href={`/client-dashboard/tourguide/au-guide-reserve/${item?.id}`}
                className="link-btn "
              >
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuidePlace = ({ TourGuideProfile }) => {
  return (
    <div className="flex flex-col gap-2 my-10">
      <Link
        href={"/client-dashboard/tourguide/au-tourplace"}
        className="link-btn"
      >
        Add Tour Place
      </Link>

      <div className="flex flex-col gap-4">
        {TourGuideProfile?.data?.tourGuideContribution?.map((item, index) => (
          <div
            key={index}
            className="border border-gray-100 p-3 shadow-sm hover:shadow transition duration-300 dark:border-gray-950 relative"
          >
            <div className="flex flex-col gap-2">
              <h4 className="">{item?.title}</h4>
              <h4>
                <span>Price : </span> ${item?.price}
              </h4>
            </div>
            <div className="absolute z-10 bottom-1 right-1">
              <Link
                href={`/client-dashboard/tourguide/au-tourplace/${item?.id}`}
                className="link-btn"
              >
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuideImages = ({ imagesData }) => {
  return (
    <div className="flex flex-col gap-2 my-10">
      <Link href={"/client-dashboard/tourguide/au-images"} className="link-btn">
        Add Tour Place Images
      </Link>

      <div className="flex flex-col gap-4">
        {imagesData?.map((item, index: number) => (
          <div
            key={index}
            className="border border-gray-100 p-3 shadow-sm hover:shadow transition duration-300 dark:border-gray-950 relative"
          >
            <div className="flex flex-col gap-2">
              <h4 className="">{item?.title}</h4>
              <h4>
                Contribute for: <span>{item?.contribute?.title}</span>
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {item?.urls?.map((ite, ind) => (
                <div key={ind}>
                  <Image
                    src={ite?.image}
                    alt={item?.title}
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
            <div className="absolute z-10 bottom-1 right-1">
              <Link
                href={`/client-dashboard/tourguide/au-images/${item?.id}`}
                className="link-btn"
              >
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TourGuideProfile;
