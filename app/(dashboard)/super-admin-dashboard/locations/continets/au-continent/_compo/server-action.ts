"use server";

import { createContinent } from "@/service/mutation/continent";


export const addContinent = async (info:any) => {
  const result = await createContinent({
    ...info,
  });
  return result;
};