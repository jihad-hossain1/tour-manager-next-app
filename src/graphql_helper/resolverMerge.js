import { mergeResolvers } from "@graphql-tools/merge";
import clientResolvers from "./resolvers/clientResolver";
import todoResolvers from "./resolvers/todoResolvers";

const resolvers = mergeResolvers([clientResolvers, todoResolvers]);

export default resolvers;
