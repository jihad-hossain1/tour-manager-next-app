import Slider from "@/components/slider/Slider";
import React from "react";
import PopularDestination from "@/components/HomeImpoter/popularDestination";
import PopularCountries from "@/components/HomeImpoter/PopularCountries";
import PopularGuide from "@/components/HomeImpoter/PopularGuide";

const Homepage = () => {
  return (
    <div className="pb-10">
      <Slider />
      <PopularDestination />
      <PopularCountries />
      <PopularGuide />
    </div>
  );
};

export default Homepage;
