import React from "react";

import Badge from "./Badge";
import { Link } from "react-router-dom";
import "../pages/styles/NoAPIBadge.css";

function NoAPIDataBadge() {
  return (
    <React.Fragment>
      <div className="NoAPIBadge__container">
        <h1>No badges found</h1>
        <div className="NoAPIBadge__badge">
          <div className="NoAPIBadge__badge-info">
            <h2>Yours might look like this:</h2>
            <Link className="btn btn-primary" to="/badges/new">
              Create new badge
            </Link>
          </div>
          <Badge
            firstName="Bruno"
            lastName="Cal"
            jobTitle="Frontend Developer"
            twitter="brunoo_cal"
            avatar="https://es.gravatar.com/userimage/198034997/96a94801273872da36f3309d6e8d6153.jpeg"
          ></Badge>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NoAPIDataBadge;
