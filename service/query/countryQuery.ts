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
          slug
        }
      }
    `
  );
  console.log("🚀 ~ getCountries ~ gqlResponse:", gqlResponse)
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

export const getCountryWithTourSpot = async (slug: string): Promise<CountryTypeResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{
    country_by_slug: CountryType;
  }>(
    gql`
      query getCountry($slug: String!) {
        country_by_slug(slug: $slug) {
          id
          name
          description
          photo
          continentId
          touristSpots{
            name
            slug 
            photo
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
    { slug: slug }
  );
  return {
    data: gqlResponse.country_by_slug,
  };
};
