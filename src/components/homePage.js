import React, { Component } from "react";

import CarouselSlides from "../components/carousel";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
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