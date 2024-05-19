import React from 'react'
import TourGuideReserveForm from '../_comp/TourGuideReserveForm'
import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getGuideContributions, getGuideReserve, getTourGuideInfoShort } from '@/service/query/tourGuideQuery';

const AUGuideReserve = async ({ params }) => {
    // get client id from session
    const session = await getServerSession(options);
    const clientId = session?.user?.clientId;
    const id = params?.id;

    // get tour guide profile
    const { data: clientProfile } = await getTourGuideInfoShort(clientId);

    const clientProfileID = clientProfile?.id

    const data = await getGuideContributions(clientProfileID);

    let initialData;
    if (id) {
        const guideReserve = await getGuideReserve(id[0])
        initialData = guideReserve;
    }

    return (
        <div>
            <TourGuideReserveForm guideReserveData={initialData} id={id} clientProfileID={clientProfile?.id} guideContributions={data} />
        </div>
    )
}

export default AUGuideReserve