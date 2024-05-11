import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import { TCreateGuideProfileResponse, TTourGuideData } from "@/helpers/interface";
import { TTourGuidePlace } from "@/helpers/types";

export const createGuideProfile = async (
  profileData: TTourGuideData
): Promise<TCreateGuideProfileResponse> => {
  const client = getClient();
  const gqlResponse: { addGuideProfile: TTourGuideData } = await client.request(
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
      languages: profileData.languages,
    }
  );

  return {
    data: gqlResponse?.addGuideProfile,
  };
};

export const updatedGuideProfile = async (
  profileData: TTourGuideData
): Promise<TCreateGuideProfileResponse> => {
  const client = getClient();
  try {
    const gqlResponse: { updateGuideProfile: TTourGuideData } =
      await client.request(
        gql`
          mutation updateGuideProfile(
            $id: ID
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
            updateTourGuideProfile(
              id: $id
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
          id: profileData.id,
          clientId: profileData.clientId,
          description: profileData.description,
          profileImage: profileData.profileImage,
          cityId: profileData.cityId,
          uptoPeople: profileData.uptoPeople,
          responseTime: profileData.responseTime,
          countryId: profileData.countryId,
          type: profileData.type,
          languages: profileData.languages,
        }
      );

    return {
      data: gqlResponse?.updateGuideProfile,
    };
  } catch (error) {
    // console.error(error.message);
    return { data: error.message };
  }
};

export const updateTourGuidePlace = async (tourPlaceData: TTourGuidePlace) => {
  const client = getClient();
  try {
    const gqlResponse: { updateTourGuidePlace: TTourGuidePlace } =
      await client.request(
        gql`
          mutation updateTourGuidePlace(
            $id: ID
            $title: String
            $price: Int
            $clientProfileID: ID
            $tourPlaceId: ID
            $contribute: [TourContributorInput]
          ) {
            updateTourGuidePlace(
              id: $id
              title: $title
              price: $price
              clientProfileID: $clientProfileID
              tourPlaceId: $tourPlaceId
              contribute: $contribute
            ) {
              id
              title
              price
              clientProfileID
              tourPlaceId
              contribute
            }
          }
        `,
        {
          id: tourPlaceData.id,
          title: tourPlaceData.title,
          price: tourPlaceData.price,
          clientProfileID: tourPlaceData.clientProfileID,
          tourPlaceId: tourPlaceData.tourPlaceId,
          contribute: tourPlaceData.contribute,
        }
      );

    return {
      data: gqlResponse?.updateTourGuidePlace,
    };
  } catch (error) {
    console.log(error);
    return { data: error.message };
  }
};