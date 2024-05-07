import { DivisionResponse } from "./../../helpers/interface";
import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import { DivisionType } from "@/helpers/types";

export const getDivisions = async (): Promise<DivisionResponse> => {
  const client = getClient();
  const gqlResponse = await client.request<DivisionResponse>(
    gql`
      query getDivisions {
        divisions {
          id
          countryId
          name
          photo
          description
        }
      }
    `
  );

  return {
    data: gqlResponse.divisions || [],
  };
};

export const getDivision = async (id: string): Promise<DivisionType> => {
  const client = getClient();
  const gqlResponse = await client.request<{ division: DivisionType}>(
    gql`
      query getDivision($id: ID!) {
        division(id: $id) {
          id
          countryId
          name
          photo
          description
        }
      }
    `,
    { id: id }
  );
  return gqlResponse.division 
}