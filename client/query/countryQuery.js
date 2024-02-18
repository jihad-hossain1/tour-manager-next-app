import { gql } from "@apollo/client";

const GET_COUNTIRES = gql`
  #graphql
  query getCountries {
    countries {
      id
      name
      photo
    }
  }
`;
const GET_DIVISIONS = gql`
  #graphql
  query getDivision {
    divisions {
      id
      name
    }
  }
`;
const GET_CITIE = gql`
  #graphql
  query getCities {
    cities {
      id
      name
      photo
      description
    }
  }
`;
const GET_CITIY = gql`
  #graphql
  query GetCity($id: ID!) {
    getCity(id: $id) {
      id
      name
      photo
      description
    }
  }
`;
const GET_CITIES_BY_COUNTRY = gql`
  #graphql
  query GetCityByCountry($id: ID!) {
    getCityByCountry(id: $id) {
      id
      name
      photo
      description
    }
  }
`;

export {
  GET_COUNTIRES,
  GET_DIVISIONS,
  GET_CITIE,
  GET_CITIY,
  GET_CITIES_BY_COUNTRY,
};
