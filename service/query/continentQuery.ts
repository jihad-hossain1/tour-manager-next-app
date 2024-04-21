import { gql } from "graphql-request";
// import { getClient } from "@/service/graphqlClient";
import { ContinentResponse } from "@/helpers/interface";
import { Continent } from "@/helpers/types";
import { getClient } from "../graphqlClient";



export const getAllContinents = async (): Promise<ContinentResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<ContinentResponse>(
    gql`
      query getAllContinent {
        continents {
          name
          id
          img
          code
        }
      }
    `
  );
  return {
    data: gqlResponse.continents || [],
  };
};

export const getContinent = async (id: string): Promise<ContinentResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<{ singleContinent: Continent }>(
    gql`
      query getContinent($id: ID!) {
        singleContinent(id: $id) {
          id
          name
        }
      }
    `,
    { id: id }
  );
  return {
    data: gqlResponse.singleContinent ? [gqlResponse.singleContinent] : [],
  };
};
