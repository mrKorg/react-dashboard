import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div style={{ position: `relative`, top: `25vh`, textAlign: `center` }}>
    <h1>Page Not Found</h1>
    <p>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
    </p>
  </div>
);

export default NotFoundPage;
