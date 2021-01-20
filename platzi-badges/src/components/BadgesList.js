import React from "react";

import twitter from "../images/twitter.svg";
import NoAPIDataBadge from "./NoAPIDataBadge.js";
import { Link } from "react-router-dom";
import Gravatar from "./Gravatar";
import edit from "../images/edit.png";
import open from "../images/open.png";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {
    const res = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName} ${badge.jobTitle}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(res);
  }, [query, badges]);

  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);
  const badgesList = filteredBadges.slice(0).reverse();

  const formStyle = {
    top: "27vh",
    left: "calc(50% - 25vw)",
  };

  return (
    <React.Fragment>
      <div className="form-group w-50 position-absolute" style={formStyle}>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          placeholder="Filter badges"
          type="text"
          className="form-control"
        />
      </div>

      <ul className="list-unstyled w-100">
        {badgesList.map((badge) => {
          return (
            <li
              className="Badges__ul-item justify-content-start"
              key={badge.id}
            >
              <div className="Badges__img-container">
                <Gravatar className="Badges__img" email={badge.email} />
              </div>
              <div className="Badges__info">
                <h1>
                  {" "}
                  {badge.firstName} {badge.lastName}
                </h1>
                <div className="Badges__twitter-container">
                  <img className="Badges__twitter-img" src={twitter} alt="" />
                  <a
                    className="Badges__twitter-name"
                    href={"https://www.twitter.com/" + badge.twitter}
                  >
                    @{badge.twitter}
                  </a>
                </div>
                <p className="Badges__info-desc">{badge.jobTitle}</p>
              </div>

              <div className="Badges__icons-container">
                <div className="Badges__edit-container ml-4">
                  <Link to={`/badges/${badge.id}`}>
                    <img src={open} alt="Abrir" />
                  </Link>
                </div>

                <div className="Badges__edit-container ml-2">
                  <Link to={`/badges/${badge.id}/edit`}>
                    <img src={edit} alt="Editar" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export default BadgesList;
