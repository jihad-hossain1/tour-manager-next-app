import { GraphQLClient } from "graphql-request";

export const getClient = () => {
  const client = new GraphQLClient(
    `https://tour-app-graphql-server.vercel.app/graphql`
  );
  return client;
};
