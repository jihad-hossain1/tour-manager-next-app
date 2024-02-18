"use client";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const Provider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
