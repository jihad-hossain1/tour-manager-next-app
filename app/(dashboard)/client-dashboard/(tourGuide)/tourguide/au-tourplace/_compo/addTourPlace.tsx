"use serve";

import { createTourGuidePlace } from "@/service/mutation/countryMutation";

export async function addedTourPlace(data) {
  const result = await createTourGuidePlace({ ...data });
  return result;
}
