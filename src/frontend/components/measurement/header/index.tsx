import React from "react";
import "./header.css";
import { getSession, clearSession } from "../../core";

type AnchorEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent>;

const Header: React.FC<any> = (props: any): JSX.Element => {
  const session = getSession();
  return (
    <header className="row">
      <section className="logo">
        <p>FitBitz</p>
      </section>
      <section className="menu">
        {session && (
          <ul>
            <li className="welcome">[ Welcome {session.name} ] </li>
            <li>
              <a onClick={_ => props.onView("/home")}>Home</a>
            </li>
            <li>
              <a onClick={_ => props.onView("/users")}>Users</a>
            </li>
            {/* <li>
              <a onClick={_ => props.onView("/measurements")}>Measurements</a>
            </li> */}
            <li>
              <a
                onClick={_ => {
                  clearSession();
                  props.onView("/login");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </section>
    </header>
  );
};

export default Header;
