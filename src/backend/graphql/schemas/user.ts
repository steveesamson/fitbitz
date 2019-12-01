import gql from "graphql-tag";
import { userService, measurementService } from "../../services";

const typeDef: string = gql`
  extend type Query {
    users(offset: Int, first: Int): [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(newUserInput: UserInput!): User
  }

  type User {
    id: ID!
    fullname: String!
    email: String!
    measurements: [Measurement!]!
  }

  input UserInput {
    fullname: String!
    email: String!
    password: String!
  }
`;

const resolver = {
  Query: {
    async users(obj: any, args: any, context: any) {
      const { offset, first } = args;
      return await userService.getAll();
    },
    async user(obj: any, args: any, context: any) {
      const { id } = args;
      const res = await userService.getAll({ id });
      if (res.length) {
        return res[0];
      }
      return null;
    }
  },

  Mutation: {
    async addUser(_: any, args: any, context: any) {
      const { newUserInput } = args;
      const res = await userService.create(newUserInput);
      if (res.length) {
        return { ...newUserInput, ...res[0] };
      }
      return null;
    }
  },
  User: {
    async measurements(user: any, args: any) {
      const { id } = user;
      return await measurementService.getByOwner(id);
    }
  }
};

export { typeDef, resolver };
