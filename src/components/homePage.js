import React, { Component } from "react";

import UserService from "../services/user.service";
import CarouselSlides from "../components/carousel";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  // Remove function below later
  componentDidMount() {
    UserService.getPublicContent().then(
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
      <>
        <h1 className = "mb-3">
          Upcoming <span className = "text-info"> Movies </span>
        </h1>
        <CarouselSlides/>
      </>
    );
  }
}