import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../api.js";
import Badge from "../components/Badge.js";
import "../pages/styles/ProgressBar.css";
import swal from "@sweetalert/with-react";

class BadgeFormEdit extends React.Component {
  progressBar = {
    values: {
      ...this.props.formValues.progressBar,
    },
    message: "¡Waiting for your data!",
    variant: "warning",
  };

  handleSubmit = async (e) => {
    this.progressBar = {
      ...this.progressBar,
      values: {
        ...this.progressBar.values,
        async_api: 0,
      },
      error: false,
      error_api: false,
    };

    try {
      await api.badges.update(this.props.badgeId, this.props.formValues.form);
      return this.progressBar;
    } catch (err) {
      this.progressBar = {
        ...this.progressBar,
        variant: "danger",
        error: false,
        error_api: true,
        error_api_msg: err,
      };

      this.progressBar = {
        ...this.progressBar,
        message: `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}`,
      };
      return this.progressBar;
    }
  };

  handleProgressBarChange = (event) => {
    const list = Object.keys(this.props.formValues.progressBar).map((key) => [
      String(key),
      this.props.formValues.form[key],
    ]);
    const formInput = list.find((index) =>
      index.find((element) => element === event.target.value)
    );
    const value =
      formInput === undefined
        ? 0
        : formInput[1] === event.target.value
        ? 16.66667
        : 0;
    this.progressBar = {
      ...this.progressBar,
      values: {
        ...this.progressBar.values,
        [event.target.name]: value,
      },
    };

    this.forceUpdate();
  };

  handleReadBadge = () => {
    const list = Object.keys(this.props.formValues.form).map((key) => [
      String(key),
      this.props.formValues.form[key],
    ]);

    this.withoutUpdateBadge = this.props.formValues.form;

    list.forEach((element) => {
      const value =
        element === undefined ? 0 : element[1] !== "" ? 16.66667 : 0;
      if (!(element[0].includes("id") || element[0].includes("avatarUrl"))) {
        this.progressBar = {
          ...this.progressBar,
          values: {
            ...this.progressBar.values,
            [element[0]]: value,
          },
        };
      }
    });

    this.forceUpdate();
  };

  handleLeaveFocus = (e) => {
    this.handleProgressBarChange(e);
  };

  renderProgressBar = () => {
    if (this.progressBar.redirect) {
      this.progressBar = {
        ...this.progressBar,
        values: {
          ...this.progressBar.values,
          async_api: 0,
        },
      };
    }
    let perc = 0;
    let message;
    let variant;

    const list = Object.keys(this.progressBar.values).map((key) => [
      String(key),
      this.progressBar.values[key],
    ]);

    list.forEach((element) => {
      perc += element[1];
    });

    const withoutData = 5 - perc / 16.66667;
    message =
      withoutData <= 0
        ? this.progressBar.success
          ? this.progressBar.message
          : this.progressBar.error_api
          ? `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}`
          : "¡Tú Badge está lista, ¿No quedó genial?!"
        : this.progressBar.error
        ? "¡Necesitas rellenar todos los datos!"
        : "¡Faltan " + withoutData + " casillas por completar!";
    variant =
      withoutData <= 0
        ? this.progressBar.success
          ? this.progressBar.variant
          : "warning"
        : this.progressBar.error
        ? this.progressBar.variant
        : this.progressBar.error_api
        ? this.progressBar.variant
        : "warning";
    this.progressBar = {
      ...this.progressBar,
      porcent: perc,
      message: message,
      variant: variant,
      error: false,
      error_api: false,
      success: false,
    };

    if (this.progressBar.redirect) {
      setTimeout(() => {
        this.props.history.push("/badges");
      }, 1000);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleReadBadge();
    }, 1650);
  }

  componentWillUpdate() {
    this.renderProgressBar();
  }

  submitApi = async (e) => {
    this.progressBar = {
      ...this.progressBar,
      values: {
        ...this.progressBar.values,
        async_api: 0,
      },
    };
    e.preventDefault();
    if (
      this.progressBar.porcent / 16.66667 >= 5 &&
      this.progressBar.error_api === false
    ) {
      await swal({
        buttons: {
          cancel: "¡No!",
          accept: "¡Sí!",
        },
        className: "Swal__large",
        dangerMode: true,
        icon: "error",
        content: (
          <div>
            <h2>¿Deseas aplicar los cambios?</h2>
            <div className="Swal__grid">
              <div className="Swal__item">
                <p>Antiguo Badge</p>
                <Badge
                  firstName={this.withoutUpdateBadge.firstName}
                  lastName={this.withoutUpdateBadge.lastName}
                  twitter={this.withoutUpdateBadge.twitter}
                  jobTitle={this.withoutUpdateBadge.jobTitle}
                  email={this.withoutUpdateBadge.email}
                />
              </div>
              <div className="Swal__item">
                <p>Nuevo Badge</p>
                <Badge
                  firstName={this.props.formValues.form.firstName}
                  lastName={this.props.formValues.form.lastName}
                  twitter={this.props.formValues.form.twitter}
                  jobTitle={this.props.formValues.form.jobTitle}
                  email={this.props.formValues.form.email}
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
            this.conditionalSubmit(true).then((bool) => {});
            break;

          default:
            this.conditionalSubmit(false).then((bool) => {});
            break;
        }
      });

      this.forceUpdate();
    } else {
      this.conditionalSubmit(false).then((bool) => {});
    }
  };

  conditionalSubmit = async (conditional) => {
    await this.handleSubmit().then((progressBarObj) => {
      if (
        progressBarObj.error_api === false &&
        progressBarObj.error === false
      ) {
        this.progressBar = {
          ...this.progressBar,
          values: {
            ...this.progressBar.values,
            async_api: 16.66667,
          },
          message: "¡Tu badge ha sido enviada a nuestra API!",
          variant: "success",
          error: false,
          error_api: false,
          success: true,
          redirect: true,
        };
      }
      if (progressBarObj.error_api === true || conditional === false) {
        this.progressBar = {
          ...this.progressBar,
          values: {
            ...this.progressBar.values,
            async_api: 0,
          },
          variant: "danger",
          error: this.progressBar.porcent / 16.66667 >= 5 ? false : true,
          redirect: false,
          error_api:
            this.progressBar.error_api == Boolean
              ? this.progressBar.error_api
              : false,
          error_api_msg: this.progressBar.error_api_msg,
          message: this.progressBar.error_api
            ? `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}`
            : "¡Tienes que rellenar todas las casillas!",
          success: false,
        };
      }
    });

    this.forceUpdate();

    return conditional;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitApi}>
          <div className="form-group">
            <label>First name</label>
            <input
              onBlur={this.handleLeaveFocus}
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="firstName"
              value={this.props.formValues.form.firstName}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              onBlur={this.handleLeaveFocus}
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="lastName"
              value={this.props.formValues.form.lastName}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onBlur={this.handleLeaveFocus}
              onChange={this.props.onChange}
              className="form-control"
              type="email"
              name="email"
              value={this.props.formValues.form.email}
            />
          </div>

          <div className="form-group">
            <label>JobTitle</label>
            <input
              onBlur={this.handleLeaveFocus}
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.props.formValues.form.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onBlur={this.handleLeaveFocus}
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="twitter"
              value={this.props.formValues.form.twitter}
            />
          </div>

          <div className="Submit-ProgressBar">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <div className="Submit-ProgressBar__subgrid">
              <p>{this.progressBar.message}</p>
              <ProgressBar
                animated
                variant={this.progressBar.variant}
                now={this.progressBar.porcent}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BadgeFormEdit;
