import React, { Component } from "react";

import CarouselSlides from "./carousel";
import PlayingNowSlides from "./moviesPlayingNow";

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
        <CarouselSlides/>
        <PlayingNowSlides/>
      </>
    );
  }
}