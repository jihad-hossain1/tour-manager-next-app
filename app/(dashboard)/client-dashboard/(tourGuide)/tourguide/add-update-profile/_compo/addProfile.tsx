"use server";

import { createGuideProfile } from "@/service/mutation/tourGuideMutation";

export const addedProfile = async (profileData) => {
  const result = await createGuideProfile({ ...profileData });
  return result;
};
