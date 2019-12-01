import gql from "graphql-tag";

const typeDef: string = gql`
  type Query {
    echo(message: String): String
  }

  type Mutation {
    sayHello(name: String!): String!
  }
`;
// Define resolvers map for API definitions in SDL
const resolver = {
  Query: {
    echo: (_: any, args: any) => {
      console.log(_, args);
      return `You sent: ${args.message}!`;
    }
  },

  Mutation: {
    sayHello: (_: any, args: any) => {
      return `Hello ${args.name}!`;
    }
  }
};

export { typeDef, resolver };
