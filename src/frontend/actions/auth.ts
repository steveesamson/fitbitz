import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
    }
  }
`;

const _ = () => {
  return (options: any) => {};
};
const useLogin = () => useLazyQuery(loginQuery);

export { useLogin };
