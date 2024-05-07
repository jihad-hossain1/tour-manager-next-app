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
      divisionId: cityData.divisionId,
      countryId: cityData.countryId
    }
  );

  return {
    data: gqlResponse?.addCity || null,
  };
};

export const updataCity = async (cityData) => {
  const client = getClient();
  const gqlResponse = await client.request(
    gql`
      mutation updateCity(
        $id: ID
        $name: String
        $description: String
        $divisionId: ID
        $countryId: ID
        $photo: String
      ){
        updateCity(
          id: $id
          name: $name
          description: $description
          divisionId: $divisionId
          photo: $photo
          countryId: $countryId
        ) {
          id
          name
          photo
          description
          divisionId
          countryId
        }

      }
    `,
    {
      id: cityData.id,
      divisionId: cityData.divisionId,
      name: cityData.name,
      photo: cityData.photo,
      description: cityData.description,
      countryId: cityData.countryId
    }
    
  )
console.log(gqlResponse);
  return gqlResponse || null
}


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

export const createDivision = async (divisionData) => {
  const client = getClient(false);
  const gqlResponse = await client.request(
    gql`
      mutation addDivision(
        $name: String
        $description: String
        $countryId: ID
        $photo: String
      ) {
        addDivision(
          name: $name
          description: $description
          countryId: $countryId
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
      name: divisionData.name,
      description: divisionData.description,
      countryId: divisionData.countryId,
      photo: divisionData.photo,
    }
  );

  return {
    data: gqlResponse?.addDivision || null,
  }
}


export const updateDivision = async (divisionData) => {
  const client = getClient();
  const gqlResponse = await client.request(
    gql`
      mutation updateDivision(
        $id: ID
        $name: String
        $description: String
        $countryId: ID
        $photo: String
      ) {
        updateDivision(
          id: $id
          name: $name
          description: $description
          countryId: $countryId
          photo: $photo
        ) {
          id
          name
          photo 
          description
          countryId
        }
      }
    `,
    {
      id: divisionData.id,
      name: divisionData.name,
      description: divisionData.description,
      countryId: divisionData.countryId,
      photo: divisionData.photo,
    }
  );

  return {
    data: gqlResponse?.updateDivision || null,
  }
}