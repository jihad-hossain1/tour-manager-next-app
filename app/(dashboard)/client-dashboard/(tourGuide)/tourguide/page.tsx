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
                clientProfileId={clientProfileId}
                clientId={clientId}
                clientImage={getClient?.image}
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

const GuideProfilePhoto = ({
  TourGuideProfilePhoto,
  clientImage,
  clientId,
  clientProfileId,
}) => {
  return (
    <div className="min-h-[200px] max-h-[400px] w-full my-3">
      {TourGuideProfilePhoto ? (
        <div className="relative w-full p-1">
          <Image
            src={TourGuideProfilePhoto || ""}
            alt="tour-guide"
            width={800}
            height={300}
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {clientImage ? (
              <div className="relative group">
                <Image
                  src={clientImage || ""}
                  alt="client Images"
                  width={800}
                  height={300}
                  className="border shadow-md hover:shadow-lg bg-blue-50 bg-opacity-50 w-[80px] lg:w-[200px] h-[80px] lg:h-[200px] rounded-full object-cover "
                />
                <div className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-full overflow-hidden ease-in-out transition duration-500"></div>
                <Link
                  href={`/client-dashboard/au-client-image/${clientId}`}
                  className=" absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nowrap lg:bg-white lg:text-xs lg:rounded-md lg:px-3 lg:py-1 text-green-600"
                >
                  <span className="lg:block hidden">Up Image</span>
                  <span className="lg:hidden block text-white text-3xl ">
                    +
                  </span>
                </Link>
              </div>
            ) : (
              <div className="border shadow-md hover:shadow-lg bg-blue-50 bg-opacity-50 w-[80px] lg:w-[200px] h-[80px] lg:h-[200px] rounded-full object-cover flex flex-col justify-center items-center gap-2">
                <h3 className="text-center text-xs lg:text-xl lg:font-bold text-red-400">
                  No Image
                </h3>
                <Link
                  href={"/client-dashboard/au-client-image"}
                  className=" text-nowrap lg:bg-white lg:text-xs lg:rounded-md lg:px-3 lg:py-1 text-green-600"
                >
                  <span className="lg:block hidden">Add Image</span>
                  <span className="lg:hidden block text-white text-3xl ">
                    +
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div className="absolute top-1 left-1  hover:bg-zinc-900 w-full h-full hover:bg-opacity-50 transition ease-in-out duration-300"></div>

          <div className="absolute bottom-2 right-1">
            <Link
              href={`/client-dashboard/tourguide/au-profileimage/${clientProfileId}`}
              color="primary"
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md"
            >
              Update
            </Link>
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
