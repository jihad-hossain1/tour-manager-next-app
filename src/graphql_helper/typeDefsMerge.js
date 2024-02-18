import { mergeTypeDefs } from "@graphql-tools/merge";
import clientType from "./typeDefs/clientTypes";
import todoTypes from "./typeDefs/todoTypes";

const typeDefs = mergeTypeDefs([clientType, todoTypes]);

export default typeDefs;
