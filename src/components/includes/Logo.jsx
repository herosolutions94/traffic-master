import React from "react";
import { Link } from "react-router-dom";
import ImageControl from "../common/ImageControl";

function Logo({ logo }) {
  return (
    <>
      <div className="logo">
        <Link to="/">
          <ImageControl folder="images" src={logo} />
        </Link>
      </div>
    </>
  );
}

export default Logo;
