import { gql } from "graphql-request";
import { getClient } from "@/service/graphqlClient";
// import { getClient } from "@/service/graphqlClient";

// Function to perform mutation
export const createCity = async (cityData) => {
  const client = getClient(false);
  const gqlResponse = await client.request(
    gql`
      mutation addCity(
        $name: String
        $description: String
        $divisionId: ID
        $photo: String
        $countryId: ID
      ) {
        addCity(
          name: $name
          description: $description
          divisionId: $divisionId
          photo: $photo
          countryId: $countryId
        ) {
          id
          name
          photo
        }
      }
    `,
    {
      name: cityData.name,
      description: cityData.description,
      photo: cityData.photo,
      countryId: cityData.countryId,
      divisionId: cityData.divisionId,
    }
  );

  return {
    data: gqlResponse?.addCity || null,
  };
};
