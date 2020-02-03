import React, { Suspense } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import IndexPage from "containers/App/pages/index";
import "./style.css";

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="App">
        <Router>
          <Route path="/" component={IndexPage} />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
