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