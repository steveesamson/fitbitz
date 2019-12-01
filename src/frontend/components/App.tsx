import React, { useState } from "react";
import { Users, UserForm } from "./user";
import { Measurements } from "./measurement";
import { Login, Home } from "./home";

import Header from "./header";
import Footer from "./footer";
import { getSession } from "../core";

const App: React.FC<{}> = (): JSX.Element => {
  const fakeToken = getSession();

  const [view, setView] = useState(fakeToken ? "/home" : "/login"),
    onView = { onView: setView };

  return (
    <div>
      <Header {...onView} />
      {view === "/measurements" && <Measurements />}
      {view === "/users" && <Users />}
      {view === "/adduser" && <UserForm {...onView} />}
      {view === "/login" && <Login {...onView} />}
      {view === "/home" && <Home {...onView} />}
      <Footer />
    </div>
  );
};

export default App;
