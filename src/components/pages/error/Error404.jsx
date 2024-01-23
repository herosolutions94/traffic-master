import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <>
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <p className="error-text">
          The page you are looking for could not be found.
        </p>
        <Link to="/" className="webBtn">
          Go to Home
        </Link>
      </div>
    </>
  );
}

export default Error404;
