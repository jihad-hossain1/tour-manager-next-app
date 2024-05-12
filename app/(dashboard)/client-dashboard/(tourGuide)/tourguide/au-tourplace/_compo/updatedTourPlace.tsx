"use server";

import { updateTourGuidePlace } from "@/service/mutation/tourGuideMutation";

export const updatedTourPlace = async (updatedData) => {
  const result = await updateTourGuidePlace({ ...updatedData });
  return result;
};
