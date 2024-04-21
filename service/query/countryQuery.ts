import { CountryResponse } from './../../helpers/interface';
import { gql } from "graphql-request";

import { getClient } from "../graphqlClient";



export const getCountries = async (): Promise<CountryResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<CountryResponse>(
    gql`
      query getCountries {
    countries {
      id
      name
      photo
    }
  }
    `
  );
  return {
    data: gqlResponse.countries || [],
  };
};