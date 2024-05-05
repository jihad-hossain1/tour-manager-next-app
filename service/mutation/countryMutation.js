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
      ) {
        addCity(
          name: $name
          description: $description
          divisionId: $divisionId
          photo: $photo
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
      continentId: countryData.continentId,
      photo: countryData.photo,
    }
  );

  return {
    data: gqlResponse?.addCountry || null,
  };
};


export const updateCountry = async (countryData) => {
  const client = getClient(false);
  const gqlResponse = await client.request(
    gql`
      mutation updateCountry(
        $id: ID
        $name: String
        $description: String
        $continentId: ID
        $photo: String
      ) {
        updateCountry(
          id: $id
          name: $name
          description: $description
          continentId: $continentId
          photo: $photo
        ) {
          id
          name
          photo
          description
          continentId
        }
      }
    `,
    {
      id: countryData.id,
      name: countryData.name,
      description: countryData.description,
      continentId: countryData.continentId,
      photo: countryData.photo,
    }
  );

  return {
    data: gqlResponse?.updateCountry || null,
  }
}