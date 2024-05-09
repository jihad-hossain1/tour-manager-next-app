"use server";

import { createTourSpot } from "@/service/mutation/tourSpotMutation";

export const addTourSpot = async (tourData) => {
  console.log({ ...tourData });
  const result = await createTourSpot(tourData);
  return result;
};
