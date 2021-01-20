import React from "react";

import "../pages/styles/NotFound.css";
import "../pages/styles/Error.css";
import platziconf from "../images/platziconf-logo.svg";
import { Link } from "react-router-dom";

class Error extends React.Component {
  state = {
    error: null,
  };

  componentDidMount() {
    this.setState({
      error: this.props.error,
    });
  }

  render(props) {
    return (
      <div className="NotFound__container">
        <div className="NotFound__all">
          <img src={platziconf} alt="PlatziConf Logo" />
          <div className="NotFound__info">
            <h1>Oops! An error ocurred in loading data.</h1>
            <h2>
              Please, wait some minutes, try again, and if it is not solved,
              contact an admin with the followed error:
            </h2>
            <h6>Error: {this.state.error}</h6>
            <Link className="btn btn-primary" to="/">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
