import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../api.js";
import "../pages/styles/ProgressBar.css";
import swal from "@sweetalert/with-react";

class BadgeForm extends React.Component {
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
      await api.badges.create(this.props.formValues.form);
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

      swal({
        button: "¡Ok!",
        icon: "error",
        content: (
          <div>
            <h2>{this.progressBar.message}</h2>
          </div>
        ),
      });
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

  handleLeaveFocus = (e) => {
    this.handleProgressBarChange(e);
  };

  renderProgressBar = () => {
    this.progressBar = {
      ...this.progressBar,
      values: {
        ...this.progressBar.values,
        async_api: 0,
      },
    };
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

    console.log(this.progressBar);
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
        ? this.progressBar.variant
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
    };

    if (this.progressBar.redirect) {
      setTimeout(() => {
        this.props.history.push("/badges");
      }, 1000);
    }
  };

  componentWillUpdate() {
    this.renderProgressBar();
  }

  submitApi = (e) => {
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
      this.handleSubmit();

      if (this.progressBar.error_api === false) {
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

        swal({
          button: "¡Ok!",
          icon: "success",
          content: (
            <div>
              <h2>Se ha enviado la petición al servidor.</h2>
            </div>
          ),
        });
      }
    } else {
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
      };

      swal({
        button: "¡Ok!",
        icon: "error",
        content: (
          <div>
            <h2>{this.progressBar.message}</h2>
          </div>
        ),
      });
    }
    this.forceUpdate();
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

export default BadgeForm;
