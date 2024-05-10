"use server";

import { createGuideProfile } from "@/service/mutation/tourGuideMutation";

export const addedProfile = async (profileData) => {
  console.log(profileData);
  const result = await createGuideProfile({ ...profileData });
  return result;
};
