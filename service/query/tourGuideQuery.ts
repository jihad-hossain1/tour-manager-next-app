import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import {
  TSingleGuideProfileResponse,
  TTourGuideData,
} from "@/helpers/interface";

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
