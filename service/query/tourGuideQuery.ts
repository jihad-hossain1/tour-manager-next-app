import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import {
  TSingleGuideProfileResponse,
  TTourGuideData,
} from "@/helpers/interface";
import { TGuideReserve, TTourGuidePlace } from "@/helpers/types";

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