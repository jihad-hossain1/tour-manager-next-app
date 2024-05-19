'use server'

import { updateGuideReserve } from '@/service/mutation/tourGuideMutation'


export const updateReserve = async (reserverData) => {
    const result = await updateGuideReserve({ ...reserverData })
    return result;
}

