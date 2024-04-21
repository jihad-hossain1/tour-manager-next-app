export type Continent = {
  id: string;
  name: string;
  img: string;
  code: string;
  createdAt: string;
  updatedAt: string;

}

export type CityType = {
  id: string;
  name: string;
  photo: string;
  description: string;
  countryId: string;
  divisionId: string;
  createdAt: string;
  updatedAt: string;
}

export type CountryType = {
  id: string;
  name: string;
  photo: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  cities: CityType[]
}