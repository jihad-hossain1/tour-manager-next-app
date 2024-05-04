import { DivisionResponse } from "./../../helpers/interface";
import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";

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
