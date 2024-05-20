"use server";

import { addTourPlaceImages } from "@/service/mutation/tourGuideMutation";

export const addImages = async (imageData) => {
  const result = await addTourPlaceImages({ ...imageData });
  return result;
};
