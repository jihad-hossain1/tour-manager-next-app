export interface TTourGuidePlace {
  id: string;
  title: string;
  price: number;
  about: string;
  clientProfileID: string;
  tourPlaceId: string;
  contribute: Array<{
    picTime: string;
    contributeTitle: string;
    content: string;
  }>;
}

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
  continentId: string;
  cities: CityType[];
};

export type TourSpotType = {
  [x: string]: any;
  id: string;
  name: string;
  photo: string;
  description: string;
  continentId: string;
  countryId: string;
  divisionId: string;
  cityId: string;
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

export type DivisionType = {
  id: string;
  name: string;
  photo: string;
  description: string;
  countryId: string;
};


export type TGuideReserve = {
  [x: string]: any;
  id: string;
  clientProfileID: string;
  guideContribution: string;
  personPic: {
    id: string;
    adult: number;
    children: number;
    infant: number;
    totalPerson: number;
  };
  startTime: [
    {
      id: string;
      timePic: string;
    }
  ];
  contribution: TTourGuidePlace;
};
