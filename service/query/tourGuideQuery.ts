import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import {
  TGuidePlaceImages,
  TSingleGuideProfileResponse,
  TTourGuideData,
} from "@/helpers/interface";
import { TGuideReserve, TTourGuidePlace } from "@/helpers/types";

export type TTGuideInfo = {
  id: string;
  clientInfo: {
    name: string;
    image: string;
  };
  about: string;
  city: {
    name: string;
  };
};

export interface TTGuideResponse {
  map(
    arg0: (_guide: any, index: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  getTourGuides: TTGuideInfo[];
}

export const getTourGuides = async (): Promise<TTGuideResponse> => {
  const client = getClient();

  try {
    const gqlResponse: { getTourGuides: TTGuideResponse } =
      await client.request(gql`
        query getTourGuides {
          getTourGuides {
            id
            about
            clientInfo {
              name
              image
            }
            city {
              name
            }
          }
        }
      `);

    return gqlResponse.getTourGuides;
  } catch (error) {
    console.error(error.message);
  }
};

export const getTourGuideInfo = async (
  id: string
): Promise<TSingleGuideProfileResponse> => {
  try {
    const client = getClient();

    const gqlResponse = await client.request<{
      tourGuideProfile: TTourGuideData;
    }>(
      gql`
        query tourGuideProfile($id: ID!) {
          tourGuideProfile(id: $id) {
            id
            description
            profileImage
            languages
            responseTime
            type
            uptoPeople
            cityId
            countryId
            clientId
            tourGuideContribution {
              id
              title
              price
            }
          }
        }
      `,
      { id }
    );

    return {
      data: gqlResponse.tourGuideProfile,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getTourGuideDetails = async (id: string): Promise<any> => {
  try {
    const client = getClient();

    const gqlResponse = await client.request<{
      getTourGuide: any;
    }>(
      gql`
        query getTourGuide($id: ID!) {
          getTourGuide(id: $id) {
            id
            description
            about
            responseTime
            type
            profileImage
            clientInfo {
              id
              name
              image
            }
            images {
              id
              title
              urls {
                id
                image
              }
            }
            tourGuideContribution {
              id
              title
              price
            }
            tourGuideReserve {
              id
              guideContribution
              datePic
              startTime {
                id
                timePic
              }
              personPic {
                id
                adult
                children
                infant
                totalPerson
              }
            }
            guideReview {
              id
              title
              content
              rating
              replies {
                id
                title
                content
              }
            }
            tourGuideContributionDetail {
              id
              notice
              notIncludes {
                id
                notInclude
              }
              additionalInfo {
                id
                info
              }
            }
          }
        }
      `,
      { id }
    );

    return {
      data: gqlResponse.getTourGuide,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTourGuideInfoShort = async (
  id: string
): Promise<TSingleGuideProfileResponse> => {
  try {
    const client = getClient();

    const gqlResponse = await client.request<{
      tourGuideProfile: TTourGuideData;
    }>(
      gql`
        query tourGuideProfile($id: ID!) {
          tourGuideProfile(id: $id) {
            id
            uptoPeople
            cityId
            countryId
            clientId
            profileImage
          }
        }
      `,
      { id }
    );

    return {
      data: gqlResponse.tourGuideProfile,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTourGuideProfile = async (
  id: string
): Promise<TSingleGuideProfileResponse> => {
  try {
    const client = getClient();

    const gqlResponse = await client.request<{ getTourGuide: TTourGuideData }>(
      gql`
        query getTourGuide($id: ID!) {
          getTourGuide(id: $id) {
            id
            description
            profileImage
            languages
            responseTime
            type
            uptoPeople
            cityId
            countryId
            clientId
            about
          }
        }
      `,
      { id }
    );

    return {
      data: gqlResponse.getTourGuide,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getGuidePlace = async (id: string): Promise<any> => {
  try {
    const client = getClient();
    const gqlResponse: { tourGuidePlace: TTourGuidePlace } =
      await client.request(
        gql`
          query getGuidePlace($id: ID!) {
            tourGuidePlace(id: $id) {
              id
              title
              price
              about
              clientProfileID
              tourPlaceId
              contribute {
                picTime
                contributeTitle
                content
              }
            }
          }
        `,
        {
          id,
        }
      );
    return gqlResponse.tourGuidePlace;
  } catch (error) {
    return error.message;
  }
};

export const getGuideContributions = async (id: string): Promise<any> => {
  try {
    const client = getClient();
    const gqlResponse: { getGuideContributions: TTourGuidePlace } =
      await client.request(
        gql`
          query getGuideContribute($id: ID!) {
            getGuideContributions(id: $id) {
              id
              title
            }
          }
        `,
        {
          id,
        }
      );

    return gqlResponse.getGuideContributions;
  } catch (error) {
    return error.message;
  }
};

export const getGuideReserves = async (id: string): Promise<TGuideReserve> => {
  const client = getClient();
  try {
    const gqlResponse: { getGuideReservs: TGuideReserve } =
      await client.request(
        gql`
          query getGuideReservs($id: ID!) {
            getGuideReservs(id: $id) {
              id
              personPic {
                id
                infant
                children
                adult
                totalPerson
              }
              startTime {
                id
                timePic
              }
              contribution {
                title
              }
            }
          }
        `,
        {
          id,
        }
      );

    return gqlResponse.getGuideReservs;
  } catch (error) {
    console.error(error.message);
  }
};

export const getGuideReserve = async (id: string): Promise<TGuideReserve> => {
  const client = getClient();
  try {
    const gqlResponse: { getGuideReserve: TGuideReserve } =
      await client.request(
        gql`
          query getGuideReserve($id: ID!) {
            getGuideReserve(id: $id) {
              id
              guideContribution
              personPic {
                id
                infant
                children
                adult
                totalPerson
              }
              startTime {
                id
                timePic
              }
            }
          }
        `,
        {
          id,
        }
      );

    return gqlResponse.getGuideReserve;
  } catch (error) {
    console.error(error.message);
  }
};

export const getGuidePlaceImage = async (
  clientProfileID: string
): Promise<TGuidePlaceImages[]> => {
  const client = getClient();

  try {
    const gqlResponse: { getGuidePlaceImages: TGuidePlaceImages[] } =
      await client.request(
        gql`
          query getGuidePlaceImages($clientProfileID: ID!) {
            getGuidePlaceImages(clientProfileID: $clientProfileID) {
              id
              title
              contribute {
                title
              }
              urls {
                id
                image
              }
            }
          }
        `,
        {
          clientProfileID,
        }
      );

    return gqlResponse.getGuidePlaceImages;
  } catch (error) {
    console.error(error.message);
  }
};

