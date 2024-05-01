export type Continent = {
  length: number;
  map(
    arg0: (item: any, _i: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  name: string;
  img: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type CityType = {
  id: string;
  name: string;
  photo: string;
  description: string;
  countryId: string;
  divisionId: string;
  createdAt: string;
  updatedAt: string;
};

export type CountryType = {
  id: string;
  name: string;
  photo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  cities: CityType[];
};

export type TourSpotType = {
  [x: string]: any;
  id: string;
  name: string;
  photo: string;
  description: string;
  continentId: string;
  createdAt: string;
  updatedAt: string;
};

export type TourSpotDetailType = {
  id: string;
  name: string;
  description: string;
  photo: string;
  perfectTourTime: string;
  howToGoThere: string;
  howToStayThere: string;
  howDoHere: string;
  whereToEat: string;
  tourTipsGuide: string;
  topTourPlace: string;
  cityId: string;
  city: CityType;
  reviews: ReviewType[];
};

export type ReviewType = {
  id: string;
  name: string;
  title: string;
  email: string;
  img: string;
  rating: number;
  createdAt: string;
  content: string;
  replies: ReplyType[];
};

export type ReplyType = {
  id: string;
  name: string;
  email: string;
  img: string;
  createdAt: string;
  content: string;
};
