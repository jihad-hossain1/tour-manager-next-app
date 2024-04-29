import {
  CityType,
  Continent,
  CountryType,
  TourSpotDetailType,
  TourSpotType,
} from "./types";

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
