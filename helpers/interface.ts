import {
  CityType,
  Continent,
  CountryType,
  DivisionType,
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
  cityId: string
}

export interface TTourSpotResponse {
  id: string;
  name: string;
  photo: string;
  description: string;
  divisionId: string;
  countryId: string;
  cityId: string
}

export interface TCreateTourSpotResponse {
  data: TTourSpotResponse | null;
}

export interface TUpdateTourSpotResponse {
  data: TTourSpotResponse | null
}

export interface TSingleTourSpotResponse {
  data: TourSpotType | null
}