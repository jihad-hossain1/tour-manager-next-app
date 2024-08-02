import { CityResponse } from './../../helpers/interface';
import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";


export const getCities = async (): Promise<CityResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<CityResponse>(
    gql`
      query getCities {
    cities {
      id
      name
      photo
      slug
      divisionId
      description
      countryId
      
    }
  }
    `
  );
  return {
    data: gqlResponse.cities || [],
  };
};

export const getCity = async (id:string) => {
  const client = getClient();
  const gqlResponse = await client.request<CityResponse>(
    gql`
      query getCity($id: ID!) {
        getCity(id: $id) {
          id
          name
          slug
          photo
          description
          countryId
          divisionId
        }

      }
    `,
    { id: id }
  
  )


  return gqlResponse 
}


export const getCityWithTourSpots = async (slug: string) => {
  const client = getClient();
  const gqlResponse = await client.request<CityResponse>(
    gql`
      query getCityWithTourSpots($slug: String) {
        getCityWithTourSpots(slug: $slug) {
          id
          name
          slug
          photo
          description
          totalTourSpots {
            name
            photo
            slug
            division {
            name
          }
          city {
            name
          }
          country {
            name
          }
          }
        }
      }
    `,
    { slug: slug },
  );

  return gqlResponse;
};