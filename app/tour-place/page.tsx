'use client'

import { getPaginatatedTourSpots } from "@/service/query/tourSpotQuery";
import React, { useEffect, useState, useCallback } from "react";
import tourImage from '@/public/Images/tourspot/spot.webp'
import Image from "next/image";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const TourPlacepage = () => {
  const [tourSpots, setTourSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(16);
  const [page, setPage] = useState(1);

  const fetchTourSpots = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const response = await getPaginatatedTourSpots(searchTerm, limit, page);
      setLoading(false);
      if (response?.data) {
        setTourSpots(response?.data);
      }
    } catch (error) {
      console.error(error?.message);
      setLoading(false);
    }
  }, [limit, page]);

  // Debounced search function
  const debouncedFetchTourSpots = useCallback(debounce((searchTerm) => {
    fetchTourSpots(searchTerm);
  }, 500), [fetchTourSpots]);

  useEffect(() => {
    debouncedFetchTourSpots(search);
  }, [search, debouncedFetchTourSpots]);

  return (
    <main className="bg-slate-100 min-h-screen pb-6">
      <div className="px-2 container m-auto">
        <section>
          <h4 className="text-3xl text-center py-3">Tour Place</h4>
          <div className="w-full flex items-center justify-center py-4">
            <TextField
              id="outlined-basic"
              variant="standard"
              // label="Search Tour Place"
              placeholder="Search Tour Place"
              className="border w-[500px] max-sm:w-[300px]"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              InputProps={{
                // disableUnderline: true,
                sx: { height: 40, borderRadius: 1, fontSize: 14, fontWeight: 400, padding: '0px' },

                endAdornment: <button className={search?.length > 0 ? "hidden" : "block"} >
                  <FiSearch className="text-xl text-gray-600" />
                </button>,

              }}
            />
          </div>
          <div>
            {loading ? (
              <div className="grid lg:grid-cols-4 gap-3">
                {[...Array(16)].map((item, index) => (
                  <div key={index} className="w-[300px] h-96 bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid max-sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tourSpots.map((tourSpot, index) => (
                  <div key={index} className="bg-white w-fit shadow group">
                    <div className="relative flex flex-col gap-2 max-sm:gap-1 border">
                      <Link href={`/tour-place/${tourSpot?.slug}`}>
                        <Image
                          alt="tour spot"
                          height={200}
                          width={1000}
                          className="w-[300px]"
                          src={tourSpot?.photo ? tourSpot?.photo : tourImage}
                        /></Link>
                      <div className="p-2">
                        <h4 className="lg:font-semibold max-sm:text-sm">
                          {tourSpot?.name?.length > 35 ? `${tourSpot?.name?.slice(0, 35)}...` : tourSpot?.name}
                        </h4>
                      </div>
                      <div className="lg:group-hover:block absolute hidden z-10 bottom-0 w-full bg-blue-600 py-3 text-white text-center group-hover:transition duration-500">
                        <Link href={`/tour-place/${tourSpot?.slug}`}>Read More</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {tourSpots?.length > 0 && (
            <div className="flex justify-end gap-3 mt-3">
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => {
                  if (page === 1) return;
                  setPage(page - 1);
                }}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                disabled={tourSpots?.length < limit}
                onClick={() => {
                  if (tourSpots?.length < limit) return;
                  setPage(page + 1);
                }}
              >
                Next
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default TourPlacepage;
