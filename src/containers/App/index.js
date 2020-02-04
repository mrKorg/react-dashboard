import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import IndexPage from "containers/App/pages/index";
import "./style.css";

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="App">
        <Switch>
          <Route path="/" component={IndexPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
