interface ClientInfo {
  id: string;
  name: string;
  image: string;
}

interface Url {
  id: string;
  image: string;
}

interface Image {
  id: string;
  title: string;
  urls: Url[];
}

interface TourGuideContribution {
  id: string;
  title: string;
  price: number;
}

interface StartTime {
  id: string;
  timePic: string;
}

interface PersonPic {
  id: string;
  adult: number;
  children: number;
  infant: number;
  totalPerson: number;
}

interface TourGuideReserve {
  id: string;
  guideContribution: string;
  datePic: string;
  startTime: StartTime;
  personPic: PersonPic;
}

interface GuideReviewReply {
  id: string;
  title: string;
  content: string;
}

interface GuideReview {
  id: string;
  title: string;
  content: string;
  rating: number;
  replies: GuideReviewReply[];
}

interface NotInclude {
  id: string;
  notInclude: string;
}

interface AdditionalInfo {
  id: string;
  info: string;
}

interface TourGuideContributionDetail {
  id: string;
  notice: string;
  notIncludes: NotInclude[];
  additionalInfo: AdditionalInfo[];
}

export interface TTourGuide {
  data: {
    id: string;
    type: string;
    description: string;
    about: string;
    responseTime: string;
    profileImage: string;
    clientInfo: ClientInfo;
    images: Image[];
    tourGuideContribution: TourGuideContribution;
    tourGuideReserve: TourGuideReserve[];
    guideReview: GuideReview[];
    tourGuideContributionDetail: TourGuideContributionDetail;
  };
}
