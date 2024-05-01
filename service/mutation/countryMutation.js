import { gql } from "graphql-request";
import { getClient } from "@/service/graphqlClient";

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


export const createCountry = async (countryData) => {
  const client = getClient(false);
  const gqlResponse = await client.request(
    gql`
      mutation addCountry(
        $name: String
        $description: String
        $continentId: ID
        $photo: String
      ) {
        addCountry(
          name: $name
          description: $description
          continentId: $continentId
          photo: $photo
        ) {
          id
          name
          photo
          description
        }
      }
    `,
    {
      name: countryData.name,
      description: countryData.description,
      continetId: countryData.continentId,
      photo: countryData.photo,
    }
  );

  return {
    data: gqlResponse?.addCountry || null,
  };
};
