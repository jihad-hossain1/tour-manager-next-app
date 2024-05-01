
import PageContainer from '@/components/ui/pageContainer'
import Link from 'next/link'
import React from 'react'
import { getCountries } from '@/service/query/countryQuery'
import { FaEdit } from 'react-icons/fa'

const LocationPage = async () => {
    const { data } = await getCountries()

    return (
        <PageContainer>
            <Link href="/super-admin-dashboard/locations/country-add-update">
                Add Country
            </Link>

            <div>
                {
                    data?.map((country) => (
                        <div key={country.id} className="flex gap-2">
                            <h4>{country.name}</h4>
                            <Link href={`/super-admin-dashboard/locations/country-add-update/${country.id}`}>
                                <FaEdit />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </PageContainer>
    )
}

export default LocationPage