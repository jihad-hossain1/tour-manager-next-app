import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import { TSingleTourSpotResponse, TTourSpotResponse, TourSpotDetailResponse, TourSpotResponse } from "@/helpers/interface";
import { TourSpotDetailType, TourSpotType } from "@/helpers/types";

export const getTourSpotDetails = async (
  slug: string
): Promise<TourSpotDetailResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    singleTourspotDetails: TourSpotDetailType;
  }>(
    gql`
      query getSingleTourspotDetails($slug: String!) {
        singleTourspotDetails(slug: $slug) {
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
    { slug: slug }
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


export const getPaginatatedTourSpots = async (search:string, limit:number, page:number): Promise<TourSpotResponse> =>{
  const client = getClient();
  const gqlResponse = await client.request<{
    tourSpotsPagination: TourSpotType[];
  }>(
    gql`
      query getTourSpots($search: String, $limit: Int, $page: Int) {
        tourSpotsPagination(search: $search, limit: $limit, page: $page) {
          id
          name
          photo
          slug
        }
      }
    `,
    { search: search, limit: limit, page: page }
  )

  return {
    data: gqlResponse.tourSpotsPagination || []
  }
}


export const getTourSpot = async (id: string): Promise<TSingleTourSpotResponse> => {
  const client = getClient()
  const response: { singleTourspot: TourSpotType } = await client.request(
    gql`
      query getTourSpot($id: ID){
        singleTourspot(id: $id){
          id 
          name
          photo 
          description
          cityId 
          divisionId 
          countryId
          slug
        }
      }
    `, {
      id: id
    }
  )

  return {
    data: response?.singleTourspot || null
  }
}

