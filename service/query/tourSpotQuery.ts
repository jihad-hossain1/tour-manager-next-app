import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import { TourSpotDetailResponse, TourSpotResponse } from "@/helpers/interface";
import { TourSpotDetailType, TourSpotType } from "@/helpers/types";

export const getTourSpotDetails = async (
  id: string
): Promise<TourSpotDetailResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    singleTourspotDetails: TourSpotDetailType;
  }>(
    gql`
      query getSingleTourspotDetails($id: ID!) {
        singleTourspotDetails(id: $id) {
          id
          name
          description
          photo
          perfectTourTime
          howToGoThere
          howToStayThere
          howDoHere
          whereToEat
          tourTipsGuide
          topTourPlace
          cityId
          city {
            id
            name
          }
          reviews {
            id
            name
            title
            email
            img
            rating
            createdAt
            content
            replies {
              id
              name
              email
              img
              createdAt
              content
            }
          }
        }
      }
    `,
    { id: id }
  );
  return {
    data: gqlResponse.singleTourspotDetails,
  };
};

export const getTourSpotByCountryId = async (
  countryId: string
): Promise<TourSpotResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    tourSpotsByCountryId: TourSpotType;
  }>(
    gql`
      query getTourSpotByCountryId($countryId: ID!) {
        tourSpotsByCountryId(countryId: $countryId) {
          id
          name
          photo
        }
      }
    `,
    { countryId: countryId }
  );
  return {
    data: gqlResponse.tourSpotsByCountryId
      ? [gqlResponse.tourSpotsByCountryId]
      : [],
  };
};

export const getAllTourSpots = async (): Promise<TourSpotResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    tourSpots: TourSpotType[];
  }>(
    gql`
      query getAllTourSpots {
        tourSpots {
          id
          name
          photo
        }
      }
    `
  );
  return {
    data: gqlResponse.tourSpots || [],
  };
}