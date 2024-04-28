import Slider from "@/components/slider/Slider";
import React from "react";
import PopularDestination from "@/components/HomeImpoter/popularDestination";
import PopularCountries from "@/components/HomeImpoter/PopularCountries";
import PopularGuide from "@/components/HomeImpoter/PopularGuide";
import NewTourGuides from "@/components/HomeImpoter/NewTourGuide";
import PopularPrivateTours from "@/components/HomeImpoter/PopularPrivateTours/PopularPrivateTours";
import NewPrivateTours from "@/components/HomeImpoter/NewPrivateTours/NewPrivateTours";
import PopularPrivateCars from "@/components/HomeImpoter/PopularPrivateCars/PopularPrivateCars";
import PopularVirtualTours from "@/components/HomeImpoter/PopularVirtualTours/PopularVirtualTours";
import LatestArticles from "@/components/HomeImpoter/LatestArticles";
import PopularArticles from "@/components/HomeImpoter/PopularArticles";

const Homepage = () => {
  return (
    <div className="pb-10">
      <Slider />
      <PopularDestination />
      <PopularCountries />
      <PopularGuide />
      <NewTourGuides />
      <PopularPrivateTours />
      <NewPrivateTours />
      <PopularPrivateCars />
      <PopularVirtualTours />
      <LatestArticles />
      <PopularArticles />
    </div>
  );
};

export default Homepage;
