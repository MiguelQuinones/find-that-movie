// This page will contain the table of movies marked "Watch Later" by the user

import React, { Component } from "react";

import UserService from "../services/user.service";

export default class WatchLater extends Component {
  constructor( props ) {
    super(props);

    this.state = {
      message : ""
    };
  }

  componentDidMount() {
    UserService.getWatchLater().then(
      response => {
        this.setState( {
          message: response.data
        } );
      },
      error => {
        this.setState( {
          message:
            ( error.response && error.response.data) ||
            error.message ||
            error.toString()
        } );
      }
    );
  }

  render() {
    return (
      <div>
        <header>
          <h1> Watch Later List </h1>
        </header>
        <p> { this.state.message } </p>
      </div>
    );
  }
}