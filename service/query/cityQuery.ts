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
      description
    }
  }
    `
  );
  return {
    data: gqlResponse.cities || [],
  };
};