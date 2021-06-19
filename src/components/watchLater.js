// This page will contain the table of movies marked "Watch Later" by the user

import React, { Component } from "react";

import UserService from "../services/user.service";

export default class WatchLater extends Component {
  constructor( props ) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getWatchLater().then(
      response => {
        this.setState( {
          content: response.data
        } );
      },
      error => {
        this.setState( {
          content:
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
          <h1> { this.state.content } </h1>
        </header>
        <p> Hello! </p>
      </div>
    );
  }
}