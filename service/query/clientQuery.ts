import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";

export type TClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  clientType: string;
  role: string;
};

export const client = async (id: string): Promise<TClient> => {
  const client = getClient();
  try {
    const gqlResponse: { client: TClient } = await client.request(
      gql`
        query client($id: ID!) {
          client(id: $id) {
            id
            name
            email
            phone
            image
            clientType
            role
          }
        }
      `,
      {
        id: id,
      }
    );

    return gqlResponse.client;
  } catch (error) {
    console.log(error.message);
  }
};
