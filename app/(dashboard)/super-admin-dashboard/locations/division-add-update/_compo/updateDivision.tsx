"use server";

import { updateDivision } from "@/service/mutation/countryMutation";

export const updatedDivision = async (divisionData) => {
  const result = await updateDivision({ ...divisionData });
  return result;
};
