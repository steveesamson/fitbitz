import * as React from "react";
import {
  ButtonClickEvent,
  InputChangeEvent,
  InputKeyEvent
} from "../../types/common";
import User from "./user";
import "./user.css";
import { UserType } from "../../types/user";
import { queryUsers } from "../../actions/user";

const Users: React.FC<{}> = (): JSX.Element => {
  const { loading, error, data, fetchMore } = queryUsers({
    offset: 0,
    first: 20
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Sorry there was an error ...</p>;

  // onClear = (e: ButtonClickEvent) => {
  //     // dispatch(clearTodo());
  //   },
  //   onAdd = (e: ButtonClickEvent) => {
  //     // sendPayload();
  //   },
  //   onChange = (e: InputChangeEvent) => {
  //     // setValue(e.target.value);
  //   },
  //   onKeydown = (e: InputKeyEvent) => {
  //     if (e.nativeEvent.keyCode === 13) {
  //       // sendPayload();
  //     }
  //   };
  return (
    <div>
      {data.users.length ? (
        <table className="users">
          <caption>User Records</caption>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user: UserType) => (
              <User {...user} key={user.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Sorry, there are no user records presently, add some below.</p>
      )}
    </div>
  );
};

export default Users;
