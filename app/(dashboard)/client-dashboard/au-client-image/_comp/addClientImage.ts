"use server";

import { createClientImage } from "@/service/mutation/clientMutation";

export const addClientImage = async (imageData) => {
  const result = await createClientImage({ ...imageData });
  return result;
};
