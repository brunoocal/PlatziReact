import React from "react";

import "./styles/BadgeDetail.css";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import header from "../images/platziconf-logo.svg";
import api from "../api";
import swal from "@sweetalert/with-react";

class BadgeDetail extends React.Component {
  state = {
    loading: true,
    error: undefined,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: "",
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  handleDeleteBadge = async () => {
    this.setState({
      loading: true,
      error: null,
    });

    try {
      await api.badges.remove(this.props.match.params.badgeId);

      this.props.history.push("/badges");

      this.setState({
        loading: false,
        error: null,
      });

      return true;
    } catch (err) {
      this.setState({
        loading: false,
        error: err,
      });
      return false;
    }
  };

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({ loading: false, form: data });
    } catch (err) {}
  };

  render() {
    return (
      <React.Fragment>
        <div className="BadgeDetails__hero">
          <img className="img-fluid" src={header} alt="logo" />

          <div className="BadgeDetails__hero-attendant-name">
            <h1>
              {this.state.form.firstName} {this.state.form.lastName}
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-7">
              <Badge
                firstName={this.state.form.firstName || "FIRST NAME"}
                lastName={this.state.form.lastName || "LAST NAME"}
                twitter={this.state.form.twitter || "TWITTER"}
                jobTitle={this.state.form.jobTitle || "JOB TITLE"}
                email={this.state.form.email || "EMAIL@EXAMPLE.COM"}
              />
            </div>

            <div className="col-5">
              <h1>Acciones</h1>
              <div className="BadgeDetails__buttons">
                <Link to={`/badges/${this.props.match.params.badgeId}/edit`}>
                  <button className="btn btn-primary mb-2">Editar</button>
                </Link>

                <button
                  onClick={() => {
                    swal({
                      buttons: {
                        cancel: "¡No!",
                        accept: "¡Sí!",
                      },
                      dangerMode: true,
                      icon: "warning",
                      content: (
                        <div>
                          <h2>¿Quieres borrar tu Badge?</h2>
                          <p>Esta acción no puede deshacerse</p>
                          <div>
                            <div className="Swal__item">
                              <p>Tú Badge</p>
                              <Badge
                                firstName={
                                  this.state.form.firstName || "FIRST NAME"
                                }
                                lastName={
                                  this.state.form.lastName || "LAST NAME"
                                }
                                twitter={this.state.form.twitter || "TWITTER"}
                                jobTitle={
                                  this.state.form.jobTitle || "JOB TITLE"
                                }
                                email={
                                  this.state.form.email || "EMAIL@EXAMPLE.COM"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    }).then((value) => {
                      switch (value) {
                        case "accept":
                          swal({
                            button: "¡Ok!",
                            icon: "success",
                            content: (
                              <div>
                                <h2>Se ha enviado la petición al servidor.</h2>
                              </div>
                            ),
                          });
                          this.handleDeleteBadge().then((bool) => {
                            console.log(bool);
                          });
                          break;

                        default:
                          break;
                      }
                    });
                  }}
                  className="btn btn-danger mb-2"
                >
                  Borrar
                </button>

                <Link to={`/badges`}>
                  <button className="btn btn-secondary">Volver</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeDetail;
