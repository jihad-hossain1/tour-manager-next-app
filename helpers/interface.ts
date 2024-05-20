import {
  CityType,
  Continent,
  CountryType,
  DivisionType,
  TGuideReserve,
  TTourGuidePlace,
  TourSpotDetailType,
  TourSpotType,
} from "./types";
import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";

export interface ContinentResponse {
  [x: string]: any[];
  data: Continent[];
}

export interface CityResponse {
  [x: string]: any[];
  data: CityType[];
}

export interface CountryResponse {
  [x: string]: any[];
  data: CountryType[];
}

export interface TourSpotResponse {
  [x: string]: any[];
  data: TourSpotType[];
}

export interface TourSpotDetailResponse {
  data: TourSpotDetailType;
}

export interface CountryTypeResponse {
  data: CountryType;
}

export interface DivisionResponse {
  [x: string]: any[];
  data: DivisionType[];
}

export interface TTourSpotData {
  id: string;
  name: string;
  description: string;
  divisionId: string;
  photo: string;
  countryId: string;
  cityId: string;
}

export interface TTourSpotResponse {
  id: string;
  name: string;
  photo: string;
  description: string;
  divisionId: string;
  countryId: string;
  cityId: string;
}

export interface TCreateTourSpotResponse {
  data: TTourSpotResponse | null;
}

export interface TUpdateTourSpotResponse {
  data: TTourSpotResponse | null;
}

export interface TSingleTourSpotResponse {
  data: TourSpotType | null;
}

export type TTourGuideData = {
  tourGuideContribution: TTourGuidePlace[];
  id: string;
  description: string;
  cityId: string;
  uptoPeople: number;
  profileImage: string;
  responseTime: string;
  languages: string[];
  type: string;
  clientId: string;
  countryId: string;
};

export interface TCreateGuideProfileResponse {
  data: TTourGuideData;
}

export interface TUpdateGuideProfileResponse {
  data: TTourGuideData;
}

export interface TSingleGuideProfileResponse {
  data: TTourGuideData;
}

export interface TTourGuidePlaceResponse {
  data: TTourGuidePlace;
}

export interface TGuideReserveResponse {
  data: TGuideReserve;
}

export type TGuidePlaceImages = {
  id: string;
  clientId: string;
  clientProfileID: string;
  contributionId: string;
  title: string;
  urls: {
    id: string;
    image: string;
  }[];
};

export interface TGuidePlaceImagesResponse {
  data: TGuidePlaceImages;
}
