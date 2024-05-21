import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";
import {
  TCreateGuideProfileResponse,
  TGuidePlaceImages,
  TGuidePlaceImagesResponse,
  TGuideReserveResponse,
  TTourGuideData,
} from "@/helpers/interface";
import { TGuideReserve, TTourGuidePlace } from "@/helpers/types";

export const createGuideProfile = async (
  profileData: TTourGuideData
): Promise<TCreateGuideProfileResponse> => {
  const client = getClient();
  const gqlResponse: { addGuideProfile: TTourGuideData } = await client.request(
    gql`
      mutation addGuideProfile(
        $description: String
        $cityId: ID
        $responseTime: String
        $languages: [String]
        $profileImage: String
        $type: String
        $clientId: ID
        $countryId: ID
        $about: String
      ) {
        addTourGuideProfile(
          description: $description
          about: $about
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
          about
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
      responseTime: profileData.responseTime,
      countryId: profileData.countryId,
      type: profileData.type,
      languages: profileData.languages,
      about: profileData.about,
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
            $responseTime: String
            $languages: [String]
            $profileImage: String
            $type: String
            $clientId: ID
            $countryId: ID
            $about: String
          ) {
            updateTourGuideProfile(
              id: $id
              description: $description
              profileImage: $profileImage
              type: $type
              responseTime: $responseTime
              cityId: $cityId
              clientId: $clientId
              languages: $languages
              countryId: $countryId
              about: $about
            ) {
              id
              about
              countryId
              cityId
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
          responseTime: profileData.responseTime,
          countryId: profileData.countryId,
          type: profileData.type,
          languages: profileData.languages,
          about: profileData.about,
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

export const updateTourGuidePlace = async (
  tourPlaceData: TTourGuidePlace
): Promise<any> => {
  const client = getClient();
  try {
    const gqlResponse: { updateTourGuidePlce: TTourGuidePlace } =
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
            updateTourGuidePlce(
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
              contribute {
                picTime
                contributeTitle
                content
              }
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
      data: gqlResponse?.updateTourGuidePlce,
    };
  } catch (error) {
    console.log(error);
    return { data: error.message };
  }
};

export const addTourGuideReserve = async (
  reserveData: TGuideReserve
): Promise<TGuideReserveResponse> => {
  const client = getClient();

  try {
    const gqlResponse: { addTourGuideReserve: TGuideReserve } =
      await client.request(
        gql`
          #graphql

          mutation addTourGuideReserve(
            $clientProfileID: ID
            $personPic: PersonPicInputType
            $startTime: [StartTimeInputType]
            $guideContribution: ID
          ) {
            addTourGuideReserve(
              clientProfileID: $clientProfileID
              personPic: $personPic
              startTime: $startTime
              guideContribution: $guideContribution
            ) {
              id
            }
          }
        `,
        {
          clientProfileID: reserveData.clientProfileID,
          personPic: reserveData.personPic,
          startTime: reserveData.startTime,
          guideContribution: reserveData.guideContribution,
        }
      );

    console.log(gqlResponse);

    return {
      data: gqlResponse?.addTourGuideReserve,
    };
  } catch (error) {
    console.log(error.message);
    return { data: error.message };
  }
};

export const updateGuideReserve = async (
  reserveData: TGuideReserve
): Promise<TGuideReserveResponse> => {
  const client = getClient();
  try {
    const gqlResponse: { updateGuideReserve: TGuideReserve } =
      await client.request(
        gql`
          mutation updateGuideReserve(
            $id: ID
            $clientProfileID: ID
            $personPic: PersonPicInputType
            $startTime: [StartTimeInputUpType]
            $guideContribution: ID
          ) {
            updateGuideReserve(
              id: $id
              clientProfileID: $clientProfileID
              personPic: $personPic
              startTime: $startTime
              guideContribution: $guideContribution
            ) {
              id
            }
          }
        `,
        {
          id: reserveData.id,
          clientProfileID: reserveData.clientProfileID,
          personPic: reserveData.personPic,
          startTime: reserveData.startTime,
          guideContribution: reserveData.guideContribution,
        }
      );

    return { data: gqlResponse.updateGuideReserve };
  } catch (error) {
    console.log(error.message);
    return { data: error.message };
  }
};

export const addTourPlaceImages = async (
  imagesData: TGuidePlaceImages
): Promise<TGuidePlaceImagesResponse> => {
  const client = getClient();
  try {
    const gqlResponse: { uploadTourImages: TGuidePlaceImages } =
      await client.request(
        gql`
          mutation uploadTourImages(
            $clientId: ID
            $clientProfileID: ID
            $contributionId: ID
            $title: String
            $urls: [ImageInput]
          ) {
            uploadTourImages(
              clientId: $clientId
              clientProfileID: $clientProfileID
              contributionId: $contributionId
              title: $title
              urls: $urls
            ) {
              id
            }
          }
        `,
        {
          clientProfileID: imagesData.clientProfileID,
          contributionId: imagesData.contributionId,
          title: imagesData.title,
          urls: imagesData.urls,
          clientId: imagesData.clientId,
        }
      );

    return { data: gqlResponse.uploadTourImages };
  } catch (error) {
    console.log(error.message);
    return { data: error.message };
  }
};

export type TTGProfileImage = {
  id: string;
  profileImage: string;
};

export interface TTGProfileImageResponse {
  data: TTGProfileImage;
}

export const createTourGuideProfileImage = async (
  data: TTGProfileImage
): Promise<TTGProfileImageResponse> => {
  const client = getClient();

  try {
    const gqlResponse: { addProfileImage: TTGProfileImage } =
      await client.request(
        gql`
          mutation addProfileImage($id: ID, $profileImage: String) {
            addProfileImage(id: $id, profileImage: $profileImage) {
              id
              profileImage
            }
          }
        `,
        {
          id: data.id,
          profileImage: data.profileImage,
        }
      );
    console.log(gqlResponse);

    return { data: gqlResponse?.addProfileImage };
  } catch (error) {
    console.log(error?.message);
    return { data: error?.message };
  }
};