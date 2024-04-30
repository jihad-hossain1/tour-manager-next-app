import PageContainer from '@/components/ui/pageContainer'
import Link from 'next/link'
import React from 'react'

const LocationPage = () => {
    return (
        <PageContainer>
            <Link href="/super-admin-dashboard/locations/add-country">
                Add Country
            </Link>
        </PageContainer>
    )
}

export default LocationPage