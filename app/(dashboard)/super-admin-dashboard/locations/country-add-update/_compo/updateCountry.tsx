"use server";

import { updateCountry } from "@/service/mutation/countryMutation";

export const updatedCountry = async (updateData) => {
  const result = await updateCountry({ ...updateData });
  return result;
};
