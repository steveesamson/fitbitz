import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
const httpLink = new HttpLink({
  uri: "/gql"
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});
