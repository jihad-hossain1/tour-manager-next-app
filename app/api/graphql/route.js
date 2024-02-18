import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import mongooseConnection from "@/config/connectDB";
import typeDefs from "@/src/graphql_helper/typeDefsMerge";
import resolvers from "@/src/graphql_helper/resolverMerge";

mongooseConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
