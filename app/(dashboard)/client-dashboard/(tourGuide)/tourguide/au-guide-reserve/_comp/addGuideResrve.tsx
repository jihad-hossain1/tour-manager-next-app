'use server'

import { addTourGuideReserve } from "@/service/mutation/tourGuideMutation"

export const addedGuideResrve = async (guideReserveData) => {
    const result = await addTourGuideReserve({ ...guideReserveData })
    return result;
}

