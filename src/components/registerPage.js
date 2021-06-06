import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

// Display when a field is left empty
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// Validation rules for username
const verifyUsername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters!
      </div>
    );
  }
};

// Validation rules for password -- ADD MORE LATER
const verifyPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters!
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onHandleSubmit = this.onHandleSubmit.bind( this );
    this.onChangeUsername = this.onChangeUsername.bind( this );
    this.onChangePassword = this.onChangePassword.bind( this );

    this.state = {
      username: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername( event ) {
    this.setState( {
      username: event.target.value
    } );
  }

  onChangePassword( event ) {
    this.setState( {
      password: event.target.value
    } );
  }

  onHandleSubmit( event ) {
    event.preventDefault();

    this.setState( {
      message: "",
      successful: false
    } );

    this.form.validateAll();

    if ( this.checkBtn.context._errors.length === 0 ) {
      AuthService.register(
        this.state.username,
        this.state.password
      ).then(
        response => {
          this.setState( {
            message: response.data.message,
            successful: true
          } );
        },
        error => {
          const resMessage =
            ( error.response &&
              error.response.data &&
              error.response.data.message ) ||
            error.message ||
            error.toString();

          this.setState( {
            successful: false,
            message: resMessage
          } );
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1> Register Page </h1>

          <Form
            onSubmit = { this.handleRegister }
            ref = { c => {
              this.form = c;
            } }
          >
            { !this.state.successful && (
              <div>
                  <input
                    type = "text"
                    className = "form-control"
                    name = "username"
                    placeholder = "Enter username here"
                    value = { this.state.username }
                    onChange = { this.onChangeUsername }
                    validations = { [ required, verifyUsername ] }
                  />

                  <input
                    type = "password"
                    className = "form-control"
                    name = "password"
                    placeholder = "Enter password here"
                    value = { this.state.password }
                    onChange = { this.onChangePassword }
                    validations = { [ required, verifyPassword ] }
                  />

                <div>
                  <button type = "submit" className = "btn btn-primary btn-block"> Register </button>
                </div>
              </div>
            ) }

            { this.state.message && (
              <div>
                <div
                  className = {
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role = "alert"
                >
                  { this.state.message }
                </div>
              </div>
            ) }
            <CheckButton
              style = { { display: "none" } }
              ref = { c => {
                this.checkBtn = c;
              } }
            />
          </Form>
        </div>
      </div>
    );
  }
}