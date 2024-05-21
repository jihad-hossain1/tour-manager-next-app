"use server";

import { createTourGuideProfileImage } from "@/service/mutation/tourGuideMutation";

export const addGuideProfileImage = async (data) => {
  const result = await createTourGuideProfileImage({ ...data });
  return result;
};
