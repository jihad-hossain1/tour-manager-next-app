import { CityType, Continent, CountryType } from "./types";


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