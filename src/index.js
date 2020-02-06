import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter } from "react-router-dom";
import App from "containers/App";

let render = Component => {
  ReactDOM.render(
    <HashRouter basename="/">
      <Route path="/" component={Component} />
    </HashRouter>,
    document.getElementById("root") || document.createElement("div")
  );
};

render(App);
