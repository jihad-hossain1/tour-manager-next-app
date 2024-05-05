"use server";

import { updataCity } from "@/service/mutation/countryMutation";

export const updatedCity = async (updatedData) => {
  const result = await updataCity({
    ...updatedData,
  });
  return result;
};
