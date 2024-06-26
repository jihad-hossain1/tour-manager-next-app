import {
  CountryResponse,
  CountryTypeResponse,
} from "./../../helpers/interface";
import { gql } from "graphql-request";

import { getClient } from "../graphqlClient";
import { CountryType } from "@/helpers/types";

export const getCountries = async (): Promise<CountryResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<CountryResponse>(
    gql`
      query getCountries {
        countries {
          id
          name
          photo
          description
          continentId
        }
      }
    `
  );
  return {
    data: gqlResponse.countries || [],
  };
};

export const getCountry = async (id: string): Promise<CountryTypeResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    country: CountryType;
  }>(
    gql`
      query getCountry($id: ID!) {
        country(id: $id) {
          id
          name
          description
          photo
          continentId
        }
      }
    `,
    { id: id }
  );
  return {
    data: gqlResponse.country,
  };
};
