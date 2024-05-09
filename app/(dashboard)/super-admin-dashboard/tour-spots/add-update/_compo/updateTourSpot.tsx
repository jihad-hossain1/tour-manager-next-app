"use server";

import { updateTourSpot } from "@/service/mutation/tourSpotMutation";

export const updatedTourSpot = async (updateData) => {
  const result = await updateTourSpot({ ...updateData });
  return result;
};
