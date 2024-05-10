import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import { TCreateGuideProfileResponse, TTourGuideData } from "@/helpers/interface";





export const createGuideProfile = async (
  profileData: TTourGuideData
): Promise<TCreateGuideProfileResponse> => {
  const client = getClient();
  const gqlResponse: { addGuideProfile: TTourGuideData } =
    await client.request(
      gql`
        mutation addGuideProfile(
          $description: String
          $cityId: ID
          $uptoPeople: Int
          $responseTime: String
          $languages: [String]
          $profileImage: String
          $type: String
          $clientId: ID
          $countryId: ID
        ) {
          addTourGuideProfile(
            description: $description
            uptoPeople: $uptoPeople
            profileImage: $profileImage
            type: $type
            responseTime: $responseTime
            cityId: $cityId
            clientId: $clientId
            languages: $languages
            countryId: $countryId
          ) {
            id
            countryId
            cityId
            uptoPeople
            description
            profileImage
            responseTime
          }
        }
      `,
      {
        clientId: profileData.clientId,
        description: profileData.description,
        profileImage: profileData.profileImage,
        cityId: profileData.cityId,
        uptoPeople: profileData.uptoPeople,
          responseTime: profileData.responseTime,
          countryId: profileData.countryId,
          type: profileData.type,
          languages: profileData.languages
      }
    );

  return {
    data: gqlResponse?.addGuideProfile ,
  };
};
