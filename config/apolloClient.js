import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  //   uri: "https://tour-app-graphql-server.vercel.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
