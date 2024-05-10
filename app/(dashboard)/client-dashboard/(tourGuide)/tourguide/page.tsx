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
      <h4 className="my-10 text-center text-xl font-bold">
        Tour Guide Profile
      </h4>
      <div>
        {TourGuideProfile?.data?.id ? (
          <>
            <Link
              href={`/client-dashboard/tourguide/add-update-profile/${TourGuideProfile?.data?.id}`}
              className="link"
            >
              Udate Profile Info.
            </Link>

            <div>
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
        ) : (
          <Link
            href={"/client-dashboard/tourguide/add-update-profile"}
            className="link"
          >
            Add Profile Info.
          </Link>
        )}
      </div>
    </PageContainer>
  );
};

export default TourGuideProfile;
