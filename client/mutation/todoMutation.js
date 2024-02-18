import { getClient } from "@/service/graphqlClient";
import { gql } from "graphql-request";

export const addTodo = async (todoObj) => {
  try {
    const client = getClient(true);

    const mutation = gql`
      mutation createTodo($input: Todo!) {
        createTodo(input: $input) {
          id
        }
      }
    `;
    const response = await client.request(mutation, { input: todoObj });
    return response;
  } catch (exception) {
    console.log(`Error ${exception}`);
  }
};
