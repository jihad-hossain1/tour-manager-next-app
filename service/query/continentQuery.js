import { gql } from "graphql-request";
import { getClient } from "@/service/graphqlClient";

export const getAllContinents = async () => {
  const client = getClient(false);
  const gqlResponse = await client.request(
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
    data: gqlResponse?.continents || [],
  };
};

export const getContinent = async (id) => {
  const client = getClient();
  const gqlResponse = await client.request(
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
    data: gqlResponse?.singleContinent || {},
  };
};
