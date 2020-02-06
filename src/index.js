import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import App from "containers/App";

let render = Component => {
  ReactDOM.render(
    <BrowserRouter basename="/">
      <Route path="/" component={Component} />
    </BrowserRouter>,
    document.getElementById("root") || document.createElement("div")
  );
};

render(App);
