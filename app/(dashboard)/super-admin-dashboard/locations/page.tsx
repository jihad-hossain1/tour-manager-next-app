
import PageContainer from '@/components/ui/pageContainer'
import Link from 'next/link'
import React from 'react'
import { getCountries } from '@/service/query/countryQuery'
import { FaEdit } from 'react-icons/fa'
import { Button } from '@mui/material'
import { getCities } from "@/service/query/cityQuery";
import { getDivisions } from "@/service/query/divisionQuery";

const LocationPage = async () => {
  const { data } = await getCountries();
  const { data: cities } = await getCities();
  const { data: divisions } = await getDivisions();

  return (
    <PageContainer>
      <main className="my-10">
        <section className="grid md:grid-cols-2 gap-10 mt-5">
          <div>
            <Link href="/super-admin-dashboard/locations/country-add-update">
              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Add Country
              </Button>
            </Link>

            <h4 className="text-2xl">
              Countries
              <span className="text-sm px-3 rounded bg-blue-50 py-1">
                {data?.length || 0}
              </span>
            </h4>
            <div className="grid md:grid-cols-3 gap-2">
              {data?.map((country) => (
                <div
                  key={country.id}
                  className="flex gap-2 items-center hover:border-b hover:border-gray-300 transition-all duration-500 w-fit "
                >
                  <h4 className="text-xl">{country.name}</h4>
                  <Link
                    href={`/super-admin-dashboard/locations/country-add-update/${country.id}`}
                  >
                    <FaEdit />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link href="/super-admin-dashboard/locations/division-add-update">
              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Add Division
              </Button>
            </Link>

            <h4 className="text-2xl">
              Divisions
              <span className="text-sm px-3 rounded bg-blue-50 py-1">
                {divisions?.length || 0}
              </span>
            </h4>
            <div className="grid md:grid-cols-3 gap-2">
              {divisions?.map((division) => (
                <div
                  key={division.id}
                  className="flex gap-2 items-center hover:border-b hover:border-gray-300 transition-all duration-500 w-fit "
                >
                  <h4 className="text-xl">{division.name}</h4>
                  <Link
                    href={`/super-admin-dashboard/locations/division-add-update/${division.id}`}
                  >
                    <FaEdit />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link href="/super-admin-dashboard/locations/city-add-update">
              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Add City
              </Button>
            </Link>
            <h4 className="text-2xl">
              Cities
              <span className="text-sm px-3 rounded bg-blue-50 py-1">
                {cities?.length || 0}
              </span>
            </h4>
            <div className="grid md:grid-cols-3 gap-2">
              {cities?.map((city) => (
                <div
                  key={city.id}
                  className="flex gap-2 items-center hover:border-b hover:border-gray-300 transition-all duration-500 w-fit "
                >
                  <h4 className="text-xl">{city.name}</h4>
                  <Link
                    href={`/super-admin-dashboard/locations/city-add-update/${city.id}`}
                  >
                    <FaEdit />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageContainer>
  );
};

export default LocationPage