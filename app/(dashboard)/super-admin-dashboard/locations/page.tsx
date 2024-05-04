
import PageContainer from '@/components/ui/pageContainer'
import Link from 'next/link'
import React from 'react'
import { getCountries } from '@/service/query/countryQuery'
import { FaEdit } from 'react-icons/fa'
import { Button } from '@mui/material'

const LocationPage = async () => {
    const { data } = await getCountries()

    return (
        <PageContainer>
            <div className="flex gap-2">
                <Link href="/super-admin-dashboard/locations/country-add-update">
                    <Button variant="contained" className='bg-blue-500 hover:bg-blue-600'> Add Country</Button>
                </Link>
                <Link href="/super-admin-dashboard/locations/city-add-update">
                    <Button variant="contained" className="bg-blue-500 hover:bg-blue-600"> Add City</Button>
                </Link>
            </div>

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