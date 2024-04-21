import Slider from "@/components/slider/Slider";
import React from "react";
import PopularCountries from "@/components/HomeImpoter/PopularCountries";
import Continents from "@/components/HomeImpoter/Continent";

const Homepage = () => {
  return (
    <div>
      <Slider />
      <PopularCountries />
      <Continents />
    </div>
  );
};

export default Homepage;
