import gql from "graphql-tag";
import { userService } from "../../services";

const typeDef: string = gql`
  extend type Query {
    login(email: String!, password: String!): Token
  }

  type Token {
    id: ID!
    name: String!
  }
`;

const resolver = {
  Query: {
    async login(obj: any, args: any, context: any) {
      const { email, password } = args;

      const res = await userService.getByLogin({ email, password });

      if (res.length) {
        const { id, fullname } = res[0];
        return { id, name: fullname };
      }

      return null;
    }
  }
};

export { typeDef, resolver };
