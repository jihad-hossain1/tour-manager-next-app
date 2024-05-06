"use server";

import { createDivision } from "@/service/mutation/countryMutation";

export const addDivision = async (divisionData) => {
  const result = await createDivision({
    ...divisionData,
  });
  return result;
};
