import React from "react";

import logo from "../images/platziconf-logo.svg";
import "./styles/NotFound.css";

function NotFound() {
  return (
    <>
      <div className="NotFound__container">
        <div className="NotFound__all">
          <img src={logo} alt="logo" />
          <div className="NotFound__info">
            <h1>Oops! 404!</h1>
            <p>This URL isnt available</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
