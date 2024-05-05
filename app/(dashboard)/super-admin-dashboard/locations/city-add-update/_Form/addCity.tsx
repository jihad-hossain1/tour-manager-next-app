"use server";

import { createCity } from "@/service/mutation/countryMutation";

export const addCity = async (cityData) => {
  const result = await createCity({
    ...cityData,
  });
  return result;
};
