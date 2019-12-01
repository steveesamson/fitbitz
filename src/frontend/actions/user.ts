import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UsersType, UserType } from "../types/user";
import { DelProps } from "../types/common";

const usersQuery = gql`
  query Users($offset: Int = 0, $first: Int = 20) {
    users(offset: $offset, first: $first) {
      id
      fullname
      email
      measurements {
        id
        time
        weight
      }
    }
  }
`;

const userQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      fullname
      email
      measurements {
        id
        time
        weight
      }
    }
  }
`;

const addUserMutation = gql`
  mutation addUser($fullname: String!, $email: String!, $password: String!) {
    addUser(
      newUserInput: { fullname: $fullname, email: $email, password: $password }
    ) {
      id
      fullname
      email
      measurements {
        id
        time
        weight
      }
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($id: ID!, $fullname: String, $email: String) {
    updateUser(editUserInput: { id: $id, fullname: $fullname, email: $email }) {
      id
      fullname
      email
    }
  }
`;

const deleteUserMutation = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
      fullname
      email
    }
  }
`;

const getUsers = (options: any) => useQuery(usersQuery, options);
const getUser = (options: any) => useQuery(userQuery, options);

const useAddUser = () => {
  const [addUser] = useMutation(addUserMutation);
  return (params: UsersType) => {
    return addUser({
      variables: params,
      update: (store, { data: { addUser } }) => {
        const { users } = store.readQuery<UsersType, any>({
          query: usersQuery
        });

        // console.log("previous:", users);

        store.writeQuery({
          query: usersQuery,
          data: {
            users: [...users, addUser]
          }
        });
      }
    });
  };
};

const useUpdateUser = () => {
  const [updateUser] = useMutation(updateUserMutation);
  return (params: UserType) => {
    return updateUser({
      variables: params
    });
  };
};

const useDeleteUser = () => {
  const [removeUser] = useMutation(deleteUserMutation);
  return (params: DelProps) => {
    return removeUser({
      variables: params,
      update: (store, { data: { removeUser } }) => {
        const { users } = store.readQuery<UsersType, any>({
          query: usersQuery
        });

        store.writeQuery({
          query: usersQuery,
          data: {
            users: users.filter(
              (current: UserType) => current.id != removeUser.id
            )
          }
        });
      }
    });
  };
};
const queryUsers = (props: any) =>
  getUsers({
    variables: props,
    fetchPolicy: "cache-and-network"
  });
export {
  queryUsers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
  usersQuery,
  deleteUserMutation
};
