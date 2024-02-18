import { gql, GraphQLClient } from "graphql-request";

export const getClient = (preview) => {
  const client = new GraphQLClient(
    `https://tour-app-graphql-server.vercel.app/graphql`
  );

  return client;
};
