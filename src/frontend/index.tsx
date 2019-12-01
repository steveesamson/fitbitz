import React from "react";
import { render } from "react-dom";
import apolloClient from "./actions/apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./components/App";
import "./index.css";

render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
