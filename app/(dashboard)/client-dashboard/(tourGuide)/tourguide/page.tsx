import { options } from "@/app/api/auth/[...nextauth]/options";
import PageContainer from "@/components/ui/pageContainer";
import { getTourGuideInfo } from "@/service/query/tourGuideQuery";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React from "react";
import "./styles.css";

const TourGuideProfile = async () => {
  const session = await getServerSession(options);
  const clientId = session?.user?.clientId;

  const TourGuideProfile = await getTourGuideInfo(clientId);

  return (
    <PageContainer>
      <main className="mx-6 my-10">
        <h4 className="my-10 text-center text-xl font-bold">
          Tour Guide Profile
        </h4>
        <div>
          {TourGuideProfile?.data?.id ? (
            <>
              <Link
                href={`/client-dashboard/tourguide/add-update-profile/${TourGuideProfile?.data?.id}`}
                className="link-btn"
              >
                Udate Profile Info.
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

              {/* guide tour place section  */}
              <div className="flex flex-col gap-2 my-10">
                <Link
                  href={"/client-dashboard/tourguide/au-tourplace"}
                  className="link-btn"
                >
                  Add Tour Place
                </Link>

                <div className="flex flex-col gap-4">
                  {TourGuideProfile?.data?.tourGuideContribution?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="border border-gray-100 p-3 shadow-sm hover:shadow transition duration-300 dark:border-gray-950"
                      >
                        <div className="flex items-center gap-2">
                          <h4 className="">{item?.title}</h4>
                          <Link
                            href={`/client-dashboard/tourguide/au-tourplace/${item?.id}`}
                            className="link-btn"
                          >
                            Update
                          </Link>
                        </div>
                        <h4>
                          <span>Price : </span> ${item?.price}
                        </h4>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* guide reserve section  */}
              {TourGuideProfile?.data?.tourGuideContribution?.length > 0 ? (
                <div>
                  <Link href={'/client-dashboard/tourguide/au-guide-reserve'} className="link-btn">
                    Add Guide Reserve
                  </Link>

                </div>
              ) : ''}

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

export default TourGuideProfile;
