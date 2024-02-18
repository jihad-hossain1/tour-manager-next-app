import { gql } from "graphql-tag";

const todoTypes = gql`
  type Query {
    todo(id: ID!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(name: String!, content: String!): Todo
  }

  type Todo {
    id: ID
    name: String
    content: String
  }
`;
export default todoTypes;
