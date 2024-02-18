import { gql } from "graphql-tag";

const clientType = gql`
  type Query {
    client(id: ID!): Client
    clients: [Client]
  }

  type Mutation {
    createClient(
      name: String!
      email: String!
      phone: String!
      password: String!
      image: String!
      role: String!
      clientType: String!
    ): Client
  }

  type Client {
    id: ID
    name: String
    email: String
    phone: String
    password: String
    image: String
    role: String
    clientType: String
  }
`;
export default clientType;
