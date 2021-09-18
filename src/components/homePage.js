import React, { Component } from "react";
import CarouselSlides from "./carousel";
import PlayingNowSlides from "./moviesPlayingNow";

export default class Home extends Component {

  // Render components below for homepage that visitors will first see
  render() {
    return (
      <>
        <CarouselSlides/>
        <PlayingNowSlides/>
      </>
    );
  }
}