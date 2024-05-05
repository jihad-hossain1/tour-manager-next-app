"use server";

import { createCountry } from "@/service/mutation/countryMutation";

export const addCountry = async (countryData) => {
  const result = await createCountry({ ...countryData });
  return result;
};
