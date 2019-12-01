import * as React from "react";

import { UserType } from "../../types/user";
import { ButtonClickEvent } from "../../types/common";
import { useDeleteUser } from "../../actions/user";
import { getSession } from "../../core";

const User: React.FC<UserType> = (user: UserType): JSX.Element => {
  const { id, fullname, email } = user;
  const deleteUser = useDeleteUser();
  const session = getSession() || {};

  function onRemove(e: ButtonClickEvent): void {
    e.preventDefault();
    if (confirm(`Do you really want to delete ${user.fullname}?`)) {
      //deleteUser({ id: user.id }); //Disallow others from deleting...
      alert("C'mon, don't be mean like that.");
    }
  }
  return (
    <tr>
      <td>{fullname}</td>
      <td>{email}</td>
      <td>
        {session.id != id && (
          <button className="remove-button" type="button" onClick={onRemove}>
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default User;
