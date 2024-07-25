import { gql } from "graphql-request";
import { getClient } from "../graphqlClient";



export type TContinet = {
    split(arg0: string): unknown;
    id: string;
    img: string;
    code: string;
    name: string;
  };
  
  export interface TContinentResponse {
    data: TContinet;
  }
  
  export const createContinent = async (
    data: TContinet
  ): Promise<TContinentResponse> => {
    const client = getClient();

    console.log(data)
  
    try {
      const gqlResponse: { addContinent: TContinet } =
        await client.request(
          gql`
            mutation addContinent($name: String!, $code: String!, $img: String) {
              addContinent(name: $name, code: $code, img: $img) {
                id
                name
                code
                img
              }
            }
          `,
          {
            id: data.id,
            name: data.name,
            code: data.code,
            img: data.img,
          }
        );
  
      return { data: gqlResponse?.addContinent };
    } catch (error) {
      // console.log(error?.message);
      return { data: error?.message };
    }
  };