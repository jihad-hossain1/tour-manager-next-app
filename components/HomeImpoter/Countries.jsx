"use client";

import { GET_COUNTIRES } from "@/client/query/countryQuery";
import { useQuery } from "@apollo/client";
import React from "react";

const Countries = () => {
  // const { data, loading, error } = useQuery(GET_COUNTIRES) || {};
  // if (loading) {
  //   return <div>Loading....</div>;
  // }
  // if (error) {
  //   return <div>{error?.message}</div>;
  // }
  // console.log(data);
  return <div>Countries</div>;
};

export default Countries;
