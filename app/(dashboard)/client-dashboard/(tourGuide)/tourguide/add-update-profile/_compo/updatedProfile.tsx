"use server";

import { updatedGuideProfile } from "@/service/mutation/tourGuideMutation";

export const updatedProfile = async (updatedData) => {
  const result = await updatedGuideProfile({ ...updatedData });
  return result;
};
