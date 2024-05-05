
import PageContainer from '@/components/ui/pageContainer'
import Link from 'next/link'
import React from 'react'
import { getCountries } from '@/service/query/countryQuery'
import { FaEdit } from 'react-icons/fa'
import { Button } from '@mui/material'
import { getCities } from "@/service/query/cityQuery";

const LocationPage = async () => {
  const { data } = await getCountries();
  const { data: cities } = await getCities();

  return (
    <PageContainer>
      <div className="flex gap-2 border border-gray-100 shadow-sm hover:shadow">
        <Link href="/super-admin-dashboard/locations/country-add-update">
          <Button variant="contained" className="bg-blue-500 hover:bg-blue-600">
            {" "}
            Add Country
          </Button>
        </Link>

        <Link href="/super-admin-dashboard/locations/city-add-update">
          <Button variant="contained" className="bg-blue-500 hover:bg-blue-600">
            {" "}
            Add City
          </Button>
        </Link>
      </div>
      <div>
        <div>
          <h4 className="text-2xl">Countries</h4>
        </div>
        {data?.map((country) => (
          <div key={country.id} className="flex gap-2">
            <h4>{country.name}</h4>
            <Link
              href={`/super-admin-dashboard/locations/country-add-update/${country.id}`}
            >
              <FaEdit />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <div>
          <h4 className="text-2xl">Cities</h4>
        </div>
        {cities?.map((city) => (
          <div key={city.id} className="flex gap-2">
            <h4>{city.name}</h4>
            <Link
              href={`/super-admin-dashboard/locations/city-add-update/${city.id}`}
            >
              <FaEdit />
            </Link>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default LocationPage