import { GraphQLClient } from "graphql-request";

export const getClient = () => {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  return client;
};
