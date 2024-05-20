import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";

export const createClientImage = async (imageData) => {
  const client = getClient();
  try {
    const gqlResponse = await client.request(
      gql`
        mutation addClientImage($image: String!, $id: ID!) {
          addClientImage(image: $image, id: $id) {
            id
            image
          }
        }
      `,
      {
        id: imageData.id,
        image: imageData.image,
      }
    );
    console.log(gqlResponse);
    return gqlResponse;
  } catch (error) {
    console.log(error);
  }
};
