
import { gql } from 'graphql-request';
import { getClient } from '../graphqlClient';
import { TCreateTourSpotResponse, TTourSpotData,TTourSpotResponse, TUpdateTourSpotResponse } from '@/helpers/interface';



export const createTourSpot = async (tourSpot: TTourSpotData): Promise<TCreateTourSpotResponse> => {
  const client = getClient();
  const gqlResponse: { addTourSpot: TTourSpotResponse } = await client.request(
    gql`
      mutation addTourSpot(
        $name: String
        $slug: String
        $description: String
        $divisionId: ID
        $photo: String
        $countryId: ID
        $cityId: ID
      ) {
        addTourSpot(
          name: $name
          slug: $slug
          description: $description
          divisionId: $divisionId
          photo: $photo
          countryId: $countryId
          cityId: $cityId
        ) {
          id
          name
          photo
        }
      }
    `,
    {
      name: tourSpot.name,
      slug: tourSpot.slug,
      description: tourSpot.description,
      photo: tourSpot.photo,
      cityId: tourSpot.cityId,
      divisionId: tourSpot.divisionId,
      countryId: tourSpot.countryId
    }
  );

  return {
    data: gqlResponse?.addTourSpot || null,
  };
};


export const updateTourSpot = async (tourSpot: TTourSpotData): Promise<TUpdateTourSpotResponse> => {
  const client = getClient()
  const response: {updateTourSpot: TTourSpotResponse} = await client.request(
    gql`
    mutation updateTourSpot(
        $id: ID
        $name: String
        $slug: String
        $description: String
        $divisionId: ID
        $photo: String
        $countryId: ID
        $cityId: ID){
          updateTourspot(
          id: $id
          name: $name
          slug: $slug
          description: $description
          divisionId: $divisionId
          photo: $photo
          countryId: $countryId
          cityId: $cityId){
            id 
            description
            photo 
            divisionId
            countryId 
            cityId
            name
            slug
          }
        }
    `,
    {
      id: tourSpot.id,
      name: tourSpot.name,
      slug: tourSpot.slug,
      description: tourSpot.description,
      countryId: tourSpot.countryId,
      photo: tourSpot.photo,
      cityId: tourSpot.cityId,
      divisionId: tourSpot.divisionId
    }
  )

  return {
    data: response.updateTourSpot
  }
}